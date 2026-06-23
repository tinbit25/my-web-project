// src/proxy.ts
import { auth } from '@/auth';

// Next.js expects a function export named `proxy` (or default) for the Edge runtime.
export const proxy = auth; // `auth` is a middleware function from next-auth

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|.*\\..*).*)'],
};
