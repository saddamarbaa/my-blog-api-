import { NextFunction, Request, Response } from 'express';

import {
  adminAddUserService,
  adminGetUserService,
  adminGetUsersService,
  adminUpdateAuthService,
  deleteAccountService
} from '@src/services';
import { AuthenticatedRequestBody, IUser, TPaginationResponse } from '@src/interfaces';

export const adminGetUsersController = (req: Request, res: TPaginationResponse) => adminGetUsersService(req, res);

export const adminGetUserController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  adminGetUserService(req, res, next);

export const adminAddUserController = (req: Request, res: Response, next: NextFunction) =>
  adminAddUserService(req, res, next);

export const adminUpdateAuthController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  adminUpdateAuthService(req, res, next);

export const adminRemoveUserController = (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) =>
  deleteAccountService(req, res, next);
