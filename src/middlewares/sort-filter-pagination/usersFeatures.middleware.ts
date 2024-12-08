import { NextFunction } from 'express';

import userModel from '@src/models/User.model';
import { TPaginationRequest, TPaginationResponse } from '@src/interfaces';
import { AUTHORIZATION_ROLES } from '@src/constants';

export const usersPaginationMiddleware = () => {
  return async (req: TPaginationRequest, res: TPaginationResponse, next: NextFunction) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results: any = {
      currentPage: {
        page,
        limit
      },
      totalDocs: 0
    };

    const totalCount = await userModel.countDocuments().exec();
    results.totalDocs = totalCount;

    if (endIndex < totalCount) {
      results.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit
      };
    }

    results.totalPages = Math.ceil(totalCount / limit);
    results.lastPage = Math.ceil(totalCount / limit);

    // Sort
    const sort: any = {};
    if (req.query.sortBy && req.query.orderBy) {
      sort[req.query.sortBy] = req.query.orderBy.toLowerCase() === 'desc' ? -1 : 1;
    } else {
      sort.createdAt = -1;
    }

    // Filter
    let filter: any = {};

    if (req.query.filterBy && req.query.role) {
      console.log(req.query);
      if (req.query.role.toLowerCase() === AUTHORIZATION_ROLES.ADMIN) {
        filter.$or = [{ role: AUTHORIZATION_ROLES.ADMIN }];
      } else if (req.query.role.toLowerCase() === AUTHORIZATION_ROLES.USER) {
        filter.$or = [{ role: AUTHORIZATION_ROLES.USER }];
      } else if (req.query.role.toLowerCase() === AUTHORIZATION_ROLES.MANAGER) {
        filter.$or = [{ role: AUTHORIZATION_ROLES.MANAGER }];
      } else if (req.query.role.toLowerCase() === AUTHORIZATION_ROLES.SUPERVISOR) {
        filter.$or = [{ role: AUTHORIZATION_ROLES.SUPERVISOR }];
      } else if (req.query.role.toLowerCase() === AUTHORIZATION_ROLES.CLIENT) {
        filter.$or = [{ role: AUTHORIZATION_ROLES.CLIENT }];
      } else if (req.query.role.toLowerCase() === AUTHORIZATION_ROLES.GUIDE) {
        filter.$or = [{ role: AUTHORIZATION_ROLES.GUIDE }];
      } else if (req.query.role.toLowerCase() === AUTHORIZATION_ROLES.MODERATOR) {
        filter.$or = [{ role: AUTHORIZATION_ROLES.MODERATOR }];
      } else if (req.query.role.toLowerCase() === 'all') {
        filter = {};
      } else {
        filter = {};
      }
    }

    // Search
    if (req.query.search) {
      filter = {
        $or: [
          { name: { $regex: req.query.search } },
          { nationality: { $regex: req.query.search } },
          { email: { $regex: req.query.search } },
          { gender: { $regex: req.query.search } },
          { role: { $regex: req.query.search } },
          { dateOfBirth: { $regex: req.query.search } }
        ]
      };
    }

    try {
      results.results = await userModel
        .find(filter)
        .select('-password -confirmPassword  -status -isDeleted -acceptTerms -isVerified')
        .populate('following', 'firstName  lastName  profileUrl bio')
        .populate('followers', 'firstName  lastName  profileUrl bio')
        .populate('blocked', 'firstName  lastName  profileUrl bio')
        .limit(limit)
        .sort(sort)
        .skip(startIndex)
        .exec();

      // Add paginated Results to the request
      res.paginatedResults = results;
      next();
    } catch (error) {
      return next(error);
    }
  };
};

export default usersPaginationMiddleware;
