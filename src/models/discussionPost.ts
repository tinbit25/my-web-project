// src/models/discussionPost.ts
import { Schema, model, Types } from 'mongoose';
import { IDiscussionPost } from './interfaces';

const DiscussionPostSchema = new Schema<IDiscussionPost>({
  lesson: { type: Types.ObjectId, ref: 'Lesson', required: true },
  author: { type: Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  parentPost: { type: Types.ObjectId, ref: 'DiscussionPost' },
}, { timestamps: true });

DiscussionPostSchema.index({ lesson: 1, createdAt: -1 });

export const DiscussionPost = model<IDiscussionPost>('DiscussionPost', DiscussionPostSchema);
