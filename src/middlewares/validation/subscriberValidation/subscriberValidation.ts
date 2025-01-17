import { RequestHandler } from 'express';
import validator from '../validator';
import { subscriberSchema } from './subscriberSchema';

export const emailValidation: RequestHandler = (req, res, next) =>
  validator(subscriberSchema.validatedEmail, { ...req.body, ...req.params }, next);
