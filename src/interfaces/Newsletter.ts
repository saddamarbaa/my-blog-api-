import { Request } from 'express';

export interface TNewsletter {
  email: string;
  verificationToken: string;
  verified: boolean;
  subscriptionType: 'daily' | 'weekly' | 'monthly';
}

export interface VerifyEmailSubscriptionBody<T> extends Request {
  body: T;
  query: { token: string };
}
