import express from 'express';

import apiV1RootRoute from '@src/routes/apiV1Welcome.route';
import healthCheckRoute from '@src/routes/healthCheck.route';
import authRoutes from '@src/routes/auth.route';

const router = express.Router();

router.use('/', apiV1RootRoute);
router.use('/healthChecker', healthCheckRoute);
router.use('/auth', authRoutes);

export default router;
