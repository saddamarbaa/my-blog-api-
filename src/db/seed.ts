/* eslint-disable no-await-in-loop */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import { connectDB, environmentConfig } from '@src/configs';
import User from '@src/models/User.model';
import Post from '@src/models/Post.model';

// MongoDB connection
const startDBConnection = async () => {
  try {
    const env = process.env.NODE_ENV;
    await connectDB(
      env === 'testing'
        ? environmentConfig.TEST_ENV_MONGODB_CONNECTION_STRING
        : environmentConfig.MONGODB_CONNECTION_STRING
    );
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Seed user data
const seedUsers = async () => {
  const users = [];
  const numberOfUsers = 50; // Number of users to seed

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numberOfUsers; i++) {
    const user = {
      firstName: `FirstName${i + 1}`,
      lastName: `LastName${i + 1}`,
      email: `user${i + 1}@example.com`,
      password: await bcrypt.hash('password123', 12), // Hash the password
      confirmPassword: await bcrypt.hash('password123', 12),
      gender: i % 2 === 0 ? 'male' : 'female', // Alternating genders for variety
      bio: `This is user number ${i + 1}. A brief bio.`,
      skills: ['JavaScript', 'Node.js', 'MongoDB'] // Example skills
    };
    users.push(user);

    // Log progress after every 10th user to avoid clutter
    if ((i + 1) % 10 === 0) {
      console.log(`Seeding user ${i + 1}...`);
    }
  }

  console.log('Seeding users...');
  await User.deleteMany(); // Clear existing data
  await User.insertMany(users); // Insert all users at once
  console.log('Users seeded successfully');
};

// Seed connection requests
const seedConnectionRequests = async () => {
  const users = await User.find();

  if (users.length < 2) {
    console.log('Not enough users to seed connection requests');
    return;
  }

  console.log('Users found for seeding connection requests:', users);

  const connections = [
    {
      fromUserId: users[0]._id, // Ensure these are valid ObjectIds
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
    await Post.deleteMany(); // Clear existing connection requests
    await Post.insertMany(connections); // Insert the new ones
    console.log('Connection requests seeded successfully');
  } catch (err) {
    console.error('Error seeding connection requests:', err);
  }
};

// Run the seed script
const seedDatabase = async () => {
  await startDBConnection();
  await seedUsers();
  await seedConnectionRequests();
  mongoose.connection.close();
  console.log('Database connection closed.');
  process.exit(0);
};

seedDatabase();
