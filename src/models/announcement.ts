// src/models/announcement.ts
import { Schema, model, Document, Types } from 'mongoose';
import { IAnnouncement } from '../interfaces';

const AnnouncementSchema = new Schema<IAnnouncement>({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  church: { type: Types.ObjectId, ref: 'Church', required: true, index: true },
  author: { type: Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

// Index for quick retrieval per church
AnnouncementSchema.index({ church: 1, createdAt: -1 });

export const Announcement = model<IAnnouncement>('Announcement', AnnouncementSchema);
export default Announcement;
