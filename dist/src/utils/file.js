"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
const fs_1 = __importDefault(require("fs"));
const deleteFile = (filePath) => {
    fs_1.default.stat(filePath, function (err, stats) {
        if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
            console.log(stats);
        }
        if (err && process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
            console.log('fail to find file path', err);
        }
        else {
            fs_1.default.unlink(filePath, function (error) {
                if (error && process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
                    console.log('fail to delete the file', error);
                }
                if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
                    console.log('successfully deleted file ');
                }
            });
        }
    });
};
exports.deleteFile = deleteFile;
//# sourceMappingURL=file.js.map