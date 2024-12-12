"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiV1Welcome_route_1 = __importDefault(require("@src/routes/apiV1Welcome.route"));
const healthCheck_route_1 = __importDefault(require("@src/routes/healthCheck.route"));
const auth_route_1 = __importDefault(require("@src/routes/auth.route"));
const user_route_1 = __importDefault(require("@src/routes/user.route"));
const post_route_1 = __importDefault(require("@src/routes/post.route"));
const admin_route_1 = __importDefault(require("@src/routes/admin.route"));
const router = express_1.default.Router();
router.use('/', apiV1Welcome_route_1.default);
router.use('/healthChecker', healthCheck_route_1.default);
router.use('/auth', auth_route_1.default);
router.use('/user', user_route_1.default);
router.use('/posts', post_route_1.default);
router.use('/admin', admin_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map