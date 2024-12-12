"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentValidation = exports.updateCommentValidation = exports.addCommentValidation = exports.commentIdValidation = exports.postIdValidation = exports.updatePostValidation = exports.addPostValidation = void 0;
const validator_1 = __importDefault(require("../validator"));
const postSchema_1 = require("./postSchema");
const addPostValidation = (req, res, next) => {
    return (0, validator_1.default)(postSchema_1.postSchema.addPost, {
        ...req.file,
        ...req.body
    }, next);
};
exports.addPostValidation = addPostValidation;
const updatePostValidation = (req, res, next) => (0, validator_1.default)(postSchema_1.postSchema.updatePost, { ...req.file, ...req.body, ...req.params }, next);
exports.updatePostValidation = updatePostValidation;
const postIdValidation = (req, res, next) => {
    return (0, validator_1.default)(postSchema_1.postSchema.validatedPostId, { ...req.file, ...req.body, ...req.params }, next);
};
exports.postIdValidation = postIdValidation;
const commentIdValidation = (req, res, next) => {
    return (0, validator_1.default)(postSchema_1.postSchema.validatedCommentId, { ...req.file, ...req.body, ...req.params }, next);
};
exports.commentIdValidation = commentIdValidation;
const addCommentValidation = (req, res, next) => (0, validator_1.default)(postSchema_1.postSchema.addComment, { ...req.file, ...req.body, ...req.params }, next);
exports.addCommentValidation = addCommentValidation;
const updateCommentValidation = (req, res, next) => {
    return (0, validator_1.default)(postSchema_1.postSchema.updateComment, { ...req.file, ...req.body, ...req.params }, next);
};
exports.updateCommentValidation = updateCommentValidation;
const deleteCommentValidation = (req, res, next) => {
    return (0, validator_1.default)(postSchema_1.postSchema.deleteComment, { ...req.file, ...req.body, ...req.params }, next);
};
exports.deleteCommentValidation = deleteCommentValidation;
//# sourceMappingURL=postValidation.js.map