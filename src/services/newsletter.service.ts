import { Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

import Newsletter from '@src/models/Newsletter.model';
import { customResponse, sendMail, sendNewsletterConfirmationTemplate } from '@src/utils';
import { environmentConfig } from '@src/configs';

export const subscriberToNewsletterService = async (
  req: {
    body: {
      email: string;
      subscriptionType?: string;
    };
  },
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, subscriptionType } = req.body;

    // Check if the email is already subscribed
    const isEmailExist = await Newsletter.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (isEmailExist) {
      return next(createHttpError(409, `Email address ${email} is already subscribed to the newsletter.`));
    }

    // Create a new newsletter subscriber
    const newSubscriber = new Newsletter({
      email,
      subscriptionType: subscriptionType || 'daily'
    });

    // Generate verification token for the new subscriber
    newSubscriber.generateVerificationToken();

    // Save the new subscriber to the database
    const subscriber = await newSubscriber.save();

    // Generate a verification email link
    const verifyEmailLink = `${environmentConfig.WEBSITE_URL}/newsletters/verify?token=${subscriber.verificationToken}`;

    // Send confirmation email with the verification link
    const { data: emailData, error } = await sendMail({
      to: subscriber.email,
      ...sendNewsletterConfirmationTemplate(verifyEmailLink)
    });

    // Log email errors in development
    if (error) {
      if (process?.env?.NODE_ENV === 'development') {
        console.log('Sending Email error:', error);
      }
    } else if (process?.env?.NODE_ENV === 'development') {
      console.log(`Successfully sent confirmation email to ${email}...`);
      console.log(emailData);
    }

    const data = {
      verifyEmailLink,
      request: {
        type: 'Get',
        description: 'Verify your email address to complete the subscription process.',
        url: `${process.env.API_URL}/api/${process.env.API_VERSION}/newsletters/verify?token=${subscriber.verificationToken}`
      }
    };
    return res.status(200).json(
      customResponse<typeof data>({
        success: true,
        error: false,
        message: 'Thank you for subscribing! Please check your email to confirm your subscription.',
        status: 200,
        data
      })
    );
  } catch (err) {
    return next(createHttpError(500, 'An error occurred while subscribing to the newsletter.'));
  }
};

export const verifyEmailSubscriptionService = async (
  req: { query: { token: string } },
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.query;

    // Check if the token is valid
    const subscriber = await Newsletter.findOne({ verificationToken: token });
    if (!subscriber) {
      return next(createHttpError(404, 'Invalid or expired verification token.'));
    }

    // Mark the email as verified
    subscriber.isVerified = true;
    subscriber.verificationToken = '';
    await subscriber.save();

    // Return success response
    const data = {
      message: 'Your email has been successfully verified! You are now subscribed to the newsletter.',
      request: {
        type: 'Get',
        description: 'Get the latest newsletter posts',
        url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts`
      }
    };

    return res.status(200).json(
      customResponse<typeof data>({
        success: true,
        error: false,
        message: 'Email verified successfully.',
        status: 200,
        data
      })
    );
  } catch (err) {
    return next(createHttpError(500, 'An error occurred while verifying your email.'));
  }
};

export const unsubscribeFromNewsletterService = async (
  req: {
    body: {
      email: string;
    };
  },
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    // Find the subscriber by email
    const subscriber = await Newsletter.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (!subscriber) {
      return next(createHttpError(404, 'Email address not found in the newsletter subscription.'));
    }

    // Unsubscribe the user
    subscriber.isVerified = false;
    await subscriber.save();

    // Return success response
    const data = {
      message: 'You have successfully unsubscribed from the newsletter.',
      request: {
        type: 'Get',
        description: 'Get all posts',
        url: `${process.env.API_URL}/api/${process.env.API_VERSION}/posts`
      }
    };

    return res.status(200).json(
      customResponse<typeof data>({
        success: true,
        error: false,
        message: 'Unsubscribed successfully.',
        status: 200,
        data
      })
    );
  } catch (err) {
    return next(createHttpError(500, 'An error occurred while unsubscribing from the newsletter.'));
  }
};
