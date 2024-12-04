import express, { Request, Response } from 'express';

import { ResponseT } from '@src/interfaces';
import { customResponse } from '@src/utils';

const router = express.Router();

router.get('/', (req: Request, res: Response<ResponseT<null>>) => {
  const message = 'Welcome to the API - 👋🌎🌍🌏 - Use /api/v1 for the latest version';
  res.send(customResponse({ data: null, success: true, error: false, message, status: 200 }));
});

export = router;
