import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Announcement from '@/models/announcement';
import Church from '@/models/Church';
import { broadcastEvent } from '../realtime/route';

export async function GET() {
  try {
    await dbConnect();
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, announcements });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { title, content, authorName, targetRole, dateString } = body;

    let defaultChurch = await Church.findOne();

    const announcement = await Announcement.create({
      title,
      content,
      authorName: authorName || 'Parish Admin',
      targetRole: targetRole || 'all',
      dateString: dateString || 'Today',
      church: defaultChurch?._id,
    });

    broadcastEvent('ANNOUNCEMENT_CREATED', announcement);

    return NextResponse.json({ success: true, announcement });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
