"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resend = void 0;
const resend_1 = require("resend");
const custom_environment_variables_config_1 = require("./custom-environment-variables.config");
exports.resend = new resend_1.Resend(custom_environment_variables_config_1.environmentConfig?.RESEND_EMAIL_API_KEY);
exports.default = exports.resend;
//# sourceMappingURL=resendEmail.config.js.map