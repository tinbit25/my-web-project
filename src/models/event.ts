import { Schema, model, Types } from 'mongoose';
import { IEvent } from './interfaces';

const EventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    location: { type: String },
    church: { type: Types.ObjectId, ref: 'Church', required: true },
  },
  { timestamps: true }
);

// Indexes for fast lookup
EventSchema.index({ church: 1, start: 1 });

export const Event = model<IEvent>('Event', EventSchema);
export default Event;
