"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const configs_1 = require("@src/configs");
const User_model_1 = __importDefault(require("@src/models/User.model"));
const Post_model_1 = __importDefault(require("@src/models/Post.model"));
const startDBConnection = async () => {
    try {
        const env = process.env.NODE_ENV;
        await (0, configs_1.connectDB)(env === 'testing'
            ? configs_1.environmentConfig.TEST_ENV_MONGODB_CONNECTION_STRING
            : configs_1.environmentConfig.MONGODB_CONNECTION_STRING);
        console.log('MongoDB connected...');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
const seedUsers = async () => {
    const users = [];
    const numberOfUsers = 50;
    for (let i = 0; i < numberOfUsers; i++) {
        const user = {
            firstName: `FirstName${i + 1}`,
            lastName: `LastName${i + 1}`,
            email: `user${i + 1}@example.com`,
            password: await bcrypt_1.default.hash('password123', 12),
            confirmPassword: await bcrypt_1.default.hash('password123', 12),
            gender: i % 2 === 0 ? 'male' : 'female',
            bio: `This is user number ${i + 1}. A brief bio.`,
            skills: ['JavaScript', 'Node.js', 'MongoDB']
        };
        users.push(user);
        if ((i + 1) % 10 === 0) {
            console.log(`Seeding user ${i + 1}...`);
        }
    }
    console.log('Seeding users...');
    await User_model_1.default.deleteMany();
    await User_model_1.default.insertMany(users);
    console.log('Users seeded successfully');
};
const seedConnectionRequests = async () => {
    const users = await User_model_1.default.find();
    if (users.length < 2) {
        console.log('Not enough users to seed connection requests');
        return;
    }
    console.log('Users found for seeding connection requests:', users);
    const connections = [
        {
            fromUserId: users[0]._id,
            toUserId: users[1]._id,
            status: 'interested'
        },
        {
            fromUserId: users[1]._id,
            toUserId: users[2]._id,
            status: 'accepted'
        },
        {
            fromUserId: users[2]._id,
            toUserId: users[0]._id,
            status: 'interested'
        }
    ];
    try {
        await Post_model_1.default.deleteMany();
        await Post_model_1.default.insertMany(connections);
        console.log('Connection requests seeded successfully');
    }
    catch (err) {
        console.error('Error seeding connection requests:', err);
    }
};
const seedDatabase = async () => {
    await startDBConnection();
    await seedUsers();
    await seedConnectionRequests();
    mongoose_1.default.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
};
seedDatabase();
//# sourceMappingURL=seed.js.map