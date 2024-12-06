import express from 'express';

import { followUserController, unFollowUserController } from '@src/controllers';
import { isLogin, updateUserValidation } from '@src/middlewares';

const router = express.Router();

router.put('/:userId/follow', isLogin, updateUserValidation, followUserController);
router.put('/:userId/un-follow', isLogin, updateUserValidation, unFollowUserController);

export = router;
