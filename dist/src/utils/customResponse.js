"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customResponse = void 0;
const customResponse = ({ data = null, success = false, error = true, message = 'Internal Server Error', status = 500 }) => {
    return {
        data,
        success,
        error,
        message,
        status,
        stack: process.env.NODE_ENV === 'production' ? undefined : new Error().stack
    };
};
exports.customResponse = customResponse;
exports.default = exports.customResponse;
//# sourceMappingURL=customResponse.js.map