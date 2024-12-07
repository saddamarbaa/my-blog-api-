import express from 'express';

import apiV1RootRoute from '@src/routes/apiV1Welcome.route';
import healthCheckRoute from '@src/routes/healthCheck.route';
import authRoutes from '@src/routes/auth.route';
import userRoutes from '@src/routes/user.route';
import postRoutes from '@src/routes/post.route';

const router = express.Router();

router.use('/', apiV1RootRoute);
router.use('/healthChecker', healthCheckRoute);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/posts', postRoutes);

export default router;
