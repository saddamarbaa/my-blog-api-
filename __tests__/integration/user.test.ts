import mongoose from 'mongoose';
import request from 'supertest';

import { environmentConfig } from '@src/configs';
import User from '@src/models/User.model';
import Token from '@src/models/Token.model';
import app from '@src/app';
import { adminEmails, AUTHORIZATION_ROLES, userPayload, validMongooseObjectId } from '@src/constants';

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

describe('User', () => {
  describe('PUT /api/v1/user/:userId/block', () => {
    describe('given the user is not logged in', () => {
      it('should return a 401 status with a JSON message - Auth Failed', async () => {
        await request(app)
          .put('/api/v1/user/63d7d3ce0ba02465093d3d36/block')
          .expect(401)
          .then((response) =>
            expect(response.body).toMatchObject({
              data: null,
              success: false,
              error: true,
              message: expect.any(String),
              status: 401,
              stack: expect.any(String)
            })
          );
      });
    });

    describe('given invalid user id', () => {
      it('should return a 422 status with validation message', async () => {
        const newUser = new User({
          ...userPayload,
          email: adminEmails?.[0] || userPayload.email,
          role: AUTHORIZATION_ROLES.ADMIN
        });
        await newUser.save();

        const authResponse = await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: adminEmails?.[0] || userPayload.email,
            password: userPayload.password
          });

        const token = authResponse?.body?.data?.accessToken || '';

        if (token) {
          await request(app)
            .put('/api/v1/user/invalidId/block')
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
              expect(response.body).toMatchObject({
                data: null,
                error: true,
                status: 422,
                message: expect.any(String),
                stack: expect.any(String)
              });
              expect(response.body.message).toMatch(/fails to match the valid mongo id pattern/);
            });
        }
      });
    });

    describe('given the user does not exist', () => {
      it('should return a 400 status with a JSON message - Bad request', async () => {
        const newUser = new User({
          ...userPayload,
          email: adminEmails?.[0] || userPayload.email,
          role: AUTHORIZATION_ROLES.ADMIN
        });
        await newUser.save();

        const authResponse = await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: adminEmails?.[0] || userPayload.email,
            password: userPayload.password
          });

        const token = authResponse?.body?.data?.accessToken || '';

        if (token) {
          await request(app)
            .put(`/api/v1/user/${validMongooseObjectId}/block`)
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
              expect(response.body).toMatchObject({
                data: null,
                success: false,
                error: true,
                message: expect.any(String),
                status: 400,
                stack: expect.any(String)
              });
            });
        }
      });
    });

    describe('given the user is trying to block themselves', () => {
      it('should return a 403 status with a JSON message - You can’t block yourself', async () => {
        const newUser = new User({
          ...userPayload,
          email: adminEmails?.[0] || userPayload.email,
          role: AUTHORIZATION_ROLES.ADMIN
        });
        await newUser.save();

        const authResponse = await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: adminEmails?.[0] || userPayload.email,
            password: userPayload.password
          });

        const token = authResponse?.body?.data?.accessToken || '';
        const userId = authResponse?.body?.data?.user?._id || '';

        if (userId && token) {
          await request(app)
            .put(`/api/v1/user/${userId}/block`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .then((response) => {
              expect(response.body).toMatchObject({
                data: null,
                error: true,
                status: 403,
                message: expect.any(String),
                stack: expect.any(String)
              });
              expect(response.body.message).toMatch('cannot block yourself');
            });
        }
      });
    });

    describe('given the user is already blocked', () => {
      it('should return a 403 status with a JSON message - User already blocked', async () => {
        // Create the user doing the blocking
        const currentUser = new User({
          ...userPayload,
          email: (adminEmails && adminEmails[0]) || userPayload.email,
          role: AUTHORIZATION_ROLES.ADMIN
        });

        await currentUser.save();

        const toBeBlockUser = new User({
          ...userPayload,
          blocked: [currentUser._id]
        });

        await toBeBlockUser.save();

        const authResponse = await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: (adminEmails && adminEmails[0]) || userPayload.email,
            password: userPayload.password
          });

        const token = authResponse?.body?.data?.accessToken || '';

        // Ensure token is retrieved correctly
        console.log('Auth Response:', authResponse.body);

        // Ensure the user is blocked already
        if (toBeBlockUser._id && token) {
          await request(app)
            .put(`/api/v1/user/${toBeBlockUser._id}/block`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .then((response) => {
              console.log('Response:', response.body); // Log response to inspect

              // Check if the response body matches the expected error
              expect(response.body).toMatchObject({
                data: null,
                error: true,
                status: 403,
                message: expect.any(String),
                stack: expect.any(String)
              });
              expect(response.body.message).toMatch('You already blocked this user');
            })
            .catch((error) => {
              console.log('Error:', error); // Log any errors for debugging
            });
        }
      });
    });

    describe('given the user is logged in and authorized and the userId to block exists in the DB', () => {
      it('should return a 200 status with the blocked user', async () => {
        const currentUser = new User({
          ...userPayload,
          email: adminEmails?.[0] || userPayload.email,
          role: AUTHORIZATION_ROLES.ADMIN
        });

        await currentUser.save();

        const toBeBlockedUser = new User({
          ...userPayload
        });

        await toBeBlockedUser.save();

        const authResponse = await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: adminEmails?.[0] || userPayload.email,
            password: userPayload.password
          });

        const token = authResponse?.body?.data?.accessToken || '';

        if (toBeBlockedUser._id && token) {
          await request(app)
            .put(`/api/v1/user/${toBeBlockedUser._id}/block`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .then((response) => {
              expect(response.body).toMatchObject({
                success: true,
                error: false,
                message: expect.any(String),
                status: 200
              });
              expect(response.body.message).toMatch('User has been blocked successfully');
            });
        }
      });
    });
  });

  /**
   * Testing follow user endpoint
   */
  describe('PUT  /api/v1/user/:userId/follow', () => {
    describe('given the user is not logged in', () => {
      it('should return a 401 status with a json message - Auth Failed', async () => {
        request(app)
          .put('/api/v1/user/63d7d3ce0ba02465093d3d36/follow')
          .expect(401)
          .then((response) =>
            expect(response.body).toMatchObject({
              data: null,
              success: false,
              error: true,
              message: expect.any(String),
              status: 401,
              stack: expect.any(String)
            })
          );
      });
    });

    describe('given invaild user id', () => {
      it('should return a 422 status with validation message', async () => {
        const newUser = new User({
          ...userPayload,
          email: (adminEmails && adminEmails[0]) || userPayload.email,
          role: AUTHORIZATION_ROLES.ADMIN
        });
        await newUser.save();

        const authResponse = await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: (adminEmails && adminEmails[0]) || userPayload.email,
            password: userPayload.password
          });

        const token = (authResponse && authResponse?.body?.data?.accessToken) || '';

        if (token) {
          await request(app)
            .put(`/api/v1/user/invaildid/follow`)
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
              expect(response.body).toMatchObject({
                data: null,
                error: true,
                status: 422,
                message: expect.any(String),
                stack: expect.any(String)
              });
              expect(response?.body?.message).toMatch(/fails to match the valid mongo id pattern/);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    });

    describe('given the user does not exist', () => {
      it('should return a 400 status with a json message - bad request', async () => {
        const newUser = new User({
          ...userPayload,
          email: (adminEmails && adminEmails[0]) || userPayload.email,
          role: AUTHORIZATION_ROLES.ADMIN
        });
        await newUser.save();

        const authResponse = await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: (adminEmails && adminEmails[0]) || userPayload.email,
            password: userPayload.password
          });

        const token = (authResponse && authResponse?.body?.data?.accessToken) || '';

        if (token) {
          await request(app)
            .put(`/api/v1/user/${validMongooseObjectId}/follow`)
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
              expect(response.body).toMatchObject({
                data: null,
                success: false,
                error: true,
                message: expect.any(String),
                status: 400,
                stack: expect.any(String)
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    });

    describe('given the user is trying to follow themselves', () => {
      it('should return a 403 status with a json message - You cant follow yourself', async () => {
        const newUser = new User({
          ...userPayload,
          email: (adminEmails && adminEmails[0]) || userPayload.email,
          role: AUTHORIZATION_ROLES.ADMIN
        });
        await newUser.save();

        const authResponse = await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: (adminEmails && adminEmails[0]) || userPayload.email,
            password: userPayload.password
          });

        const token = (authResponse && authResponse?.body?.data?.accessToken) || '';

        const userId = (authResponse && authResponse?.body?.data?.user?._id) || '';

        if (userId && token) {
          await request(app)
            .put(`/api/v1/user/${userId}/follow`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .then((response) => {
              expect(response.body).toMatchObject({
                data: null,
                error: true,
                status: 403,
                message: expect.any(String),
                stack: expect.any(String)
              });
              expect(response?.body?.message).toMatch('cannot follow yourself');
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    });

    describe('given the user is already been followed', () => {
      it('should return a 403 status with a json message - You already follow this user', async () => {
        const currentUser = new User({
          ...userPayload,
          email: (adminEmails && adminEmails[0]) || userPayload.email,
          role: AUTHORIZATION_ROLES.ADMIN
        });

        await currentUser.save();

        const toBeFollowedUser = new User({
          ...userPayload,
          followers: [currentUser?._id]
        });
        await toBeFollowedUser.save();

        const authResponse = await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: (adminEmails && adminEmails[0]) || userPayload.email,
            password: userPayload.password
          });

        const token = (authResponse && authResponse?.body?.data?.accessToken) || '';

        if (toBeFollowedUser?._id && token) {
          await request(app)
            .put(`/api/v1/user/${toBeFollowedUser?._id}/follow`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .then((response) => {
              expect(response.body).toMatchObject({
                data: null,
                error: true,
                status: 403,
                message: expect.any(String),
                stack: expect.any(String)
              });
              expect(response?.body?.message).toMatch('already followed this user');
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    });

    describe('given the user is logged in and authorized and the given userId to follow does exist in DB', () => {
      it('should return a 200 status with the followed user', async () => {
        const currentUser = new User({
          ...userPayload,
          email: (adminEmails && adminEmails[0]) || userPayload.email,
          role: AUTHORIZATION_ROLES.ADMIN
        });

        await currentUser.save();

        const toBeFollowedUser = new User({
          ...userPayload
        });

        await toBeFollowedUser.save();

        const authResponse = await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: (adminEmails && adminEmails[0]) || userPayload.email,
            password: userPayload.password
          });

        const token = (authResponse && authResponse?.body?.data?.accessToken) || '';

        if (toBeFollowedUser?._id && token) {
          await request(app)
            .put(`/api/v1/user/${toBeFollowedUser?._id}/follow`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .then((response) => {
              expect(response.body).toMatchObject({
                success: true,
                error: false,
                message: expect.any(String),
                status: 200
              });
              expect(response?.body?.message).toMatch('has been followed successfully');
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    });
  });

  /**
   * Testing un follow user endpoint
   */
  describe('PUT  /api/v1/user/:userId/un-follow', () => {
    describe('given the user is not logged in', () => {
      it('should return a 401 status with a json message - Auth Failed', async () => {
        request(app)
          .put('/api/v1/user/63d7d3ce0ba02465093d3d36/un-follow')
          .expect(401)
          .then((response) =>
            expect(response.body).toMatchObject({
              data: null,
              success: false,
              error: true,
              message: expect.any(String),
              status: 401,
              stack: expect.any(String)
            })
          );
      });
    });

    describe('given invaild user id', () => {
      it('should return a 422 status with validation message', async () => {
        const newUser = new User({
          ...userPayload,
          email: (adminEmails && adminEmails[0]) || userPayload.email,
          role: AUTHORIZATION_ROLES.ADMIN
        });
        await newUser.save();

        const authResponse = await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: (adminEmails && adminEmails[0]) || userPayload.email,
            password: userPayload.password
          });

        const token = (authResponse && authResponse?.body?.data?.accessToken) || '';

        if (token) {
          await request(app)
            .put(`/api/v1/user/invaildid/un-follow`)
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
              expect(response.body).toMatchObject({
                data: null,
                error: true,
                status: 422,
                message: expect.any(String),
                stack: expect.any(String)
              });
              expect(response?.body?.message).toMatch(/fails to match the valid mongo id pattern/);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    });

    describe('given the user does not exist', () => {
      it('should return a 400 status with a json message - bad request', async () => {
        const newUser = new User({
          ...userPayload,
          email: (adminEmails && adminEmails[0]) || userPayload.email,
          role: AUTHORIZATION_ROLES.ADMIN
        });
        await newUser.save();

        const authResponse = await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: (adminEmails && adminEmails[0]) || userPayload.email,
            password: userPayload.password
          });

        const token = (authResponse && authResponse?.body?.data?.accessToken) || '';

        if (token) {
          await request(app)
            .put(`/api/v1/user/${validMongooseObjectId}/follow`)
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
              expect(response.body).toMatchObject({
                data: null,
                success: false,
                error: true,
                message: expect.any(String),
                status: 400,
                stack: expect.any(String)
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    });

    describe('given the user is trying to un follow themselves', () => {
      it('should return a 403 status with a json message - You cant un follow yourself', async () => {
        const newUser = new User({
          ...userPayload,
          email: (adminEmails && adminEmails[0]) || userPayload.email,
          role: AUTHORIZATION_ROLES.ADMIN
        });
        await newUser.save();

        const authResponse = await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: (adminEmails && adminEmails[0]) || userPayload.email,
            password: userPayload.password
          });

        const token = (authResponse && authResponse?.body?.data?.accessToken) || '';

        const userId = (authResponse && authResponse?.body?.data?.user?._id) || '';

        if (userId && token) {
          await request(app)
            .put(`/api/v1/user/${userId}/un-follow`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .then((response) => {
              expect(response.body).toMatchObject({
                data: null,
                error: true,
                status: 403,
                message: expect.any(String),
                stack: expect.any(String)
              });
              expect(response?.body?.message).toMatch('cant un follow yourself');
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    });

    describe('given the user is not been followed', () => {
      it("should return a 403 status with a json message - You haven't follow this user before", async () => {
        const currentUser = new User({
          ...userPayload,
          email: (adminEmails && adminEmails[0]) || userPayload.email,
          role: AUTHORIZATION_ROLES.ADMIN
        });

        await currentUser.save();

        const toBeUnFollowedUser = new User({
          ...userPayload
        });
        await toBeUnFollowedUser.save();

        const authResponse = await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: (adminEmails && adminEmails[0]) || userPayload.email,
            password: userPayload.password
          });

        const token = (authResponse && authResponse?.body?.data?.accessToken) || '';

        if (toBeUnFollowedUser?._id && token) {
          await request(app)
            .put(`/api/v1/user/${toBeUnFollowedUser?._id}/un-follow`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .then((response) => {
              expect(response.body).toMatchObject({
                data: null,
                error: true,
                status: 403,
                message: expect.any(String),
                stack: expect.any(String)
              });
              expect(response?.body?.message).toMatch("You haven't followed this user before");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    });

    describe('given the user is logged in and authorized and the given userId to un follow does exist in DB and already been followed', () => {
      it('should return a 200 status with user profile with out un followed user', async () => {
        const currentUser = new User({
          ...userPayload,
          email: (adminEmails && adminEmails[0]) || userPayload.email,
          role: AUTHORIZATION_ROLES.ADMIN
        });

        await currentUser.save();

        const toBeUnFollowedUser = new User({
          ...userPayload,
          followers: [currentUser?._id]
        });
        await toBeUnFollowedUser.save();

        const authResponse = await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: (adminEmails && adminEmails[0]) || userPayload.email,
            password: userPayload.password
          });

        const token = (authResponse && authResponse?.body?.data?.accessToken) || '';

        if (toBeUnFollowedUser?._id && token) {
          await request(app)
            .put(`/api/v1/user/${toBeUnFollowedUser?._id}/un-follow`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .then((response) => {
              expect(response.body).toMatchObject({
                success: true,
                error: false,
                message: expect.any(String),
                status: 200
              });
              expect(response?.body?.message).toMatch('User has been unfollowed successfully');
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    });
  });
});
