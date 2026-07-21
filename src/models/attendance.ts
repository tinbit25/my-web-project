// src/models/Attendance.ts
import mongoose, { Schema } from 'mongoose';
import { IAttendance } from './interfaces';

const AttendanceRecordSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  studentName: { type: String, required: true },
  status: { type: String, enum: ['present', 'late', 'absent'], required: true },
});

const AttendanceSchema = new Schema<IAttendance>(
  {
    church: { type: Schema.Types.ObjectId, ref: 'Church' },
    gradeNumber: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    records: [AttendanceRecordSchema],
    markedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const Attendance = mongoose.models.Attendance || mongoose.model<IAttendance>('Attendance', AttendanceSchema);
export default Attendance;
