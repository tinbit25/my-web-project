// scripts/seed.ts
import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd());

import bcrypt from 'bcryptjs';
import { dbConnect } from '../src/lib/mongoose';
import User from '../src/models/User';
import Church from '../src/models/Church';

async function createDemoData() {
  await dbConnect();

  // Ensure a church exists (replace with your actual church name)
  let church = await Church.findOne({ name: 'Debre Berhan Sunday School' });
  if (!church) {
    church = await Church.create({
      name: 'Debre Berhan Sunday School',
      address: 'Debre Berhan, Ethiopia',
    });
  }

  // Helper to create a user with hashed password
  const createUser = async (email: string, plainPassword: string, role: string) => {
    const hashed = await bcrypt.hash(plainPassword, 10);
    const existing = await User.findOne({ email });
    if (existing) return existing;
    return User.create({
      email,
      password: hashed,
      firstName: role === 'teacher' ? 'Tesfaye' : 'Mekdes',
      lastName: role === 'teacher' ? 'Hailu' : 'Bekele',
      role,
      church: church!._id,
    });
  };

  await createUser('teacher@eotc.edu', 'TeachPass123', 'teacher');
  await createUser('student@eotc.edu', 'StudPass123', 'student');
  console.log('✅ Demo users created');
  process.exit(0);
}

createDemoData().catch((err) => {
  console.error('❌ Seed error', err);
  process.exit(1);
});
