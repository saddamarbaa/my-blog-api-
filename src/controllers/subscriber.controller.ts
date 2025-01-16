import { RequestHandler } from 'express';
import { subscriberToNewsletterService } from '@src/services';

export const subscriberToNewsletterController: RequestHandler = async (req, res, next) =>
  subscriberToNewsletterService(req, res, next);
