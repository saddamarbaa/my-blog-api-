import mongoose, { Schema, Document } from 'mongoose';
import crypto from 'crypto';
import { TNewsletter } from '@src/interfaces';
import { SUBSCRIPTION_TYPE_OPTIONS } from '@src/constants';

// Define the interface for the Newsletter document
export interface INewsletterDocument extends Document, TNewsletter {
  generateVerificationToken(): void;
  verifyEmail(token: string): boolean;
}

// Define the Mongoose schema
const NewsletterSchema: Schema<INewsletterDocument> = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email address'
      ],
      unique: true,
      lowercase: true,
      index: true
    },
    verificationToken: {
      type: String,
      required: false
    },
    verified: {
      type: Boolean,
      default: false
    },
    subscriptionType: {
      type: String,
      enum: [...SUBSCRIPTION_TYPE_OPTIONS],
      default: 'daily'
    }
  },
  {
    timestamps: true
  }
);

// Method to generate a verification token
NewsletterSchema.methods.generateVerificationToken = function () {
  this.verificationToken = crypto.randomBytes(32).toString('hex');
};

// Method to verify the email with the provided token
NewsletterSchema.methods.verifyEmail = function (token: string) {
  if (this.verificationToken === token) {
    this.verified = true;
    this.verificationToken = ''; // Clear the token after successful verification
    return true;
  }
  return false;
};

// Export the model
const Newsletter = mongoose.models.Newsletter || mongoose.model<INewsletterDocument>('Newsletter', NewsletterSchema);
export default Newsletter;
