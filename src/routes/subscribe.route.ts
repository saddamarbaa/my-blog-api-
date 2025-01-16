import express from 'express';
import { subscriberToNewsletterController } from '@src/controllers';
import { emailValidation } from '@src/middlewares';

const router = express.Router();

router.post('/newsletter', emailValidation, subscriberToNewsletterController);

export = router;
