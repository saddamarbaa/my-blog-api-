import mongoose from 'mongoose';
import { environmentConfig } from '@src/configs';

export const validMongooseObjectId = new mongoose.Types.ObjectId().toString();

export const userPayload = {
  firstName: 'john',
  lastName: 'doe',
  email: 'testverstmion@gmail.com',
  password: 'Password123',
  gender: 'female',
  confirmPassword: 'Password123'
};

export const adminEmails = environmentConfig?.ADMIN_EMAILS && (JSON.parse(environmentConfig.ADMIN_EMAILS) as string[]);
