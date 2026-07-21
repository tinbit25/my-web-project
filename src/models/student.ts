// src/models/Student.ts
import mongoose, { Schema } from 'mongoose';
import { IStudentProfile } from './interfaces';

export interface IStudentDocument extends IStudentProfile, mongoose.Document {
  user: mongoose.Types.ObjectId;
}

const StudentSchema = new Schema<IStudentDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    amharicName: { type: String },
    gender: { type: String },
    dob: { type: Date },
    phone: { type: String },
    parentName: { type: String },
    parentPhone: { type: String },
    gradeNumber: { type: Number, required: true },
    address: { type: String },
    baptismName: { type: String },
    profilePhoto: { type: String },
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    parentUser: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const Student = mongoose.models.Student || mongoose.model<IStudentDocument>('Student', StudentSchema);
export default Student;
