import express, { Request, Response } from 'express';

import { customResponse } from '@src/utils';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const uptime = process.uptime();

  const message = 'Welcome to Rest API - 👋🌎🌍🌏 - health check confirm';

  res.status(200).send(
    customResponse({
      data: {
        uptime: `${Math.floor(uptime)} seconds`,
        dbStatus: 'Connected'
      },
      success: true,
      error: false,
      message,
      status: 200
    })
  );
});

export default router;
