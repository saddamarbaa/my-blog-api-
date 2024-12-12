"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    res?.status(statusCode).send({
        data: null,
        success: false,
        error: true,
        message: error.message || 'Internal Server Error',
        status: statusCode,
        stack: process.env.NODE_ENV === 'production' ? '' : error.stack
    });
};
exports.errorHandler = errorHandler;
exports.default = exports.errorHandler;
//# sourceMappingURL=errorHandler.middleware.js.map