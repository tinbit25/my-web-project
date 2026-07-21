// src/models/Course.ts
import mongoose, { Schema } from 'mongoose';
import { ICourse } from './interfaces';

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    amharicTitle: { type: String, trim: true },
    description: { type: String },
    gradeNumber: { type: Number, required: true },
    church: { type: Schema.Types.ObjectId, ref: 'Church', required: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'User' },
    lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
  },
  { timestamps: true }
);

export const Course = mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
export default Course;
