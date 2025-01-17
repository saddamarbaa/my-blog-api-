"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.whoViewedMyProfileService = exports.unBlockUserService = exports.blockUserService = exports.unFollowUserService = exports.followUserService = exports.getUserService = exports.getUsersService = void 0;
const http_errors_1 = __importStar(require("http-errors"));
const utils_1 = require("@src/utils");
const User_model_1 = __importDefault(require("@src/models/User.model"));
const getUsersService = async (req, res, next) => {
    try {
        const users = await User_model_1.default.find({})
            .select('-password -confirmPassword  -status -isDeleted -acceptTerms -isVerified -isDeleted')
            .populate('followers', 'firstName lastName profileUrl bio')
            .populate('following', 'firstName lastName profileUrl bio')
            .populate('blocked', 'firstName lastName profileUrl bio')
            .exec();
        return res.status(200).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: `Users retrieved successfully`,
            status: 200,
            data: { users }
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.getUsersService = getUsersService;
const getUserService = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User_model_1.default.findOne({
            id: userId
        })
            .select('-password -confirmPassword -status -isDeleted -acceptTerms -isVerified')
            .populate('followers', 'firstName lastName profileUrl bio')
            .populate('following', 'firstName lastName profileUrl bio')
            .populate('blocked', 'firstName lastName profileUrl bio')
            .exec();
        if (!user) {
            return next((0, http_errors_1.default)(400, `User not found`));
        }
        return res.status(200).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: 'User retrieved successfully',
            status: 200,
            data: { user }
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.getUserService = getUserService;
const followUserService = async (req, res, next) => {
    try {
        if (req.user?._id.equals(req.params.userId)) {
            return next((0, http_errors_1.default)(403, `You cannot follow yourself`));
        }
        const toBeFollowedUser = await User_model_1.default.findById(req.params.userId).populate('followers');
        if (!toBeFollowedUser) {
            return next((0, http_errors_1.default)(400, `User not found`));
        }
        const currentUser = await User_model_1.default.findById(req.user?._id).populate('following');
        const isAlreadyFollowed = toBeFollowedUser.followers.some(function (user) {
            if (user._id.toString() === currentUser?._id.toString())
                return true;
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
            const updatedUser = await User_model_1.default?.findById(req.user?._id)
                .select('-password -confirmPassword  -status -isDeleted -acceptTerms -isVerified')
                .populate('following', 'firstName  lastName  profileUrl bio')
                .populate('followers', 'firstName  lastName  profileUrl bio')
                .exec();
            return res.status(200).send((0, utils_1.customResponse)({
                success: true,
                error: false,
                message: `User has been followed successfully`,
                status: 200,
                data: { user: updatedUser }
            }));
        }
        return next((0, http_errors_1.default)(403, `You already followed this user`));
    }
    catch (error) {
        console.log(error);
        return next(http_errors_1.InternalServerError);
    }
};
exports.followUserService = followUserService;
const unFollowUserService = async (req, res, next) => {
    try {
        if (req.user?._id.equals(req.params.userId)) {
            return next((0, http_errors_1.default)(403, `You cant un follow yourself`));
        }
        const toBeFollowedUser = await User_model_1.default.findById(req.params.userId);
        if (!toBeFollowedUser) {
            return next((0, http_errors_1.default)(400, `User not found`));
        }
        const currentUser = await User_model_1.default.findById(req.user?._id).populate('following');
        if (!currentUser) {
            return next((0, http_errors_1.default)(400, `Current user not found`));
        }
        const isAlreadyFollowed = toBeFollowedUser.followers.some(function (follower) {
            return follower._id.toString() === currentUser._id.toString();
        });
        if (isAlreadyFollowed) {
            await toBeFollowedUser.updateOne({ $pull: { followers: currentUser._id } }, { new: true });
            await currentUser.updateOne({ $pull: { following: req.params.userId } });
            const updatedUser = await User_model_1.default.findById(req.user?._id)
                .select('-password -confirmPassword  -status -isDeleted -acceptTerms -isVerified')
                .populate('following', 'firstName  lastName  profileUrl bio')
                .populate('followers', 'firstName  lastName  profileUrl bio')
                .exec();
            if (!updatedUser) {
                return next((0, http_errors_1.default)(400, `Updated user not found`));
            }
            return res.status(200).send((0, utils_1.customResponse)({
                success: true,
                error: false,
                message: `User has been unfollowed successfully`,
                status: 200,
                data: { user: updatedUser }
            }));
        }
        return next((0, http_errors_1.default)(403, `You haven't followed this user before`));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.unFollowUserService = unFollowUserService;
const blockUserService = async (req, res, next) => {
    try {
        if (req.user?._id.equals(req.params.userId)) {
            return next((0, http_errors_1.default)(403, `You cannot block yourself`));
        }
        const toBeBlockedUser = await User_model_1.default.findById(req.params.userId);
        if (!toBeBlockedUser) {
            return next((0, http_errors_1.default)(400, `User not found`));
        }
        const currentUser = await User_model_1.default.findById(req.user?._id)
            .populate('following', 'firstName  lastName  profileUrl bio')
            .populate('followers', 'firstName  lastName  profileUrl bio')
            .populate('blocked', 'firstName  lastName  profileUrl bio')
            .exec();
        if (!currentUser) {
            return next((0, http_errors_1.default)(400, `Current user not found`));
        }
        const isAlreadyBlocked = currentUser.blocked.some(function (user) {
            if (user._id.toString() === toBeBlockedUser._id.toString())
                return true;
            return false;
        });
        if (isAlreadyBlocked) {
            return next((0, http_errors_1.default)(403, `You already blocked this user`));
        }
        await currentUser.updateOne({
            $push: {
                blocked: req.params.userId
            }
        });
        await currentUser.updateOne({
            $pull: { following: req.params.userId, followers: req.params.userId }
        });
        await toBeBlockedUser.updateOne({
            $pull: { following: req.user?._id, followers: req.user?._id }
        });
        return res.status(200).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: `User has been blocked successfully`,
            status: 200,
            data: { user: currentUser }
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.blockUserService = blockUserService;
const unBlockUserService = async (req, res, next) => {
    try {
        if (req.user?._id.equals(req.params.userId)) {
            return next((0, http_errors_1.default)(403, `You cannot unblock yourself`));
        }
        const toBeUnblockedUser = await User_model_1.default.findById(req.params.userId);
        if (!toBeUnblockedUser) {
            return next((0, http_errors_1.default)(400, `User not found`));
        }
        const currentUser = await User_model_1.default.findById(req.user?._id)
            .populate('following', 'firstName  lastName  profileUrl bio')
            .populate('followers', 'firstName  lastName  profileUrl bio')
            .populate('blocked', 'firstName  lastName  profileUrl bio')
            .exec();
        if (!currentUser) {
            return next((0, http_errors_1.default)(400, `Current user not found`));
        }
        const isBlocked = currentUser.blocked.some(function (blockedUser) {
            return blockedUser._id.toString() === toBeUnblockedUser._id.toString();
        });
        if (isBlocked) {
            await currentUser.updateOne({
                $pull: {
                    blocked: req.params.userId
                }
            });
            const updatedBlockedList = currentUser.blocked.filter((blockedUser) => blockedUser._id.toString() !== req.params.userId);
            const updatedUserResponse = {
                ...currentUser.toObject(),
                blocked: updatedBlockedList
            };
            return res.status(200).send((0, utils_1.customResponse)({
                success: true,
                error: false,
                message: `User has been unblocked successfully`,
                status: 200,
                data: { user: updatedUserResponse }
            }));
        }
        return next((0, http_errors_1.default)(403, `You have not blocked this user`));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.unBlockUserService = unBlockUserService;
const whoViewedMyProfileService = async (req, res, next) => {
    try {
        if (req.user?._id.equals(req.params.userId)) {
            return next((0, http_errors_1.default)(403, `You cannot view your own profile`));
        }
        const toBeViewedUser = await User_model_1.default.findById(req.params.userId);
        if (!toBeViewedUser) {
            return next((0, http_errors_1.default)(404, 'User not found'));
        }
        const userWhoViewed = req.user;
        const isUserAlreadyViewed = toBeViewedUser.viewers.some((viewer) => viewer.toString() === userWhoViewed?._id.toString());
        if (isUserAlreadyViewed) {
            return next((0, http_errors_1.default)(400, 'You have already viewed this profile'));
        }
        toBeViewedUser.viewers.push(userWhoViewed._id);
        await toBeViewedUser.save();
        return res.status(200).send((0, utils_1.customResponse)({
            success: true,
            error: false,
            message: 'Profile view recorded successfully',
            status: 200,
            data: null
        }));
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
};
exports.whoViewedMyProfileService = whoViewedMyProfileService;
//# sourceMappingURL=user.service.js.map