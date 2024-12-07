import express from 'express';

import { addPostValidation, isLogin, postIdValidation, uploadImage } from '@src/middlewares';
import { createPostController, getPostController } from '@src/controllers';

const router = express.Router();

router.post('/', uploadImage.single('postImage'), isLogin, addPostValidation, createPostController);
router.get('/:postId', postIdValidation, getPostController);

export = router;
