import { NextFunction, Request, Response } from 'express';

import { AuthenticatedRequestBody, IPost } from '@src/interfaces';
import { createPostService } from '@src/services';

export const createPostController = (req: AuthenticatedRequestBody<IPost>, res: Response, next: NextFunction) =>
  createPostService(req, res, next);
