import { Response, NextFunction } from 'express';

import { blockUserService, followUserService, unBlockUserService, unFollowUserService } from '@src/services';
import { AuthenticatedRequestBody, IUser } from '@src/interfaces';

export const followUserController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  followUserService(req, res, next);

export const unFollowUserController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  unFollowUserService(req, res, next);

export const blockUserController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  blockUserService(req, res, next);

export const unBlockUserController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  unBlockUserService(req, res, next);
