import { NextFunction, Request, Response } from 'express';
import createHttpError, { InternalServerError } from 'http-errors';

import User from '@src/models/User.model';
import Post from '@src/models/Post.model';
import { customResponse, deleteFile } from '@src/utils';
import { AuthenticatedRequestBody, IPost, IUser } from '@src/interfaces';
import { cloudinary } from '@src/middlewares';

export const createPostService = async (req: AuthenticatedRequestBody<IPost>, res: Response, next: NextFunction) => {
  const { title, description, category } = req.body;

  // console.log(req.body, req.file);

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

    const postData = new Post({
      title,
      description,
      category: category?.toLocaleLowerCase(),
      photoUrl: cloudinaryResult?.secure_url,
      cloudinary_id: cloudinaryResult?.public_id,
      author: req?.user?._id || ''
    });

    const createdPost = await Post.create(postData);

    const data = {
      post: {
        ...createdPost._doc,
        author: {
          _id: req?.user?._id || '',
          firstName: req?.user?.firstName || '',
          lastName: req?.user?.lastName || '',
          profileUrl: req?.user?.profileUrl || ''
        }
      },
      request: {
        type: 'Get',
        description: 'Get all posts',
        url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts`
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

export const getPostService = async (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findOne({
      id: req.params.postId
    })
      .select('-cloudinary_id')
      .populate('author', 'firstName  lastName  profileUrl bio')
      .populate('likes.user', 'firstName  lastName  profileUrl bio')
      .populate('disLikes', 'firstName  lastName  profileUrl bio')
      .populate('comments.user', 'firstName  lastName  profileUrl bio')
      .populate('views', 'firstName  lastName  profileUrl bio')
      .populate('shares', 'firstName  lastName  profileUrl bio')
      .exec();

    if (!post) {
      return next(new createHttpError.BadRequest());
    }

    const data = {
      post: {
        ...post._doc,
        request: {
          type: 'Get',
          description: 'Get all posts',
          url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts`
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
