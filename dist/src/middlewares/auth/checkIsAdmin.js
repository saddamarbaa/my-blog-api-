"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const constants_1 = require("@src/constants");
const configs_1 = require("@src/configs");
const isAdmin = async (req, res, next) => {
    const user = req?.user;
    const adminEmails = configs_1.environmentConfig?.ADMIN_EMAILS && JSON.parse(configs_1.environmentConfig.ADMIN_EMAILS);
    const adminUser = user && user.role === constants_1.AUTHORIZATION_ROLES.ADMIN && adminEmails?.includes(`${user?.email}`);
    if (!adminUser) {
        return next((0, http_errors_1.default)(403, `Auth Failed (Unauthorized)`));
    }
    next();
};
exports.isAdmin = isAdmin;
exports.default = { isAdmin: exports.isAdmin };
//# sourceMappingURL=checkIsAdmin.js.map