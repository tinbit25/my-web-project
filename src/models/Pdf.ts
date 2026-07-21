// src/models/Pdf.ts
import mongoose, { Schema } from 'mongoose';
import { IPdf } from './interfaces';

const PdfSchema = new Schema<IPdf>(
  {
    title: { type: String, required: true, trim: true },
    amharicTitle: { type: String, trim: true },
    category: { type: String, required: true, default: 'Theology' },
    gradeNumber: { type: Number, required: true },
    courseTitle: { type: String },
    church: { type: Schema.Types.ObjectId, ref: 'Church', required: true },
    url: { type: String, required: true },
    fileSize: { type: String },
    tags: [{ type: String }],
    authorName: { type: String },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    downloadsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Pdf = mongoose.models.Pdf || mongoose.model<IPdf>('Pdf', PdfSchema);
export default Pdf;
