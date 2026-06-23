// src/models/student.ts
import { Schema, model, Types } from 'mongoose';
import { IStudent } from './interfaces';

const StudentSchema = new Schema<IStudent>(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true, unique: true },
    grade: { type: Types.ObjectId, ref: 'Grade', required: true },
    parent: { type: Types.ObjectId, ref: 'Parent', required: true },
    enrolledCourses: [{ type: Types.ObjectId, ref: 'Course' }],
  },
  { timestamps: true }
);

StudentSchema.index({ user: 1 });
StudentSchema.index({ parent: 1 });
StudentSchema.index({ grade: 1 });

export const Student = model<IStudent>('Student', StudentSchema);
