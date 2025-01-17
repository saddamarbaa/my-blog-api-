import { NextFunction, RequestHandler, Response } from 'express';
import {
  subscriberToNewsletterService,
  unsubscribeFromNewsletterService,
  verifyEmailSubscriptionService
} from '@src/services';

export const subscriberToNewsletterController: RequestHandler = async (req, res, next) =>
  subscriberToNewsletterService(req, res, next);

export const unsubscribeFromNewsController: RequestHandler = async (req, res, next) =>
  unsubscribeFromNewsletterService(req, res, next);

export const verifyEmailSubscriptionController = (
  req: { query: { token: string } },
  res: Response,
  next: NextFunction
) => verifyEmailSubscriptionService(req, res, next);
