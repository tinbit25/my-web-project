import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Pdf from '@/models/Pdf';
import Church from '@/models/Church';
import { broadcastEvent } from '../realtime/route';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const grade = searchParams.get('grade');
    const category = searchParams.get('category');

    const filter: any = {};

    if (grade && grade !== 'All') {
      const match = grade.match(/\d+/);
      if (match) filter.gradeNumber = parseInt(match[0], 10);
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [
        { title: regex },
        { amharicTitle: regex },
        { authorName: regex },
        { tags: regex },
      ];
    }

    const pdfs = await Pdf.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, pdfs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { title, amharicTitle, category, gradeNumber, url, authorName, tags } = body;

    let defaultChurch = await Church.findOne();

    const newPdf = await Pdf.create({
      title,
      amharicTitle,
      category: category || 'Theology',
      gradeNumber: parseInt(gradeNumber || '7', 10),
      url: url || '/documents/sample.pdf',
      authorName: authorName || 'Sunday School Admin',
      tags: tags || ['EOTC', 'Syllabus'],
      church: defaultChurch?._id,
      downloadsCount: 0,
    });

    // Broadcast SSE realtime event to all online clients
    broadcastEvent('PDF_UPLOADED', newPdf);

    return NextResponse.json({ success: true, pdf: newPdf });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { id, action } = body; // action: 'download'

    if (action === 'download' && id) {
      const updated = await Pdf.findByIdAndUpdate(id, { $inc: { downloadsCount: 1 } }, { new: true });
      return NextResponse.json({ success: true, pdf: updated });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
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
      return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    }

    await Pdf.findByIdAndDelete(id);
    broadcastEvent('PDF_DELETED', { id });

    return NextResponse.json({ success: true, message: 'PDF deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
