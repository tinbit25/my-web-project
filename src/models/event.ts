// src/models/Event.ts
import mongoose, { Schema } from 'mongoose';
import { IEvent } from './interfaces';

const RegisteredUserSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  fullName: { type: String, required: true },
  gradeNumber: { type: Number },
  registeredAt: { type: Date, default: Date.now },
});

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    amharicTitle: { type: String, trim: true },
    category: { type: String, required: true, default: 'Retreat' },
    dateString: { type: String, required: true },
    eventDate: { type: Date },
    location: { type: String, required: true },
    capacity: { type: Number, required: true, default: 100 },
    registeredUsers: [RegisteredUserSchema],
    description: { type: String, required: true },
    color: { type: String, default: 'orange' },
    church: { type: Schema.Types.ObjectId, ref: 'Church' },
  },
  { timestamps: true }
);

export const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
export default Event;
