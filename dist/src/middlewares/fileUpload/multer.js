"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customMulterConfig = exports.uploadImage = exports.fileStorage = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const http_errors_1 = __importDefault(require("http-errors"));
const utils_1 = require("@src/utils");
exports.fileStorage = multer_1.default.diskStorage({
    destination: (request, file, callback) => {
        const fileName = request.originalUrl.includes('products')
            ? 'products'
            : request.originalUrl.includes('posts') || request.originalUrl.includes('feed')
                ? 'posts'
                : 'users';
        callback(null, `public/uploads/${fileName}`);
    },
    filename: (req, file, callback) => {
        if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
            console.log(file);
        }
        const imageExtension = (0, utils_1.getImageExtension)(file.mimetype);
        if (!imageExtension) {
            callback((0, http_errors_1.default)(422, 'Invalid request (File type is not supported)'), false);
            return;
        }
        callback(null, `${file.fieldname}-${(0, uuid_1.v4)()}${imageExtension}`);
    }
});
exports.uploadImage = (0, multer_1.default)({
    storage: exports.fileStorage,
    limits: {
        fileSize: 1024 * 1024 * 10
    }
});
exports.customMulterConfig = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({}),
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: (request, file, callback) => {
        if (!(0, utils_1.getImageExtension)(file.mimetype)) {
            callback((0, http_errors_1.default)(422, 'Invalid request (File type is not supported)'), false);
            return;
        }
        callback(null, true);
    }
});
exports.default = { uploadImage: exports.uploadImage };
//# sourceMappingURL=multer.js.map