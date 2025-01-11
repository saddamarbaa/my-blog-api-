import { Response, NextFunction } from 'express';

import {
  blockUserService,
  followUserService,
  getUserService,
  getUsersService,
  unBlockUserService,
  unFollowUserService,
  whoViewedMyProfileService
} from '@src/services';
import { AuthenticatedRequestBody, IUser } from '@src/interfaces';

export const followUserController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  followUserService(req, res, next);

export const unFollowUserController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  unFollowUserService(req, res, next);

export const blockUserController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  blockUserService(req, res, next);

export const unBlockUserController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  unBlockUserService(req, res, next);

export const getUsersController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  getUsersService(req, res, next);

export const getUserController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  getUserService(req, res, next);

export const whoViewedMyProfileController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  whoViewedMyProfileService(req, res, next);
