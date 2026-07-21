import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Student from '@/models/student';
import Teacher from '@/models/Teacher';
import Parent from '@/models/Parent';
import Church from '@/models/Church';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      role,
      email,
      username,
      password,
      firstName,
      lastName,
      amharicName,
      gender,
      dob,
      phone,
      address,
      baptismName,
      profilePhoto,
      churchCode,
      // Role specific fields
      parentName,
      parentPhone,
      gradeNumber,
      subjects,
      assignedGrades,
      qualification,
      yearsOfExperience,
      biography,
      childrenEmails,
    } = body;

    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    // Check duplicate email or username
    const existingEmail = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingEmail) {
      return NextResponse.json({ success: false, error: 'User with this email already exists' }, { status: 400 });
    }

    if (username) {
      const existingUser = await User.findOne({ username: username.trim() });
      if (existingUser) {
        return NextResponse.json({ success: false, error: 'Username is already taken' }, { status: 400 });
      }
    }

    // Resolve Church
    let church = await Church.findOne({ code: churchCode || 'MEDHANEALEM' });
    if (!church) {
      church = await Church.findOne();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Approval requirement: Students & Teachers require Church Admin approval before activation
    const requiresApproval = role === 'student' || role === 'teacher';
    const isApproved = !requiresApproval;

    const newUser = await User.create({
      email: email.toLowerCase().trim(),
      username: username ? username.trim() : email.split('@')[0],
      password: hashedPassword,
      firstName,
      lastName,
      amharicName,
      gender,
      dob: dob ? new Date(dob) : undefined,
      phone,
      address,
      baptismName,
      profilePhoto,
      role,
      church: church?._id,
      isApproved,
    });

    // Create role-specific document profile
    if (role === 'student') {
      await Student.create({
        user: newUser._id,
        amharicName,
        gender,
        dob: dob ? new Date(dob) : undefined,
        phone,
        parentName,
        parentPhone,
        gradeNumber: parseInt(gradeNumber || '7', 10),
        address,
        baptismName,
        profilePhoto,
      });
    } else if (role === 'teacher') {
      await Teacher.create({
        user: newUser._id,
        gender,
        phone,
        subjects: Array.isArray(subjects) ? subjects : [subjects || 'General'],
        assignedGrades: Array.isArray(assignedGrades) ? assignedGrades.map(Number) : [7],
        qualification,
        yearsOfExperience: parseInt(yearsOfExperience || '1', 10),
        biography,
        profilePhoto,
      });
    } else if (role === 'parent') {
      // Find children by emails if provided
      let childrenIds: any[] = [];
      if (Array.isArray(childrenEmails) && childrenEmails.length > 0) {
        const foundStudents = await User.find({ email: { $in: childrenEmails } });
        childrenIds = foundStudents.map(s => s._id);
      }
      await Parent.create({
        user: newUser._id,
        phone,
        address,
        children: childrenIds,
      });
    }

    return NextResponse.json({
      success: true,
      message: isApproved
        ? 'Registration successful! You can now log in.'
        : 'Registration submitted! Your account is pending Church Admin approval.',
      isApproved,
      user: {
        id: newUser._id,
        email: newUser.email,
        name: `${newUser.firstName} ${newUser.lastName}`,
        role: newUser.role,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
