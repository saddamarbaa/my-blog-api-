import { NextFunction, Response } from 'express';
import createHttpError, { InternalServerError } from 'http-errors';

import { AuthenticatedRequestBody, IUser } from '@src/interfaces';
import { customResponse } from '@src/utils';
import User from '@src/models/User.model';

export const followUserService = async (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) => {
  try {
    if (req.user?._id.equals(req.params.userId)) {
      return next(createHttpError(403, `You cannot follow yourself`));
    }

    const toBeFollowedUser = await User.findById(req.params.userId).populate('followers');

    if (!toBeFollowedUser) {
      return next(createHttpError(400, `User not found`));
    }

    const currentUser = await User.findById(req.user?._id).populate('following');

    const isAlreadyFollowed = toBeFollowedUser.followers.some(function (user) {
      if (user._id.toString() === currentUser?._id.toString()) return true;
      return false;
    });

    if (!isAlreadyFollowed) {
      await toBeFollowedUser.updateOne({
        $push: {
          followers: currentUser?._id
        },
        new: true
      });

      await currentUser?.updateOne({
        $push: {
          following: req.params.userId
        }
      });

      const updatedUser = await User?.findById(req.user?._id)
        .select('-password -confirmPassword  -status -isDeleted -acceptTerms -isVerified')
        .populate('following', 'firstName  lastName  profileUrl bio')
        .populate('followers', 'firstName  lastName  profileUrl bio')
        .exec();

      return res.status(200).send(
        customResponse<{ user: IUser }>({
          success: true,
          error: false,
          message: `User has been followed successfully`,
          status: 200,
          data: { user: updatedUser! }
        })
      );
    }

    return next(createHttpError(403, `You already followed this user`));
  } catch (error) {
    return next(InternalServerError);
  }
};

export const unFollowUserService = async (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) => {
  try {
    if (req.user?._id.equals(req.params.userId)) {
      return next(createHttpError(403, `You cant un follow yourself`));
    }

    const toBeFollowedUser = await User.findById(req.params.userId);
    if (!toBeFollowedUser) {
      return next(createHttpError(400, `User not found`));
    }

    const currentUser = await User.findById(req.user?._id).populate('following');
    if (!currentUser) {
      return next(createHttpError(400, `Current user not found`));
    }

    const isAlreadyFollowed = toBeFollowedUser.followers.some(function (follower) {
      return follower._id.toString() === currentUser._id.toString();
    });

    if (isAlreadyFollowed) {
      // Update both users: remove followers and following relationship
      await toBeFollowedUser.updateOne({ $pull: { followers: currentUser._id } }, { new: true });
      await currentUser.updateOne({ $pull: { following: req.params.userId } });

      // Fetch the updated user info and populate necessary fields
      const updatedUser = await User.findById(req.user?._id)
        .select('-password -confirmPassword  -status -isDeleted -acceptTerms -isVerified')
        .populate('following', 'firstName  lastName  profileUrl bio')
        .populate('followers', 'firstName  lastName  profileUrl bio')
        .exec();

      // Check if updatedUser is null
      if (!updatedUser) {
        return next(createHttpError(400, `Updated user not found`));
      }

      return res.status(200).send(
        customResponse<{ user: IUser }>({
          success: true,
          error: false,
          message: `User has been unfollowed successfully`,
          status: 200,
          data: { user: updatedUser }
        })
      );
    }

    // If the current user is not following the user to be unfollowed
    return next(createHttpError(403, `You haven't followed this user before`));
  } catch (error) {
    return next(InternalServerError);
  }
};
