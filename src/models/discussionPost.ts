// src/models/discussionPost.ts
import mongoose, { Schema } from 'mongoose';
import { IDiscussionPost } from './interfaces';

const ReplySchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  authorName: { type: String, required: true },
  authorRole: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const DiscussionPostSchema = new Schema<IDiscussionPost>(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, default: 'Theology' },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: true },
    authorRole: { type: String, required: true },
    content: { type: String, required: true },
    images: [{ type: String }],
    likes: { type: Number, default: 0 },
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    replies: [ReplySchema],
    lesson: { type: Schema.Types.ObjectId, ref: 'Lesson' },
    church: { type: Schema.Types.ObjectId, ref: 'Church' },
  },
  { timestamps: true }
);

export const DiscussionPost = mongoose.models.DiscussionPost || mongoose.model<IDiscussionPost>('DiscussionPost', DiscussionPostSchema);
export default DiscussionPost;
