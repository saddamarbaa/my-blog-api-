import mongoose, { Schema, Document } from 'mongoose';

import { ISubscriber } from '@src/interfaces/Subscriber';

export interface ISubscriberDocument extends Document, ISubscriber {}

export const SubscriberSchema: Schema<ISubscriberDocument> = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please provide email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email'
      ],
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
      maxLength: [128, "Email can't be greater than 128 characters"]
    }
  },
  { timestamps: true }
);

export default mongoose.models.Subscriber || mongoose.model('Subscriber', SubscriberSchema);
