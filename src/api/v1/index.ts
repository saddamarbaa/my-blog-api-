import express from 'express';

import apiV1RootRoute from '@src/routes/apiV1Welcome.route';
import healthCheckRoute from '@src/routes/healthCheck.route';
import authRoutes from '@src/routes/auth.route';
import userRoutes from '@src/routes/user.route';
import postRoutes from '@src/routes/post.route';
import adminRoutes from '@src/routes/admin.route';
import subscribeRoutes from '@src/routes/subscribe.route';

const router = express.Router();

// Root route
router.use('/', apiV1RootRoute);

// Health check route
router.use('/healthChecker', healthCheckRoute);

// Authentication routes
router.use('/auth', authRoutes);

// User-related routes
router.use('/user', userRoutes);

// Post-related routes
router.use('/posts', postRoutes);

// Admin-related routes
router.use('/admin', adminRoutes);

// Subscribe routes (for newsletter and waitlist)
router.use('/subscribe', subscribeRoutes);

export default router;
