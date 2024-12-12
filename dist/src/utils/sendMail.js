"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const configs_1 = require("@src/configs");
const getFromEmail = () => configs_1.environmentConfig.NODE_ENV === 'development' ? 'onboarding@resend.dev' : configs_1.environmentConfig.EMAIL_SENDER;
const getToEmail = (to) => (configs_1.environmentConfig.NODE_ENV === 'development' ? 'delivered@resend.dev' : to);
const sendMail = async ({ to, subject, text, html }) => configs_1.resend.emails.send({
    from: getFromEmail(),
    to: getToEmail(to),
    subject,
    text,
    html
});
exports.sendMail = sendMail;
//# sourceMappingURL=sendMail.js.map