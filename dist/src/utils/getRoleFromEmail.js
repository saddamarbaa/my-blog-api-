"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleFromEmail = void 0;
const configs_1 = require("@src/configs");
const constants_1 = require("@src/constants");
const getRoleFromEmail = (email) => {
    const { ADMIN_EMAILS, MANGER_EMAILS, MODERATOR_EMAILS, SUPERVISOR_EMAILS, GUIDE_EMAILS } = configs_1.environmentConfig;
    if (ADMIN_EMAILS && JSON.parse(ADMIN_EMAILS).includes(email))
        return constants_1.AUTHORIZATION_ROLES.ADMIN;
    if (MANGER_EMAILS && JSON.parse(MANGER_EMAILS).includes(email))
        return constants_1.AUTHORIZATION_ROLES.MANAGER;
    if (MODERATOR_EMAILS && JSON.parse(MODERATOR_EMAILS).includes(email))
        return constants_1.AUTHORIZATION_ROLES.MODERATOR;
    if (SUPERVISOR_EMAILS && JSON.parse(SUPERVISOR_EMAILS).includes(email))
        return constants_1.AUTHORIZATION_ROLES.SUPERVISOR;
    if (GUIDE_EMAILS && JSON.parse(GUIDE_EMAILS).includes(email))
        return constants_1.AUTHORIZATION_ROLES.GUIDE;
    return constants_1.AUTHORIZATION_ROLES.USER;
};
exports.getRoleFromEmail = getRoleFromEmail;
//# sourceMappingURL=getRoleFromEmail.js.map