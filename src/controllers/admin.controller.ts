import { NextFunction, Request, Response } from 'express';

import {
  adminAddUserService,
  adminClearAllPostsService,
  adminCreatePostService,
  adminDeleteAllCommentInPostService,
  adminDeleteAllPostForGivenUserService,
  adminDeleteCommentInPostService,
  adminDeletePostService,
  adminGetPostService,
  adminGetPostsService,
  adminGetUserService,
  adminGetUsersService,
  adminUpdateAuthService,
  adminUpdatePostService,
  deleteAccountService
} from '@src/services';
import { AuthenticatedRequestBody, IPost, IUser, TPaginationResponse, UpdateCommentT } from '@src/interfaces';

export const adminGetUsersController = (req: Request, res: TPaginationResponse) => adminGetUsersService(req, res);

export const adminGetUserController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  adminGetUserService(req, res, next);

export const adminAddUserController = (req: Request, res: Response, next: NextFunction) =>
  adminAddUserService(req, res, next);

export const adminUpdateAuthController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  adminUpdateAuthService(req, res, next);

export const adminRemoveUserController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  deleteAccountService(req, res, next);

export const adminGetPostsController = (req: Request, res: TPaginationResponse) => adminGetPostsService(req, res);

export const adminGetPostController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  adminGetPostService(req, res, next);

export const adminCreatePostController = (req: AuthenticatedRequestBody<IPost>, res: Response, next: NextFunction) =>
  adminCreatePostService(req, res, next);

export const adminUpdatePostController = (req: AuthenticatedRequestBody<IPost>, res: Response, next: NextFunction) =>
  adminUpdatePostService(req, res, next);

export const adminDeletePostController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  adminDeletePostService(req, res, next);

export const adminDeleteAllPostForGivenUserController = (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => adminDeleteAllPostForGivenUserService(req, res, next);

export const adminDeleteAllCommentInPostController = (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => adminDeleteAllCommentInPostService(req, res, next);

export const adminDeleteCommentInPostController = (
  req: AuthenticatedRequestBody<UpdateCommentT>,
  res: Response,
  next: NextFunction
) => adminDeleteCommentInPostService(req, res, next);

export const adminClearAllPostsController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  adminClearAllPostsService(req, res, next);
