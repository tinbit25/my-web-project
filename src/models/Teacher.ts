// src/models/Teacher.ts
import mongoose, { Schema } from 'mongoose';
import { ITeacherProfile } from './interfaces';

export interface ITeacherDocument extends ITeacherProfile, mongoose.Document {
  user: mongoose.Types.ObjectId;
}

const TeacherSchema = new Schema<ITeacherDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    gender: { type: String },
    phone: { type: String },
    subjects: [{ type: String }],
    assignedGrades: [{ type: Number }],
    qualification: { type: String },
    yearsOfExperience: { type: Number },
    biography: { type: String },
    profilePhoto: { type: String },
  },
  { timestamps: true }
);

export const Teacher = mongoose.models.Teacher || mongoose.model<ITeacherDocument>('Teacher', TeacherSchema);
export default Teacher;
