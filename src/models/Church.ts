// src/models/church.ts
import { Schema, model, Types } from 'mongoose';
import { IChurch } from './interfaces';

const ChurchSchema = new Schema<IChurch>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zip: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    logoUrl: { type: String },
    settings: {
      theme: { type: String, default: 'orange' },
      timezone: { type: String, default: 'Africa/Addis_Ababa' },
      allowSelfRegistration: { type: Boolean, default: true },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ChurchSchema.index({ name: 1 });

export const Church = model<IChurch>('Church', ChurchSchema);
export default Church;
