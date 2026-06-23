// src/models/grade.ts
import { Schema, model } from 'mongoose';
import { IGrade } from './interfaces';

const GradeSchema = new Schema<IGrade>({
  name: { type: String, required: true, trim: true, unique: true },
  order: { type: Number, required: true, unique: true },
}, { timestamps: true });

export const Grade = model<IGrade>('Grade', GradeSchema);
