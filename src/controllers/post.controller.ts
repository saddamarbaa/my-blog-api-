import { NextFunction, Request, Response } from 'express';

import { AuthenticatedRequestBody, IPost, IUser, TPaginationResponse } from '@src/interfaces';
import {
  createPostService,
  deletePostService,
  deleteUserPostsService,
  getPostService,
  getPostsService,
  getTimelinePostsService,
  getUserPostsService,
  updatePostService
} from '@src/services';

export const createPostController = (req: AuthenticatedRequestBody<IPost>, res: Response, next: NextFunction) =>
  createPostService(req, res, next);

export const getPostsController = (req: Request, res: TPaginationResponse) => getPostsService(req, res);

export const getPostController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  getPostService(req, res, next);

export const getTimelinePostsController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  getTimelinePostsService(req, res, next);

export const deletePostController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  deletePostService(req, res, next);

export const getUserPostsController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  getUserPostsService(req, res, next);

export const deleteUserPostsController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  deleteUserPostsService(req, res, next);

export const updatePostController = (req: AuthenticatedRequestBody<IPost>, res: Response, next: NextFunction) =>
  updatePostService(req, res, next);
