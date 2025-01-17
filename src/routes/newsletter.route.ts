import express from 'express';
import {
  subscriberToNewsletterController,
  unsubscribeFromNewsController,
  verifyEmailSubscriptionController
} from '@src/controllers';
import { emailValidation, verifyUserMailValidation } from '@src/middlewares';

const router = express.Router();

// Route for subscribing to the newsletter
router.post('/subscribe', emailValidation, subscriberToNewsletterController);

// Route for unsubscribing from the newsletter
router.post('/unsubscribe', emailValidation, unsubscribeFromNewsController);

// Route for verifying email subscription
router.get('/verify-email/:token', verifyUserMailValidation, verifyEmailSubscriptionController);

export = router;
