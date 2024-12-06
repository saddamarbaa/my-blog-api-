import mongoose from 'mongoose';
import request from 'supertest';

import { environmentConfig } from '@src/configs';
import User from '@src/models/User.model';
import Token from '@src/models/Token.model';
import app from '@src/app';
import { AUTHORIZATION_ROLES, userPayload } from '@src/constants';

// Increase the timeout for initial setup
beforeAll(async () => {
  jest.setTimeout(90 * 1000); // Set timeout to 90 seconds
  try {
    await mongoose.connect(environmentConfig.TEST_ENV_MONGODB_CONNECTION_STRING as string, {});
    console.log('Successfully connected to DB');
  } catch (err) {
    console.error('Failed to connect to DB', err);
    throw err; // Let Jest know there was an error
  }
});

// Drop the database and close the connection after all tests
afterAll(async () => {
  try {
    await mongoose?.connection?.db?.dropDatabase(); // Drop the test database
    await mongoose.disconnect(); // Disconnect from the database
  } catch (err) {
    console.error('Error in afterAll:', err);
  } finally {
    jest.clearAllMocks();
    jest.setTimeout(5 * 1000); // Reset the timeout to 5 seconds
  }
});

// Clear mocks and data before each test
beforeEach(async () => {
  await Token.deleteMany({});
  await User.deleteMany({});
  jest.clearAllMocks();
});

// Clean up after each test
afterEach(async () => {
  await Token.deleteMany({});
  await User.deleteMany({});
});

describe('Auth', () => {
  describe('given the user is already blocked', () => {
    it('should return 403 when trying to block an already blocked user', async () => {
      const toBeBlockedUser = new User({
        ...userPayload,
        email: 'admin@example.com',
        role: AUTHORIZATION_ROLES.ADMIN
      });
      await toBeBlockedUser.save();

      const currentUser = new User({
        ...userPayload,
        blocked: [toBeBlockedUser._id]
      });
      await currentUser.save();

      const authResponse = await request(app).post('/api/v1/auth/login').send({
        email: currentUser.email,
        password: userPayload.password
      });

      const token = authResponse?.body?.data?.accessToken || '';

      const response = await request(app)
        .put(`/api/v1/user/${toBeBlockedUser._id.toString()}/block`)
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/);

      // Expect a 403 status and message
      expect(response.status).toBe(403);
      expect(response.body.message).toBe('You already blocked this user');
    });
  });
});
