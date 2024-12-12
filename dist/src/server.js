"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const app_1 = __importDefault(require("@src/app"));
const db_config_1 = require("./configs/db.config");
const configs_1 = require("./configs");
const env = process.env.NODE_ENV;
const startServer = async () => {
    try {
        const conn = await (0, db_config_1.connectDB)(env === 'testing'
            ? configs_1.environmentConfig.TEST_ENV_MONGODB_CONNECTION_STRING
            : configs_1.environmentConfig.MONGODB_CONNECTION_STRING);
        console.log(`MongoDB database connection established successfully to... ${conn?.connection?.host}`.cyan.underline);
        app_1.default?.listen(configs_1.environmentConfig.PORT, () => {
            console.log(`Server is listening on port: http://localhost:${configs_1.environmentConfig.PORT} ....`.inverse);
        });
    }
    catch (error) {
        console.log('MongoDB connection error. Please make sure MongoDB is running: ');
    }
};
exports.startServer = startServer;
(0, exports.startServer)();
exports.default = app_1.default;
//# sourceMappingURL=server.js.map