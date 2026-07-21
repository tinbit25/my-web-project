import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Global Event Emitter / SSE Stream Manager for Real-Time Updates
type EventListener = (data: { type: string; payload: any }) => void;
const listeners: Set<EventListener> = new Set();

export function broadcastEvent(type: string, payload: any) {
  const eventData = { type, payload, timestamp: new Date().toISOString() };
  listeners.forEach((listener) => {
    try {
      listener(eventData);
    } catch (e) {
      // ignore
    }
  });
}

export async function GET(req: Request) {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  const listener: EventListener = (data) => {
    try {
      writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
    } catch (e) {
      listeners.delete(listener);
    }
  };

  listeners.add(listener);

  // Keep-alive ping every 15s to prevent timeout
  const keepAlive = setInterval(() => {
    try {
      writer.write(encoder.encode(`: keep-alive\n\n`));
    } catch (e) {
      clearInterval(keepAlive);
      listeners.delete(listener);
    }
  }, 15000);

  req.signal.addEventListener('abort', () => {
    clearInterval(keepAlive);
    listeners.delete(listener);
    writer.close();
  });

  return new NextResponse(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
