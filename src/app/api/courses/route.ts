import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Course from '@/models/Course';
import Church from '@/models/Church';
import { broadcastEvent } from '../realtime/route';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const grade = searchParams.get('grade');

    const filter: any = {};
    if (grade) filter.gradeNumber = parseInt(grade, 10);

    const courses = await Course.find(filter).sort({ gradeNumber: 1, createdAt: -1 });
    return NextResponse.json({ success: true, courses });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { title, amharicTitle, description, gradeNumber, teacherId } = body;

    let defaultChurch = await Church.findOne();

    const course = await Course.create({
      title,
      amharicTitle,
      description,
      gradeNumber: parseInt(gradeNumber, 10),
      church: defaultChurch?._id,
      teacher: teacherId || undefined,
    });

    broadcastEvent('COURSE_ADDED', course);

    return NextResponse.json({ success: true, course });
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

    await Course.findByIdAndDelete(id);
    broadcastEvent('COURSE_DELETED', { id });

    return NextResponse.json({ success: true, message: 'Course deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
