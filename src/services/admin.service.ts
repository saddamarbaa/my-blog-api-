import { NextFunction, Request, Response } from 'express';
import createHttpError, { InternalServerError } from 'http-errors';
import { SignOptions } from 'jsonwebtoken';

import Token from '@src/models/Token.model';
import User from '@src/models/User.model';

import { cloudinary } from '@src/middlewares';
import { AuthenticatedRequestBody, IUser, TPaginationResponse } from '@src/interfaces';
import {
  customResponse,
  deleteFile,
  getProfilePicture,
  getRoleFromEmail,
  isValidMongooseObjectId,
  sendEmailVerificationTemplate,
  sendMail
} from '@src/utils';
import { environmentConfig } from '@src/configs';
import { AUTHORIZATION_ROLES } from '@src/constants';

export const adminAddUserService = async (req: Request, res: Response, next: NextFunction) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    email,
    bio,
    skills,
    profileUrl,
    acceptTerms,
    phoneNumber,
    gender,
    role,
    password,
    confirmPassword
  } = req.body;

  try {
    const isEmailExit = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (isEmailExit) {
      if (req.file?.filename) {
        const localFilePath = `${process.env.PWD}/public/uploads/users/${req.file.filename}`;
        deleteFile(localFilePath);
      }
      return next(createHttpError(422, `E-Mail address ${email} is already exists, please pick a different one.`));
    }

    let cloudinaryResult;
    if (req.file?.filename) {
      // localFilePath: path of image which was just
      // uploaded to "public/uploads/users" folder
      const localFilePath = `${process.env.PWD}/public/uploads/users/${req.file?.filename}`;

      cloudinaryResult = await cloudinary.uploader.upload(localFilePath, {
        folder: 'users'
      });

      // Image has been successfully uploaded on
      // cloudinary So we dont need local image file anymore
      // Remove file from local uploads folder
      deleteFile(localFilePath);
    }

    // Generate profile picture URL
    const finalUserProfilePic = getProfilePicture(firstName, lastName, gender, profileUrl);

    // Determine role based on email
    const finalRole = getRoleFromEmail(email);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      bio,
      phoneNumber,
      dateOfBirth,
      role: role || finalRole,
      profileUrl: finalUserProfilePic,
      skills: skills || [],
      cloudinary_id: cloudinaryResult?.public_id,
      acceptTerms: acceptTerms || true
    });

    // Create and save a new user
    const user = await newUser.save();

    // Create a new token instance for the user
    let token = new Token({ userId: user._id });

    const payload = { userId: user._id };

    // Define secret keys and options for both access and refresh tokens
    const accessTokenSecretKey = environmentConfig.ACCESS_TOKEN_SECRET_KEY as string;
    const refreshTokenSecretKey = environmentConfig.REFRESH_TOKEN_SECRET_KEY as string;

    const accessTokenOptions: SignOptions = {
      expiresIn: environmentConfig.ACCESS_TOKEN_KEY_EXPIRE_TIME,
      issuer: environmentConfig.JWT_ISSUER,
      audience: String(user._id)
    };

    const refreshTokenOptions: SignOptions = {
      expiresIn: environmentConfig.REFRESH_TOKEN_KEY_EXPIRE_TIME,
      issuer: environmentConfig.JWT_ISSUER,
      audience: String(user._id)
    };

    const [accessToken, refreshToken] = await Promise.all([
      token.generateToken(payload, accessTokenSecretKey, accessTokenOptions),
      token.generateToken(payload, refreshTokenSecretKey, refreshTokenOptions)
    ]);

    // Update token instance with the generated tokens
    token.refreshToken = accessToken;
    token.accessToken = refreshToken;

    // Save the token instance
    token = await token.save();

    const verifyEmailLink = `${environmentConfig.WEBSITE_URL}/verify-email?id=${user._id}&token=${token.refreshToken}`;

    // send mail for email verification
    const { data: resendEmailData, error } = await sendMail({
      to: user.email,
      ...sendEmailVerificationTemplate(verifyEmailLink, firstName)
    });

    // ignore email errors for now
    if (error) {
      if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
        console.log('Sending Email error:', error);
        console.log('Sending Email error:');
      }
    } else if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
      console.log(`Successfully  send email to ${email}...`);
      console.log(resendEmailData);
    }

    const data = {
      user: {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        verifyEmailLink
      }
    };

    return res.status(201).json(
      customResponse<typeof data>({
        data,
        success: true,
        error: false,
        message: `Auth Signup is success. An Email with Verification link has been sent to your account ${user.email} Please Verify Your Email first or use the email verification lik which is been send with the response body to verfiy your email`,
        status: 201
      })
    );
  } catch (error) {
    // Remove file from local uploads folder
    if (req.file?.filename) {
      const localFilePath = `${process.env.PWD}/public/uploads/users/${req.file?.filename}`;
      deleteFile(localFilePath);
    }
    return next(InternalServerError);
  }
};

export const adminUpdateAuthService = async (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    email,
    bio,
    skills,
    profileUrl,
    acceptTerms,
    phoneNumber,
    gender,
    status,
    role,
    plan,
    userAward
  } = req.body;

  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return next(new createHttpError.BadRequest());
    }

    // Admin cant update them roles
    const reqUser = req.user;
    if (req.body.role && reqUser && reqUser._id.equals(user._id) && reqUser.role === AUTHORIZATION_ROLES.ADMIN) {
      return next(
        createHttpError(403, `Auth Failed (Admin cant update themselves from admin , please ask another admin)`)
      );
    }

    if (email) {
      const existingUser = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
      if (existingUser && !existingUser._id.equals(user._id)) {
        if (req.file?.filename) {
          const localFilePath = `${process.env.PWD}/public/uploads/users/${req.file.filename}`;
          deleteFile(localFilePath);
        }
        return next(createHttpError(422, `E-Mail address ${email} is already exists, please pick a different one.`));
      }
    }

    if (req.file?.filename && user.cloudinary_id) {
      // Delete the old image from cloudinary
      await cloudinary.uploader.destroy(user.cloudinary_id);
    }

    let cloudinaryResult;
    if (req.file?.filename) {
      // localFilePath: path of image which was just
      // uploaded to "public/uploads/users" folder
      const localFilePath = `${process.env.PWD}/public/uploads/users/${req.file?.filename}`;

      cloudinaryResult = await cloudinary.uploader.upload(localFilePath, {
        folder: 'users'
      });

      // Image has been successfully uploaded on
      // cloudinary So we dont need local image file anymore
      // Remove file from local uploads folder
      deleteFile(localFilePath);
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.gender = gender || user.gender;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.acceptTerms = acceptTerms || user.acceptTerms;
    user.bio = bio || user.bio;
    user.profileUrl = profileUrl || user.profileUrl;
    user.skills = skills || user.skills;
    user.role = role || user.role;
    user.status = status || user.status;
    user.plan = plan || user.plan;
    user.userAward = userAward || user.userAward;
    user.cloudinary_id = req.file?.filename ? cloudinaryResult?.public_id : user.cloudinary_id;

    // @ts-ignore
    const updatedUser = await user.save({ validateBeforeSave: false, new: true });

    if (!updatedUser) {
      return next(createHttpError(422, `Failed to update user by given ID ${req.params.userId}`));
    }

    const {
      password: pass,
      confirmPassword,
      isVerified,
      isDeleted,
      status: stas,
      acceptTerms: acceptTerm,
      role: roles,
      ...otherUserInfo
    } = updatedUser._doc;

    return res.status(200).send(
      customResponse<{ user: IUser }>({
        success: true,
        error: false,
        message: `Successfully updated user by ID: ${req.params.userId}`,
        status: 200,
        data: { user: otherUserInfo }
      })
    );
  } catch (error) {
    // Remove file from local uploads folder
    if (req.file?.filename) {
      const localFilePath = `${process.env.PWD}/public/uploads/users/${req.file?.filename}`;
      deleteFile(localFilePath);
    }
    return next(InternalServerError);
  }
};

export const adminGetUsersService = async (_req: Request, res: TPaginationResponse) => {
  if (res?.paginatedResults) {
    const { results, next, previous, currentPage, totalDocs, totalPages, lastPage } = res.paginatedResults;
    const responseObject: any = {
      totalDocs: totalDocs || 0,
      totalPages: totalPages || 0,
      lastPage: lastPage || 0,
      count: results?.length || 0,
      currentPage: currentPage || 0
    };

    if (next) {
      responseObject.nextPage = next;
    }
    if (previous) {
      responseObject.prevPage = previous;
    }

    responseObject.users = results?.map((userDoc: any) => {
      return {
        ...userDoc._doc,
        request: {
          type: 'Get',
          description: 'Get user info',
          url: `${process.env.API_URL}/api/${process.env.API_VERSION}/admin/users/${userDoc._doc._id}`
        }
      };
    });

    return res.status(200).send(
      customResponse<typeof responseObject>({
        success: true,
        error: false,
        message: 'Successful Found users',
        status: 200,
        data: responseObject
      })
    );
  }
};

