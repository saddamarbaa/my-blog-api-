import { NextFunction, Response } from 'express';
import createHttpError from 'http-errors';

import { IAuthRequest as IAdminRequest } from '@src/interfaces';
import { AUTHORIZATION_ROLES } from '@src/constants';
import { environmentConfig } from '@src/configs';

export const isAdmin = async (req: IAdminRequest, res: Response, next: NextFunction) => {
  const user = req?.user;

  const adminEmails = environmentConfig?.ADMIN_EMAILS && (JSON.parse(environmentConfig.ADMIN_EMAILS) as string[]);
  const adminUser = user && user.role === AUTHORIZATION_ROLES.ADMIN && adminEmails?.includes(`${user?.email}`);

  if (!adminUser) {
    return next(createHttpError(403, `Auth Failed (Unauthorized)`));
  }

  next();
};

export default { isAdmin };
