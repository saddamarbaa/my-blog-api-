import express from 'express';

import { addPostValidation, isLogin, uploadImage } from '@src/middlewares';
import { createPostController } from '@src/controllers';

const router = express.Router();

router.post('/', uploadImage.single('postImage'), isLogin, addPostValidation, createPostController);

export = router;
