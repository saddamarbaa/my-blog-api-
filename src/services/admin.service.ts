import { NextFunction, Request, Response } from 'express';
import createHttpError, { InternalServerError } from 'http-errors';
import { SignOptions } from 'jsonwebtoken';

import Token from '@src/models/Token.model';
import User from '@src/models/User.model';
import Post from '@src/models/Post.model';

import { cloudinary } from '@src/middlewares';
import { AuthenticatedRequestBody, IPost, IUser, TPaginationResponse, UpdateCommentT } from '@src/interfaces';
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

export const adminGetUserService = async (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) => {
  if (!isValidMongooseObjectId(req.params.userId) || !req.params.userId) {
    return next(createHttpError(422, `Invalid request`));
  }

  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return next(new createHttpError.BadRequest());
    }

    const { password, confirmPassword, ...otherUserInfo } = user._doc;

    const data = {
      user: {
        ...otherUserInfo,
        request: {
          type: 'Get',
          description: 'Get all the user',
          url: `${process.env.API_URL}/api/${process.env.API_VERSION}/admin/users`
        }
      }
    };

    return res.status(200).send(
      customResponse<typeof data>({
        success: true,
        error: false,
        message: `Successfully found user by ID: ${req.params.userId} profile 🍀`,
        status: 200,
        data
      })
    );
  } catch (error) {
    return next(InternalServerError);
  }
};

export const adminGetPostsService = async (_req: Request, res: TPaginationResponse) => {
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

    responseObject.posts = results?.map((postDoc: any) => {
      const { author, ...otherPostInfo } = postDoc._doc;
      return {
        ...otherPostInfo,
        creator: author,
        request: {
          type: 'Get',
          description: 'Get one post with the id',
          url: `${process.env.API_URL}/api/${process.env.API_VERSION}/admin/feed/posts/${postDoc._doc._id}`
        }
      };
    });

    return res.status(200).send(
      customResponse<typeof responseObject>({
        success: true,
        error: false,
        message: responseObject.posts.length ? 'Successful Found posts' : 'No post found',
        status: 200,
        data: responseObject
      })
    );
  }
};

export const adminGetPostService = async (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('author')
      .populate('likes.user')
      .populate('comments.user')
      .exec();

    if (!post) {
      return next(new createHttpError.BadRequest());
    }

    const { author, ...otherPostInfo } = post._doc;

    const data = {
      post: {
        ...otherPostInfo,
        author: undefined,
        creator: author,
        request: {
          type: 'Get',
          description: 'Get all posts',
          url: `${process.env.API_URL}/api/${process.env.API_VERSION}/admin/feed/posts`
        }
      }
    };

    return res.status(200).send(
      customResponse<typeof data>({
        success: true,
        error: false,
        message: `Successfully found post by ID: ${req.params.postId}`,
        status: 200,
        data
      })
    );
  } catch (error) {
    return next(InternalServerError);
  }
};

export const adminCreatePostService = async (
  req: AuthenticatedRequestBody<IPost>,
  res: Response,
  next: NextFunction
) => {
  const { title, description, category, photoUrl } = req.body;

  // Check if either an image file or photoUrl is provided
  if (!req.file && !photoUrl) {
    return next(createHttpError(422, `Either an image file must be uploaded or a photo URL must be provided`));
  }

  try {
    let cloudinaryResult;
    if (req.file?.filename) {
      const localFilePath = `${process.env.PWD}/public/uploads/posts/${req.file?.filename}`;
      cloudinaryResult = await cloudinary.uploader.upload(localFilePath, {
        folder: 'posts'
      });

      // Remove file from local uploads folder
      deleteFile(localFilePath);
    }

    // If no image file, use the provided photo URL
    const photo = cloudinaryResult?.secure_url || photoUrl;

    const postData = new Post({
      title,
      description,
      category: category?.toLocaleLowerCase(),
      photoUrl: photo,
      cloudinary_id: cloudinaryResult?.public_id,
      author: req?.user?._id || ''
    });

    const createdPost = await Post.create(postData);

    const data = {
      post: {
        ...createdPost._doc,
        author: undefined,
        creator: req?.user
      },
      request: {
        type: 'Get',
        description: 'Get all posts',
        url: `${process.env.API_URL}/api/${process.env.API_VERSION}/admin/posts`
      }
    };

    return res.status(201).send(
      customResponse<typeof data>({
        success: true,
        error: false,
        message: `Successfully added new post`,
        status: 201,
        data
      })
    );
  } catch (error) {
    // Remove file from local uploads folder
    if (req.file?.filename) {
      const localFilePath = `${process.env.PWD}/public/uploads/posts/${req.file?.filename}`;
      deleteFile(localFilePath);
    }
    return next(InternalServerError);
  }
};

export const adminDeletePostService = async (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = await Post.findByIdAndDelete({
      _id: req.params.postId
    });

    if (!post) {
      return next(createHttpError(400, `Failed to delete post by given ID ${req.params.postId}`));
    }

    // Delete image from cloudinary
    if (post.cloudinary_id) {
      await cloudinary.uploader.destroy(post.cloudinary_id);
    }

    return res.status(200).json(
      customResponse({
        data: null,
        success: true,
        error: false,
        message: `Successfully deleted post by ID ${req.params.postId}`,
        status: 200
      })
    );
  } catch (error) {
    return next(InternalServerError);
  }
};

export const adminDeleteAllPostForGivenUserService = async (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({
      author: userId
    });

    if (!posts || !posts.length) {
      return next(new createHttpError.BadRequest());
    }

    const droppedUserPost = await Post.deleteMany({
      author: userId
    });

    if (droppedUserPost.deletedCount === 0) {
      return next(createHttpError(400, `Failed to delete post for given user by ID ${userId}`));
    }

    // Remove all the images
    posts.forEach(async (post) => {
      if (post?.cloudinary_id) {
        await cloudinary.uploader.destroy(post?.cloudinary_id);
      }
    });

    return res.status(200).json(
      customResponse({
        data: null,
        success: true,
        error: false,
        message: `Successfully deleted all posts for user by ID ${userId}`,
        status: 200
      })
    );
  } catch (error) {
    return next(error);
  }
};

export const adminClearAllPostsService = async (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find();
    // Delete complete post collection
    const dropCompleteCollection = await Post.deleteMany({});

    if (dropCompleteCollection.deletedCount === 0) {
      return next(createHttpError(400, `Failed to clear posts`));
    }

    // Remove all the images
    posts.forEach(async (post) => {
      if (post?.cloudinary_id) {
        await cloudinary.uploader.destroy(post?.cloudinary_id);
      }
    });

    return res.status(200).send(
      customResponse({
        success: true,
        error: false,
        message: `Successful Cleared all posts`,
        status: 200,
        data: null
      })
    );
  } catch (error) {
    return next(error);
  }
};
