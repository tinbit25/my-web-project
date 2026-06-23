import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Church from '@/models/Church';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await dbConnect();

    // 1. Seed Churches
    const defaultChurches = [
      {
        name: 'Tsbase Debre Selam Medhanealem',
        amharicName: 'ፀባ ደብረ ሰላም መድሃኒዓለም',
        patronSaint: 'Medhanealem',
        code: 'MEDHANEALEM',
        contactEmail: 'medhanealem@eotc.edu',
        contactPhone: '+251911000001',
        settings: { allowSelfRegistration: true, theme: 'orange', timezone: 'Africa/Addis_Ababa' },
      },
      {
        name: 'Debre Mehret Kidus Mikael',
        amharicName: 'ደብረ ምሕረት ቅዱስ ሚካኤል',
        patronSaint: 'Kidus Mikael',
        code: 'MIKAEL',
        contactEmail: 'mikael@eotc.edu',
        contactPhone: '+251911000002',
        settings: { allowSelfRegistration: true, theme: 'blue', timezone: 'Africa/Addis_Ababa' },
      },
      {
        name: 'Debre Hail Kidus Gabriel',
        amharicName: 'ደብረ ኃይል ቅዱስ ገብርኤል',
        patronSaint: 'Kidus Gabriel',
        code: 'GABRIEL',
        contactEmail: 'gabriel@eotc.edu',
        contactPhone: '+251911000003',
        settings: { allowSelfRegistration: true, theme: 'purple', timezone: 'Africa/Addis_Ababa' },
      },
      {
        name: 'Abune Tekle Haymanot Unity Church',
        amharicName: 'አቡነ ተክለ ሃይማኖት አንድነት ቤተ ክርስቲያን',
        patronSaint: 'Abune Tekle Haymanot',
        code: 'TEKLEHAYMANOT',
        contactEmail: 'teklehaymanot@eotc.edu',
        contactPhone: '+251911000004',
        settings: { allowSelfRegistration: true, theme: 'green', timezone: 'Africa/Addis_Ababa' },
      },
    ];

    const churches = [];
    for (const c of defaultChurches) {
      let church = await Church.findOne({ code: c.code });
      if (!church) {
        church = await Church.create(c);
      }
      churches.push(church);
    }

    const medhanealemChurch = churches[0];

    // 2. Seed Demo Users
    const defaultUsers = [
      {
        email: 'student@eotc.edu',
        fullName: 'Tinbit Elias',
        role: 'student',
        password: 'student123',
        studentProfile: {
          grade: 7,
          section: 'A',
          enrollmentDate: new Date(),
          studentId: 'MED-2026-0042',
        },
      },
      {
        email: 'teacher@eotc.edu',
        fullName: 'Mergia Hailu',
        role: 'teacher',
        password: 'teacher123',
        teacherProfile: {
          assignedGrades: [5, 6, 7, 8, 9, 10, 11, 12],
          specialization: 'Dogmatic Theology & Liturgy',
          joinDate: new Date(),
        },
      },
      {
        email: 'admin@eotc.edu',
        fullName: 'Keis Kesis Weldeyesus',
        role: 'churchadmin',
        password: 'admin123',
      },
      {
        email: 'superadmin@eotc.edu',
        fullName: 'Liqe Kahnat Hailemariam',
        role: 'superadmin',
        password: 'super123',
      },
      {
        email: 'parent@eotc.edu',
        fullName: 'Elias Tekle',
        role: 'parent',
        password: 'parent123',
        parentProfile: {
          occupation: 'Merchant',
        },
      },
    ];

    const seededUsers = [];
    for (const u of defaultUsers) {
      let user = await User.findOne({ email: u.email });
      if (!user) {
        const hashedPassword = await bcrypt.hash(u.password, 10);
        user = await User.create({
          churchId: medhanealemChurch._id,
          fullName: u.fullName,
          email: u.email,
          passwordHash: hashedPassword,
          role: u.role,
          isActive: true,
          isEmailVerified: true,
          studentProfile: u.studentProfile,
          teacherProfile: u.teacherProfile,
          parentProfile: u.parentProfile,
        });
      }
      seededUsers.push({
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      churchesCount: churches.length,
      users: seededUsers,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
