// src/models/Announcement.ts
import mongoose, { Schema } from 'mongoose';
import { IAnnouncement } from './interfaces';

const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    church: { type: Schema.Types.ObjectId, ref: 'Church' },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    authorName: { type: String, required: true },
    targetRole: { type: String, default: 'all' },
    dateString: { type: String, default: 'Today' },
  },
  { timestamps: true }
);

export const Announcement = mongoose.models.Announcement || mongoose.model<IAnnouncement>('Announcement', AnnouncementSchema);
export default Announcement;
