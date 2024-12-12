"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPaginationMiddleware = void 0;
const Post_model_1 = __importDefault(require("@src/models/Post.model"));
const postPaginationMiddleware = () => {
    return async (req, res, next) => {
        try {
            const queryObject = { ...req.query };
            const excludedFiled = ['sort', 'limit', 'page', 'field'];
            excludedFiled.forEach((ele) => delete queryObject[ele]);
            let queryString = JSON.stringify(queryObject);
            const reg = /\bgte|gt|lte|lt\b/g;
            queryString = queryString.replace(reg, (matchString) => `$${matchString}`);
            let searchQuery;
            if (req.query.search) {
                const searchText = req.query.search.toLowerCase();
                searchQuery = {
                    $or: [
                        { title: { $regex: searchText } },
                        { content: { $regex: searchText } },
                        { category: { $regex: searchText } }
                    ]
                };
            }
            let query = Post_model_1.default.find(req.query.search ? searchQuery : JSON.parse(queryString));
            const page = Number(req.query.page) || 1;
            let limit = Number(req.query.limit) || 20;
            if (limit > 100) {
                limit = 100;
            }
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const results = {
                currentPage: {
                    page,
                    limit
                },
                totalDocs: 0
            };
            const totalCount = await Post_model_1.default.countDocuments().exec();
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
            if (req.query.page && Number(req.query.page) > Math.ceil(totalCount / limit)) {
            }
            query = query.limit(limit).skip(startIndex);
            if (req.query.sort) {
                const sortBy = req.query.sort.split(',').join(' ');
                query = query.sort(sortBy);
            }
            else {
                query = query.sort('-createdAt');
            }
            if (req.query.fields) {
                const fields = req.query.fields.split(',').join(' ');
                query = query.select(fields);
            }
            else {
                query = query.select('-_v');
            }
            results.results = await query
                .populate('author', 'firstName  lastName  profileUrl bio')
                .populate('likes.user', 'firstName  lastName  profileUrl bio')
                .populate('disLikes', 'firstName  lastName  profileUrl bio')
                .populate('comments.user', 'firstName  lastName  profileUrl bio')
                .populate('views', 'firstName  lastName  profileUrl bio')
                .populate('shares', 'firstName  lastName  profileUrl bio')
                .exec();
            res.paginatedResults = results;
            next();
        }
        catch (error) {
            return next(error);
        }
    };
};
exports.postPaginationMiddleware = postPaginationMiddleware;
//# sourceMappingURL=postsFeatures.middleware.js.map