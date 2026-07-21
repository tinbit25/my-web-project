import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');
    const pendingOnly = searchParams.get('pending') === 'true';

    const filter: any = {};
    if (role) filter.role = role;
    if (pendingOnly) filter.isApproved = false;

    const users = await User.find(filter).select('-password').sort({ createdAt: -1 });

    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { userId, action } = await req.json(); // action: 'approve' | 'reject' | 'delete'

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
    }

    if (action === 'approve') {
      const user = await User.findByIdAndUpdate(
        userId,
        { isApproved: true, approvalDate: new Date() },
        { new: true }
      ).select('-password');
      return NextResponse.json({ success: true, message: 'User account approved successfully', user });
    } else if (action === 'delete' || action === 'reject') {
      await User.findByIdAndDelete(userId);
      return NextResponse.json({ success: true, message: 'User account deleted/rejected' });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
