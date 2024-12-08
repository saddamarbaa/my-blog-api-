import { NextFunction, Request, Response } from 'express';
import createHttpError, { InternalServerError } from 'http-errors';

import { ObjectId } from 'mongoose';
import User from '@src/models/User.model';
import Post from '@src/models/Post.model';
import { customResponse, deleteFile } from '@src/utils';
import { AuthenticatedRequestBody, IPost, IUser, TPaginationResponse } from '@src/interfaces';
import { cloudinary } from '@src/middlewares';
import { AUTHORIZATION_ROLES } from '@src/constants';

export const createPostService = async (req: AuthenticatedRequestBody<IPost>, res: Response, next: NextFunction) => {
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

export const updatePostService = async (req: AuthenticatedRequestBody<IPost>, res: Response, next: NextFunction) => {
  const { title, description, category, photoUrl } = req.body;

  try {
    const post = await Post.findById(req.params.postId)
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

    // Allow user to update only post which is created by them
    if (!req.user?._id.equals(post.author._id) && req?.user?.role !== 'admin') {
      return next(createHttpError(403, `Auth Failed (Unauthorized)`));
    }

    if (post.cloudinary_id && req.file?.filename) {
      // Delete the old image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinary_id);
    }

    let cloudinaryResult;
    if (req.file?.filename) {
      const localFilePath = `${process.env.PWD}/public/uploads/posts/${req.file?.filename}`;

      cloudinaryResult = await cloudinary.uploader.upload(localFilePath, {
        folder: 'posts'
      });

      deleteFile(localFilePath);
    }

    post.title = title || post.title;
    post.description = description || post.description;
    post.category = category || post.category;
    post.cloudinary_id = req.file?.filename ? cloudinaryResult?.public_id : post.cloudinary_id;
    post.photoUrl = cloudinaryResult?.secure_url || photoUrl || post.photoUrl;

    const updatedPost = await post.save({ new: true });

    const data = {
      post: {
        ...updatedPost._doc,
        author: {
          _id: req?.user?._id || '',
          firstName: req?.user?.firstName || '',
          lastName: req?.user?.lastName || '',
          profileUrl: req?.user?.profileUrl || ''
        },
        request: {
          type: 'Get',
          description: 'Get all posts',
          url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts`
        }
      }
    };

    return res.status(200).json(
      customResponse<typeof data>({
        success: true,
        error: false,
        message: `Successfully update post by ID ${req.params.postId}`,
        status: 200,
        data
      })
    );
  } catch (error) {
    return next(InternalServerError);
  }
};

export const getPostsService = async (_req: Request, res: TPaginationResponse) => {
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

    responseObject.posts = (results as Array<{ _doc: IPost }>).map((postDoc) => {
      return {
        ...postDoc._doc,
        request: {
          type: 'Get',
          description: 'Get one post with the id',
          url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts/${postDoc._doc._id}`
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

export const getPostService = async (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findOne({
      _id: req.params.postId
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

export const getTimelinePostsService = async (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the user and his/her followers and friends
    const userId = req.user?._id;
    const user = await User.findById(userId).populate('friends following').exec();
    const friendsIds = user?.friends.map((friend) => friend._id) as unknown as ObjectId[];
    const followingIds = user?.following.map((following) => following._id) as unknown as ObjectId[];

    const userIds = [...friendsIds, ...followingIds, userId];

    // Get the posts by all the users
    const posts = await Post.find({ author: { $in: userIds } })
      .select('-cloudinary_id')
      .sort({ createdAt: -1 })
      .populate('author', 'firstName  lastName  profileUrl bio')
      .populate('likes.user', 'firstName  lastName  profileUrl bio')
      .populate('disLikes', 'firstName  lastName  profileUrl bio')
      .populate('comments.user', 'firstName  lastName  profileUrl bio')
      .populate('views', 'firstName  lastName  profileUrl bio')
      .populate('shares', 'firstName  lastName  profileUrl bio')
      .exec();

    const postsWithRequests = (posts as Array<{ _doc: IPost }>).map((postDoc) => {
      return {
        ...postDoc._doc,
        request: {
          type: 'Get',
          description: 'Get one post with the id',
          url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts/${postDoc._doc._id}`
        }
      };
    });

    if (!posts) {
      return next(new createHttpError.BadRequest());
    }

    const data = {
      posts: postsWithRequests
    };

    return res.status(200).send(
      customResponse<typeof data>({
        success: true,
        error: false,
        message: posts.length ? 'Successful Found posts' : 'No post found',
        status: 200,
        data
      })
    );
  } catch (error) {
    return next(error);
  }
};

export const deletePostService = async (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findById(req.params.postId).populate('author').exec();

    if (!post) {
      return next(new createHttpError.BadRequest());
    }

    // Allow user to delete only post which is created by them
    if (!req.user?._id.equals(post.author._id) && req?.user?.role !== AUTHORIZATION_ROLES.ADMIN) {
      return next(createHttpError(403, `Auth Failed (Unauthorized)`));
    }

    const isDeleted = await Post.findByIdAndDelete({
      _id: req.params.postId
    });

    if (!isDeleted) {
      return next(createHttpError(400, `Failed to delete post by given ID ${req.params.postId}`));
    }

    // const fullImage = post.postImage || '';
    // const imagePath = fullImage.split('/').pop() || '';
    // const folderFullPath = `${process.env.PWD}/public/uploads/posts/${imagePath}`;

    // deleteFile(folderFullPath);

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

export const getUserPostsService = async (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find({
      author: req?.user?._id
    })
      .select('-cloudinary_id')
      .populate('author', 'firstName  lastName  profileUrl bio')
      .populate('likes.user', 'firstName  lastName  profileUrl bio')
      .populate('disLikes', 'firstName  lastName  profileUrl bio')
      .populate('comments.user', 'firstName  lastName  profileUrl bio')
      .populate('views', 'firstName  lastName  profileUrl bio')
      .populate('shares', 'firstName  lastName  profileUrl bio')
      .exec();

    const postsWithRequests = (posts as Array<{ _doc: IPost }>).map((postDoc) => {
      return {
        ...postDoc._doc,
        request: {
          type: 'Get',
          description: 'Get one post with the id',
          url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts/${postDoc._doc._id}`
        }
      };
    });

    const data = {
      posts: postsWithRequests
    };

    return res.status(200).send(
      customResponse<typeof data>({
        success: true,
        error: false,
        message: posts.length
          ? `Successfully found all posts for user by ID ${req?.user?._id}`
          : `No post found for user by ID ${req?.user?._id}`,
        status: 200,
        data
      })
    );
  } catch (error) {
    return next(error);
  }
};

export const deleteUserPostsService = async (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find({
      author: req?.user?._id || ''
    })
      .populate('author')
      .exec();

    if (!posts || !posts.length) {
      return next(new createHttpError.BadRequest());
    }

    const droppedUserPost = await Post.deleteMany({
      author: req?.user?._id
    });

    if (droppedUserPost.deletedCount === 0) {
      return next(createHttpError(400, `Failed to delete post for given user by ID ${req?.user?._id}`));
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
        message: `Successfully deleted all posts for user by ID ${req?.user?._id}`,
        status: 200
      })
    );
  } catch (error) {
    return next(error);
  }
};
