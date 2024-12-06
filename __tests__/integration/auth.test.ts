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

describe('Auth', () => {
  /**
   * Testing auth registration endpoint
   */
  describe('POST /api/v1/auth/signup', () => {
    describe('given any of the flowing filed is missing (firstName,lastName,email,password,confirmPassword)', () => {
      it('should return a 422 status with validation message', async () => {
        // firstName is missing
        await request(app)
          .post('/api/v1/auth/signup')
          .send({})
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 422,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/First name/);
          });

        // last Name is missing
        await request(app)
          .post('/api/v1/auth/signup')
          .send({ firstName: userPayload.firstName })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(422) // Expecting a 422 Unprocessable Entity status
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 422,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/Last name/);
          });

        // email is missing
        await request(app)
          .post('/api/v1/auth/signup')
          .send({ firstName: userPayload.firstName, lastName: userPayload.lastName })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 422,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/Email is required/);
          });

        // password is missing
        await request(app)
          .post('/api/v1/auth/signup')
          .send({ firstName: userPayload.firstName, lastName: userPayload.lastName, email: userPayload.email })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 422,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/Password is required/);
          });

        // confirmPassword is missing
        await request(app)
          .post('/api/v1/auth/signup')
          .send({
            firstName: userPayload.firstName,
            lastName: userPayload.lastName,
            email: userPayload.email,
            password: userPayload.password
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 422,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/Confirm password is required/);
          });
      });
    });

    describe('given the password is less than 6 characters', () => {
      it('should return a 422 status with validation message', async () => {
        await request(app)
          .post('/api/v1/auth/signup')
          .send({
            ...userPayload,
            password: '123'
          })
          .set('Accept', 'application/json')
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 422,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/Password must be at least 6 characters long/);
          });
      });
    });

    describe('given the confirmPassword do not match', () => {
      it('should return a 422 status with validation message', async () => {
        await request(app)
          .post('/api/v1/auth/signup')
          .send({
            ...userPayload,
            password: 'password',
            confirmPassword: 'confirmPassword'
          })
          .set('Accept', 'application/json')
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 422,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/Confirm password must match password/);
          });
      });
    });

    describe('given the email is not valid ', () => {
      it('should return a 422 status with validation message', async () => {
        await request(app)
          .post('/api/v1/auth/signup')
          .send({
            ...userPayload,
            email: 'notEmail'
          })
          .set('Accept', 'application/json')
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 422,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/Please enter a valid email address/);
          });
      });
    });

    describe('given the email address already been taken by other user', () => {
      it('should return a 409 status with validation message', async () => {
        await User.insertMany([
          {
            ...userPayload
          }
        ]);

        await request(app)
          .post('/api/v1/auth/signup')
          .send({
            ...userPayload
          })
          .set('Accept', 'application/json')
          .expect(409)
          .then((response) => {
            expect(response.body).toMatchObject({
              success: false,
              error: true,
              message: expect.any(String),
              status: 409
            });
            expect(response?.body?.message).toMatch(/already exists, please pick a different one/);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });

    describe('given all the user information are valid', () => {
      it('should create user, send email verification and return a 201 status', async () => {
        await request(app)
          .post('/api/v1/auth/signup')
          .send({
            ...userPayload
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              success: true,
              error: false,
              message: expect.any(String),
              status: 201
            });

            expect(response.body.data).toMatchObject({
              user: {
                accessToken: expect.any(String),
                refreshToken: expect.any(String),
                verifyEmailLink: expect.any(String)
              }
            });

            expect(response?.body?.message).toMatch(
              /Auth Signup is success. An Email with Verification link has been sent/
            );
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  });

  /**
   * Testing auth login endpoint
   */
  describe('POST /api/v1/auth/login', () => {
    describe('given the email or password is missing)', () => {
      it('should return a 422 status with validation message', async () => {
        // email is missing
        await request(app)
          .post('/api/v1/auth/login')
          .send({
            password: userPayload.password
          })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 422,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/email/);
          });

        // password is missing
        await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: userPayload.email
          })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 422,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/password/);
          });
      });
    });

    describe('given the password is less than 6 characters', () => {
      it('should return a 422 status with validation message', async () => {
        await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: userPayload.email,
            password: '123'
          })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              success: false,
              error: true,
              message: expect.any(String),
              status: 422
            });
            expect(response?.body?.message).toMatch(/password/);
          });
      });
    });

    describe('given the email is invaild', () => {
      it('should return a 422 status with validation message', async () => {
        await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'invaild email',
            password: '123hshdhsh'
          })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              success: false,
              error: true,
              message: expect.any(String),
              status: 422
            });
            expect(response?.body?.message).toMatch(/must be a valid email/);
          });
      });
    });

    describe("given the email and password are valid schema but the user with the given email don't exists in DB", () => {
      it('should return a 422 status with validation message', async () => {
        await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: userPayload.email,
            password: userPayload.password
          })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              success: false,
              error: true,
              message: expect.any(String),
              status: 401
            });
            expect(response?.body?.message).toMatch(/Auth Failed/);
          });
      });
    });

    describe('given the email and password are valid', () => {
      it('should authorized the user, set cookies and return a 200 status with access and refresh token', async () => {
        const newUser = new User({
          ...userPayload
        });
        await newUser.save();
        await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: userPayload.email,
            password: userPayload.password
          })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              success: true,
              error: false,
              message: expect.any(String),
              status: 200
            });
          });
      });
    });
  });

  /**
   * Testing auth logout endpoint
   */
  describe('POST /api/v1/auth/logout', () => {
    describe('given the user is not logged in', () => {
      it('should return a 401 status with a json message - Auth Failed', async () => {
        request(app)
          .post('/api/v1/auth/logout')
          .send({
            refreshToken: 'token'
          })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then((response) =>
            expect(response.body).toMatchObject({
              data: null,
              success: false,
              error: true,
              message: 'Bad Request',
              status: 400,
              stack: expect.any(String)
            })
          )
          .catch((error) => {
            console.log(error);
          });
      });
    });

    describe('given the user is logged in and the refresh token is valid', () => {
      it('should logged out the user, and return a 200 status with a json message - logged out success', async () => {
        // create user
        const newUser = new User({
          ...userPayload
        });

        await newUser.save();

        // Login to get token and user id
        const authResponse = await request(app)
          .post('/api/v1/auth/login')
          .send({ email: userPayload.email, password: userPayload.password });
        const refreshToken = authResponse?.body?.data?.refreshToken || '';

        await request(app)
          .post('/api/v1/auth/logout')
          .send({
            refreshToken
          })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body).toMatchObject({
              success: true,
              error: false,
              message: expect.any(String),
              status: 200
            });

            expect(response?.body?.message).toMatch(/logged out/);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });

    describe('given the refresh token is invaild', () => {
      it('should return a 422 status with validation message', async () => {
        request(app)
          .post('/api/v1/auth/logout')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(422)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              success: false,
              error: true,
              message: expect.any(String),
              status: 422,
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/is required/);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  });

  /**
   * Testing auth verify email endpoint
   */
  describe('GET /api/v1/auth/verify-email/:userId/:token', () => {
    describe('given the userId or token is invaild', () => {
      it('should return a 422 status with validation message', async () => {
        // token is invaild schema
        await request(app)
          .get(`/api/v1/auth/verify-email/${validMongooseObjectId}/to`)
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 422,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/must be at least 3 characters long/);
          });

        // user id is invaild mongoose objectId
        await request(app)
          .get(`/api/v1/auth/verify-email/invaild/${validMongooseObjectId}`)
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 422,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/fails to match the valid mongo id pattern/);
          });

        // user id is vaild mongoose objectId but no user with this id found in db
        await request(app)
          .get(`/api/v1/auth/verify-email/${validMongooseObjectId}/${validMongooseObjectId}`)
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 400,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/Email verification token is invalid or has expired/);
          });
      });
    });

    describe('given the user email has already been verified', () => {
      it('should return a 200 status with message your email has already been verified. Please Login', async () => {
        const newUser = await User.create({
          ...userPayload
        });

        await request(app)
          .get(`/api/v1/auth/verify-email/${newUser?._id}/${validMongooseObjectId}`)
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              success: true,
              error: false,
              message: expect.any(String),
              status: 200
            });
            expect(response?.body?.message).toMatch(/email has already been verified/);
          });
      });
    });

    describe('given the refresh token is expired', () => {
      it('should return a 400 status with message token is invalid or has expired', async () => {
        const newUser = await User.create({
          ...userPayload,
          isVerified: false
        });

        await request(app)
          .get(`/api/v1/auth/verify-email/${newUser?._id}/${validMongooseObjectId}`)
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 400,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/token is invalid or has expired/);
          });
      });
    });

    describe('given the userId and token are valid', () => {
      it('should verify the user, and return a 200 status with message your account has been successfully verified . Please Login ', async () => {
        try {
          await User.create({
            ...userPayload,
            isVerified: false
          });

          const authResponse = await request(app)
            .post('/api/v1/auth/login')
            .send({
              email: userPayload.email,
              password: userPayload.password
            })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/);

          if (authResponse && authResponse?.body?.data?.verifyEmailLink) {
            // verify Email Link Example
            // 'http://localhost:50050/verify-email?id=63ce41742b590e7c8115c02d&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2NlNDE3NDJiNTkwZTdjODExNWMwMmQiLCJpYXQiOjE2NzQ0NjE1NTgsImV4cCI6MTcwNjAxOTE1OCwiYXVkIjoiNjNjZTQxNzQyYjU5MGU3YzgxMTVjMDJkIiwiaXNzIjoidGVzdG5kb2Vqcy5jb20ifQ.QvQF2IBTzpJL9YTlSJILE7dxq3HLFrhzBzP6yJJ31kw';

            const fullLink = authResponse?.body?.data?.verifyEmailLink?.split('verify-email?')[1];
            const splitLink = fullLink?.split('&token=');
            const token = splitLink[1];
            const id = splitLink[0].split('id=')[1];

            await request(app)
              .get(`/api/v1/auth/verify-email/${id}/${token}`)
              .set('Accept', 'application/json')
              .set('Content-Type', 'application/json')
              .expect('Content-Type', /json/)
              .then((response) => {
                expect(response.body).toMatchObject({
                  data: null,
                  success: true,
                  error: false,
                  message: expect.any(String),
                  status: 200
                });
                expect(response?.body?.message).toMatch(/account has been successfully verified/);
              });
          }
        } catch (error) {
          console.log('verify-email given the userId and token are valid filed ', error);
        }
      });
    });
  });

  /**
   * Testing auth refresh token endpoint
   */
  describe('POST /api/v1/auth/refresh-token', () => {
    describe('given the refresh token is invaild or missing', () => {
      it('should return a 422 status with validation message', async () => {
        // token is missing
        await request(app)
          .post(`/api/v1/auth/refresh-token`)
          .send({})
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 422,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/is required/);
          });

        // token is invaild schema
        await request(app)
          .post(`/api/v1/auth/refresh-token`)
          .send({ refreshToken: '12' })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 422,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/must be at least 3 characters long/);
          });
      });
    });

    describe('given the token is valid', () => {
      it('should return a 200 status with refresh and access token', async () => {
        await User.create({
          ...userPayload
        });

        const authResponse = await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: userPayload.email,
            password: userPayload.password
          })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/);

        if (authResponse && authResponse?.body?.data?.refreshToken) {
          await request(app)
            .post(`/api/v1/auth/refresh-token`)
            .send({ refreshToken: authResponse?.body?.data?.refreshToken })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect('Content-Type', /json/)
            .then((response) => {
              expect(response.body).toMatchObject({
                data: expect.any(Object),
                success: true,
                error: false,
                message: expect.any(String),
                status: 200
              });
              expect(response.body?.data?.user).toHaveProperty('accessToken');
              expect(response.body?.data?.user).toHaveProperty('refreshToken');
              expect(response?.body?.message).toMatch(/logged in successful/);
            });
        }
      });
    });
  });

  /**
   * Testing delete auth endpoint
   */
  describe('DELETE /api/v1/auth/remove/:userId', () => {
    describe('given the user is logged in and authorized and the given userId to removed does exist in DB', () => {
      it('should return a 200 status with a json message - success', async () => {
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
          await request(await app)
            .delete(`/api/v1/auth/remove/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .then((response) => {
              return expect(response.body).toMatchObject({
                data: null,
                success: true,
                error: false,
                message: expect.any(String),
                status: 200
              });
            });
        }
      });
    });

    describe('given the user is not logged in', () => {
      it('should return a 401 status with a json message - Auth Failed', async () => {
        request(app)
          .delete('/api/v1/auth/remove/userId')
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

    describe('given the user is logged in but the given userId to removed does not exist in DB', () => {
      it('should return a 401 status with a json message - Bad Request', async () => {
        const newUser = new User({
          ...userPayload,
          email: (adminEmails && adminEmails[0]) || userPayload.email,
          role: AUTHORIZATION_ROLES.ADMIN
        });
        await newUser.save();

        const authResponse = await request(await app)
          .post('/api/v1/auth/login')
          .send({
            email: (adminEmails && adminEmails[0]) || userPayload.email,
            password: userPayload.password
          })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);

        // const cookies = authResponse && authResponse?.headers['set-cookie'];
        const token = (authResponse && authResponse?.body?.data?.accessToken) || '';

        if (token) {
          await request(app)
            .delete(`/api/v1/auth/remove/${validMongooseObjectId}`)
            // .set('Cookie', cookies)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then((response) => {
              expect(response.body).toMatchObject({
                data: null,
                success: false,
                error: true,
                message: expect.any(String),
                status: 400
              });
            });
        }
      });
    });

    describe('given the user is logged in and the given userId to removed does exist in DB but the user is Unauthorized to remove', () => {
      it('should return a 403 status with a json message - Unauthorized', async () => {
        await User.insertMany([
          {
            ...userPayload,
            _id: validMongooseObjectId
          },
          {
            ...userPayload,
            email: (adminEmails && adminEmails[0]) || userPayload.email,
            role: AUTHORIZATION_ROLES.ADMIN
          }
        ]);

        const newUser = new User({
          ...userPayload,
          email: 'test8@gmail.com'
        });
        await newUser.save();

        const authResponse = await request(app)
          .post('/api/v1/auth/login')
          .send({
            email: 'test8@gmail.com',
            password: userPayload.password
          })
          .expect(200);

        const token = (authResponse && authResponse?.body?.data?.accessToken) || '';

        if (token) {
          await request(app)
            .delete(`/api/v1/auth/remove/${validMongooseObjectId}`)
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
              expect(response.body).toMatchObject({
                data: null,
                success: false,
                error: true,
                message: expect.any(String),
                status: 403,
                stack: expect.any(String)
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    });
  });

  /**
   * Testing get user profile endpoint
   */
  describe('GET /api/v1/auth/profile', () => {
    describe('given the user is logged in', () => {
      it('should return a 200 status with a json containing user profile', async () => {
        const newUser = new User({
          ...userPayload
        });
        await newUser.save();

        // Login to get token and cookies
        const authResponse = await request(app).post('/api/v1/auth/login').send({
          email: userPayload.email,
          password: userPayload.password
        });

        const cookies = authResponse && authResponse?.headers['set-cookie'];
        const TOKEN = authResponse?.body?.data?.accessToken || '';

        await request(app)
          .get('/api/v1/auth/profile')
          .set('Cookie', cookies)
          .set('Authorization', `Bearer ${TOKEN}`)
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body).toMatchObject({
              success: true,
              error: false,
              message: expect.any(String),
              status: 200
            });

            expect(response?.body?.data?.user?.firstName).toMatch(userPayload.firstName);
            expect(response?.body?.data?.user?.lastName).toMatch(userPayload.lastName);
            expect(response?.body?.data?.user?.email).toMatch(userPayload.email);
            expect(response?.body?.message).toMatch(/user profile/);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });

    describe('given the user is not logged in', () => {
      it('should return a 401 status with a json message - Auth Failed', async () => {
        request(app)
          .get('/api/v1/auth/profile')
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
          )
          .catch((error) => {
            console.log(error);
          });
      });
    });
  });

  /**
   * Testing update auth endpoint
   */
  describe('PATCH  /api/v1/auth/update/:userId', () => {
    describe('given the user is not logged in', () => {
      it('should return a 401 status with a json message - Auth Failed', async () => {
        request(app)
          .patch('/api/v1/auth/update/userId')
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
            .patch(`/api/v1/auth/update/${validMongooseObjectId}`)
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

    describe('given the user is logged in and authorized and the given userId to updated does exist in DB', () => {
      it('should return a 200 status with the updated user', async () => {
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
        const newName = 'testNew';
        if (userId && token) {
          await request(app)
            .patch(`/api/v1/auth/update/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .field({
              name: newName
            })
            .set('Content-Type', 'multipart/form-data')
            .expect('Content-Type', /json/)
            .then((response) => {
              expect(response.body).toMatchObject({
                success: true,
                error: false,
                message: expect.any(String),
                status: 200
              });
              expect(response?.body.data?.user?.name).toMatch(newName.toLowerCase());
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    });
  });

  /**
   * Testing auth reset password endpoint
   */
  describe('GET /api/v1/auth/reset-password/:userId/:token', () => {
    describe('given the userId or token is invaild', () => {
      it('should return a 422 status with validation message', async () => {
        // token is invaild schema
        await request(app)
          .post(`/api/v1/auth/reset-password/${validMongooseObjectId}/to`)
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 422,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/must be at least 3 characters long/);
          });

        // user id is invaild mongoose objectId
        await request(app)
          .get(`/api/v1/auth/verify-email/invaild/${validMongooseObjectId}`)
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 422,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/fails to match the valid mongo id pattern/);
          });

        // user id is vaild mongoose objectId but no user with this id found in db
        await request(app)
          .get(`/api/v1/auth/verify-email/${validMongooseObjectId}/${validMongooseObjectId}`)
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 400,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/Email verification token is invalid or has expired/);
          });
      });
    });

    describe('given password or confirmPassword is missing', () => {
      it('should return a 422 status with validation message', async () => {
        // password is missing
        await request(app)
          .post(`/api/v1/auth/reset-password/${validMongooseObjectId}/${validMongooseObjectId}`)
          .send({ confirmPassword: 'password' })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 422,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/password/);
          });

        // confirmPassword is missing
        await request(app)
          .post(`/api/v1/auth/reset-password/${validMongooseObjectId}/${validMongooseObjectId}`)
          .send({ password: '123456' })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 422,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/confirmPassword/);
          });
      });
    });

    describe('given the password is less than 6 characters', () => {
      it('should return a 422 status with validation message', async () => {
        await request(app)
          .post(`/api/v1/auth/reset-password/${validMongooseObjectId}/${validMongooseObjectId}`)
          .send({ password: '123' })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 422,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/length must be at least 6 characters long/);
          });
      });
    });

    describe('given the confirmPassword do not match', () => {
      it('should return a 422 status with validation message', async () => {
        await request(app)
          .post(`/api/v1/auth/reset-password/${validMongooseObjectId}/${validMongooseObjectId}`)
          .send({
            password: 'password',
            confirmPassword: 'confirmPassword'
          })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 422,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/confirmPassword/);
          });
      });
    });

    describe('given the user id or refresh token is invaild or expired', () => {
      it('should return a 401 status with message token is invalid or has expired', async () => {
        const newUser = await User.create({
          ...userPayload,
          isVerified: false
        });

        await request(app)
          .post(`/api/v1/auth/reset-password/${newUser?._id}/${validMongooseObjectId}`)
          .send({
            password: 'password',
            confirmPassword: 'password'
          })
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .expect('Content-Type', /json/)
          .then((response) => {
            expect(response.body).toMatchObject({
              data: null,
              error: true,
              status: 401,
              message: expect.any(String),
              stack: expect.any(String)
            });
            expect(response?.body?.message).toMatch(/token is invalid or has expired/);
          });
      });
    });

    describe('given the userId and token are valid', () => {
      it('should verify the user, and return a 200 status with message your account has been successfully verified . Please Login ', async () => {
        try {
          await User.create({
            ...userPayload
          });
          const authResponse = await request(app)
            .post(`/api/v1/auth/forget-password`)
            .send({ email: userPayload.email })
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect('Content-Type', /json/);
          if (authResponse && authResponse?.body?.data?.user?.resetPasswordToken) {
            // Link example
            // http://localhost:50050/reset-password?id=63ce6eccda4c8c9c390418a8&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2NlNmVjY2RhNGM4YzljMzkwNDE4YTgiLCJpYXQiOjE2NzQ0NzMxNjUsImV4cCI6MTY3NDQ3NDk2NSwiYXVkIjoiNjNjZTZlY2NkYTRjOGM5YzM5MDQxOGE4IiwiaXNzIjoidGVzdG5kb2Vqcy5jb20ifQ.2xdT4c8-bjEI3Do9VGuJ12w7jkxhZlMYbw4cW5r09jg

            const fullLink = authResponse?.body?.data?.user?.resetPasswordToken?.split('reset-password?')[1];
            const splitLink = fullLink?.split('&token=');
            const token = splitLink[1];
            const id = splitLink[0].split('id=')[1];

            await request(app)
              .post(`/api/v1/auth/reset-password/${id}/${token}`)
              .send({
                password: 'password',
                confirmPassword: 'password'
              })
              .set('Accept', 'application/json')
              .set('Content-Type', 'application/json')
              .expect('Content-Type', /json/)
              .then((response) => {
                expect(response.body).toMatchObject({
                  data: expect.any(Object),
                  success: true,
                  error: false,
                  message: expect.any(String),
                  status: 200
                });
                expect(response?.body?.message).toMatch(/password has been Password Reset/);
              });
          }
        } catch (error) {
          console.log('rest password - given the userId and token are valid filed ', error);
        }
      });
    });
  });
});
