// src/models/Parent.ts
import mongoose, { Schema } from 'mongoose';
import { IParentProfile } from './interfaces';

export interface IParentDocument extends IParentProfile, mongoose.Document {
  user: mongoose.Types.ObjectId;
}

const ParentSchema = new Schema<IParentDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    children: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export const Parent = mongoose.models.Parent || mongoose.model<IParentDocument>('Parent', ParentSchema);
export default Parent;
