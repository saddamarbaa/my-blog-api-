"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whoViewedMyProfileController = exports.getUserController = exports.getUsersController = exports.unBlockUserController = exports.blockUserController = exports.unFollowUserController = exports.followUserController = void 0;
const services_1 = require("@src/services");
const followUserController = (req, res, next) => (0, services_1.followUserService)(req, res, next);
exports.followUserController = followUserController;
const unFollowUserController = (req, res, next) => (0, services_1.unFollowUserService)(req, res, next);
exports.unFollowUserController = unFollowUserController;
const blockUserController = (req, res, next) => (0, services_1.blockUserService)(req, res, next);
exports.blockUserController = blockUserController;
const unBlockUserController = (req, res, next) => (0, services_1.unBlockUserService)(req, res, next);
exports.unBlockUserController = unBlockUserController;
const getUsersController = (req, res, next) => (0, services_1.getUsersService)(req, res, next);
exports.getUsersController = getUsersController;
const getUserController = (req, res, next) => (0, services_1.getUserService)(req, res, next);
exports.getUserController = getUserController;
const whoViewedMyProfileController = (req, res, next) => (0, services_1.whoViewedMyProfileService)(req, res, next);
exports.whoViewedMyProfileController = whoViewedMyProfileController;
//# sourceMappingURL=user.controller.js.map