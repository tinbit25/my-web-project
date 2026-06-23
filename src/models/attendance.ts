// src/models/attendance.ts
import { Schema, model, Types } from 'mongoose';
import { IAttendance } from './interfaces';

const AttendanceSchema = new Schema<IAttendance>({
  lesson: { type: Types.ObjectId, ref: 'Lesson', required: true },
  student: { type: Types.ObjectId, ref: 'Student', required: true },
  present: { type: Boolean, required: true },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

// Ensure a student has only one attendance record per lesson
AttendanceSchema.index({ lesson: 1, student: 1 }, { unique: true });

export const Attendance = model<IAttendance>('Attendance', AttendanceSchema);
