"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersPaginationMiddleware = void 0;
const User_model_1 = __importDefault(require("@src/models/User.model"));
const constants_1 = require("@src/constants");
const usersPaginationMiddleware = () => {
    return async (req, res, next) => {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {
            currentPage: {
                page,
                limit
            },
            totalDocs: 0
        };
        const totalCount = await User_model_1.default.countDocuments().exec();
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
        const sort = {};
        if (req.query.sortBy && req.query.orderBy) {
            sort[req.query.sortBy] = req.query.orderBy.toLowerCase() === 'desc' ? -1 : 1;
        }
        else {
            sort.createdAt = -1;
        }
        let filter = {};
        if (req.query.filterBy && req.query.role) {
            console.log(req.query);
            if (req.query.role.toLowerCase() === constants_1.AUTHORIZATION_ROLES.ADMIN) {
                filter.$or = [{ role: constants_1.AUTHORIZATION_ROLES.ADMIN }];
            }
            else if (req.query.role.toLowerCase() === constants_1.AUTHORIZATION_ROLES.USER) {
                filter.$or = [{ role: constants_1.AUTHORIZATION_ROLES.USER }];
            }
            else if (req.query.role.toLowerCase() === constants_1.AUTHORIZATION_ROLES.MANAGER) {
                filter.$or = [{ role: constants_1.AUTHORIZATION_ROLES.MANAGER }];
            }
            else if (req.query.role.toLowerCase() === constants_1.AUTHORIZATION_ROLES.SUPERVISOR) {
                filter.$or = [{ role: constants_1.AUTHORIZATION_ROLES.SUPERVISOR }];
            }
            else if (req.query.role.toLowerCase() === constants_1.AUTHORIZATION_ROLES.CLIENT) {
                filter.$or = [{ role: constants_1.AUTHORIZATION_ROLES.CLIENT }];
            }
            else if (req.query.role.toLowerCase() === constants_1.AUTHORIZATION_ROLES.GUIDE) {
                filter.$or = [{ role: constants_1.AUTHORIZATION_ROLES.GUIDE }];
            }
            else if (req.query.role.toLowerCase() === constants_1.AUTHORIZATION_ROLES.MODERATOR) {
                filter.$or = [{ role: constants_1.AUTHORIZATION_ROLES.MODERATOR }];
            }
            else if (req.query.role.toLowerCase() === 'all') {
                filter = {};
            }
            else {
                filter = {};
            }
        }
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
            results.results = await User_model_1.default
                .find(filter)
                .select('-password -confirmPassword  -status -isDeleted -acceptTerms -isVerified')
                .populate('following', 'firstName  lastName  profileUrl bio')
                .populate('followers', 'firstName  lastName  profileUrl bio')
                .populate('blocked', 'firstName  lastName  profileUrl bio')
                .limit(limit)
                .sort(sort)
                .skip(startIndex)
                .exec();
            res.paginatedResults = results;
            next();
        }
        catch (error) {
            return next(error);
        }
    };
};
exports.usersPaginationMiddleware = usersPaginationMiddleware;
exports.default = exports.usersPaginationMiddleware;
//# sourceMappingURL=usersFeatures.middleware.js.map