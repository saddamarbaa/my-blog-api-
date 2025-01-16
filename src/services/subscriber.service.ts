import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

import Subscriber from '@src/models/Subscriber.model';
import { customResponse } from '@src/utils';

interface AddSubscriberRequest extends Request {
  body: {
    email: string;
  };
}

export const subscriberToNewsletterService = async (req: AddSubscriberRequest, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    // Check if the email is already subscribed
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return next(new createHttpError.Conflict('Email is already subscribed.'));
    }

    const newSubscriber = new Subscriber({
      email
    });

    // Save the subscriber to the database
    await newSubscriber.save();

    // Construct the response data
    const data = {
      subscriber: {
        id: newSubscriber._id,
        email: newSubscriber.email,
        subscribedAt: newSubscriber.subscribedAt,
        request: {
          type: 'POST',
          description: 'Add a new subscriber',
          url: `${process.env.API_URL}/api/${process.env.API_VERSION}/subscribers/${newSubscriber._id}`
        }
      }
    };

    return res.status(201).json(
      customResponse<typeof data>({
        success: true,
        error: false,
        message: 'Successfully added new subscriber',
        status: 201,
        data
      })
    );
  } catch (error) {
    return next(new createHttpError.InternalServerError('Internal server error.'));
  }
};
