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
