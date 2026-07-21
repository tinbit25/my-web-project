import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Attendance from '@/models/attendance';
import Church from '@/models/Church';
import { broadcastEvent } from '../realtime/route';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const grade = searchParams.get('grade');

    const filter: any = {};
    if (grade) filter.gradeNumber = parseInt(grade, 10);

    const attendances = await Attendance.find(filter).sort({ date: -1 });
    return NextResponse.json({ success: true, attendances });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { gradeNumber, records } = body;

    let defaultChurch = await Church.findOne();

    const attendance = await Attendance.create({
      church: defaultChurch?._id,
      gradeNumber: parseInt(gradeNumber || '7', 10),
      date: new Date(),
      records: records || [],
    });

    broadcastEvent('ATTENDANCE_SAVED', attendance);

    return NextResponse.json({ success: true, attendance });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
