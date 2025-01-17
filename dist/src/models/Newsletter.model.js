"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const constants_1 = require("@src/constants");
const NewsletterSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email address'
        ],
        unique: true,
        lowercase: true,
        index: true
    },
    verificationToken: {
        type: String,
        required: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    subscriptionType: {
        type: String,
        enum: [...constants_1.SUBSCRIPTION_TYPE_OPTIONS],
        default: 'daily'
    }
}, {
    timestamps: true
});
NewsletterSchema.methods.generateVerificationToken = function () {
    this.verificationToken = crypto_1.default.randomBytes(32).toString('hex');
};
NewsletterSchema.methods.verifyEmail = function (token) {
    if (this.verificationToken === token) {
        this.verified = true;
        this.verificationToken = '';
        return true;
    }
    return false;
};
const Newsletter = mongoose_1.default.models.Newsletter || mongoose_1.default.model('Newsletter', NewsletterSchema);
exports.default = Newsletter;
//# sourceMappingURL=Newsletter.model.js.map