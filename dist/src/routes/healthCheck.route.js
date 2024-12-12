"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("@src/utils");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    const uptime = process.uptime();
    const message = 'Welcome to Rest API - 👋🌎🌍🌏 - health check confirm';
    res.status(200).send((0, utils_1.customResponse)({
        data: {
            uptime: `${Math.floor(uptime)} seconds`,
            dbStatus: 'Connected'
        },
        success: true,
        error: false,
        message,
        status: 200
    }));
});
exports.default = router;
//# sourceMappingURL=healthCheck.route.js.map