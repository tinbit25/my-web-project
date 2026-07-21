// src/models/User.ts
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
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    amharicName: { type: String, trim: true },
    gender: { type: String, enum: ['male', 'female'] },
    dob: { type: Date },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    baptismName: { type: String, trim: true },
    profilePhoto: { type: String },
    role: {
      type: String,
      enum: ['superadmin', 'churchadmin', 'teacher', 'student', 'parent'] as Role[],
      required: true,
    },
    church: { type: Schema.Types.ObjectId, ref: 'Church', required: true },
    isApproved: { type: Boolean, default: true },
    approvalDate: { type: Date },
  },
  { timestamps: true }
);

UserSchema.index({ role: 1, church: 1 });
UserSchema.index({ email: 1 });

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
