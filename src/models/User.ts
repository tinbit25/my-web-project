// src/models/user.ts
import mongoose, { Schema, Types } from 'mongoose';
import { IUser, Role } from './interfaces';

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    password: { type: String, required: true }, // bcrypt hash
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ['superadmin', 'churchadmin', 'teacher', 'student', 'parent'] as Role[],
      required: true,
    },
    church: { type: Types.ObjectId, ref: 'Church', required: true },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 });
UserSchema.index({ role: 1, church: 1 });

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
