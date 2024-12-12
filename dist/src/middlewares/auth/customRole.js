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
Object.defineProperty(exports, "__esModule", { value: true });
exports.customRoles = void 0;
const http_errors_1 = __importStar(require("http-errors"));
const customRoles = (authorizationEmails, role) => {
    return async (req, res, next) => {
        try {
            const user = req?.user;
            const parsedAuthorizationEmails = authorizationEmails && JSON.parse(authorizationEmails);
            const isAuth = user && user.role === role && parsedAuthorizationEmails?.includes(`${user?.email}`);
            if (!isAuth) {
                return next((0, http_errors_1.default)(403, `Auth Failed (Unauthorized)`));
            }
            next();
        }
        catch (error) {
            next(http_errors_1.InternalServerError);
        }
    };
};
exports.customRoles = customRoles;
//# sourceMappingURL=customRole.js.map