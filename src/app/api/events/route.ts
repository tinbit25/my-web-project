import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Event from '@/models/event';
import Church from '@/models/Church';
import { broadcastEvent } from '../realtime/route';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, events });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { action, eventId, fullName, gradeNumber, title, amharicTitle, category, dateString, location, capacity, description, color } = body;

    let defaultChurch = await Church.findOne();

    // Event Registration action
    if (action === 'register' && eventId) {
      const event = await Event.findById(eventId);
      if (!event) {
        return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
      }

      event.registeredUsers.push({
        fullName: fullName || 'Registrant',
        gradeNumber: parseInt(gradeNumber || '7', 10),
        registeredAt: new Date(),
      });

      await event.save();
      broadcastEvent('EVENT_REGISTERED', { eventId, registeredCount: event.registeredUsers.length });

      return NextResponse.json({ success: true, event });
    }

    // Create Event
    const newEvent = await Event.create({
      title,
      amharicTitle,
      category: category || 'Retreat',
      dateString,
      location,
      capacity: parseInt(capacity || '100', 10),
      description,
      color: color || 'orange',
      registeredUsers: [],
      church: defaultChurch?._id,
    });

    broadcastEvent('EVENT_CREATED', newEvent);

    return NextResponse.json({ success: true, event: newEvent });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    await Event.findByIdAndDelete(id);
    broadcastEvent('EVENT_DELETED', { id });

    return NextResponse.json({ success: true, message: 'Event deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
