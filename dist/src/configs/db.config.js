"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set('strictQuery', true);
const connectDB = (MONGODB_URI) => {
    mongoose_1.default.connection.on('connected', () => {
        if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
            console.log('MongoDB database connection established successfully');
        }
    });
    mongoose_1.default.connection.on('reconnected', () => {
        if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
            console.log('Mongo Connection Reestablished');
        }
    });
    mongoose_1.default.connection.on('error', (error) => {
        if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
            console.log('MongoDB connection error. Please make sure MongoDB is running: ');
            console.log(`Mongo Connection ERROR: ${error}`);
        }
    });
    mongoose_1.default.connection.on('close', () => {
        if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
            console.log('Mongo Connection Closed...');
        }
    });
    mongoose_1.default.connection.on('disconnected', () => {
        if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
            console.log('MongoDB database connection is disconnected...');
            console.log('Trying to reconnect to Mongo ...');
        }
        setTimeout(() => {
            mongoose_1.default.connect(MONGODB_URI, {
                socketTimeoutMS: 3000,
                connectTimeoutMS: 3000
            });
        }, 3000);
    });
    process.on('SIGINT', async () => {
        try {
            await mongoose_1.default.connection.close();
            if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
                console.log('MongoDB database connection is disconnected due to app termination...');
            }
            process.exit(0);
        }
        catch (error) {
            console.error('Error closing the MongoDB connection:', error);
            process.exit(1);
        }
    });
    return mongoose_1.default.connect(MONGODB_URI);
};
exports.connectDB = connectDB;
exports.default = exports.connectDB;
//# sourceMappingURL=db.config.js.map