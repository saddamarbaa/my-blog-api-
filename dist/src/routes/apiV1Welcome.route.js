"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const utils_1 = require("@src/utils");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    const message = 'Welcome to the API - 👋🌎🌍🌏 - Use /api/v1 for the latest version';
    res.send((0, utils_1.customResponse)({ data: null, success: true, error: false, message, status: 200 }));
});
module.exports = router;
//# sourceMappingURL=apiV1Welcome.route.js.map