/** @format */

// Import express framework from node_modules
const express = require("express");

// Create a new instance of express (initialize express)
const app = express();

// Require dotenv(to manage secrets and configs)
// Using dotenv package to create environment variables
const dotenv = require("dotenv");
dotenv.config();

// Requiring http and url
const http = require("http");
const url = require("url");

// Create User model just by requiring the User
const User = require("./models/User");

// Import the mongoose module from node_modules
const mongoose = require("mongoose");

// Grab The Schema Object from mongoose
const { Schema } = mongoose;

// Access Environment variables
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const PORT = process.env.PORT || 5000;

// Connecting to MongoDB(Connecting to the Database)
const mongoDB = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.poqja.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(mongoDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// console.log("MongoDB database connection established successfully");

// Import cors from node_modules (Using cors)
const cors = require("cors");

// Determine which domain can access the website
app.use(cors());

// Parses incoming requests with JSON payloads
app.use(express.json());

// Import get post routes
const getPosts = require("./routes/getPosts");

// Import add post routes
const addPost = require("./routes/addPost");

// Import register routes
const register = require("./routes/register");

// Import login routes
const login = require("./routes/login");

// Public file
// Serve all static files inside public directory.
app.use("/static", express.static("public"));

//  Now we can use all the Routes
// (/api) is the base URL for getting post Routes
app.use("/api", getPosts);

// (/api/addPost) is the base URL for addPost Routes
app.use("/api/addPost", addPost);

// (/api/register) is the base URL for register Route
app.use("/api/register", register);

// (/api/login) is the base URL for register Route
app.use("/api/login", login);

// Server setup
// Tell our app to listen on port 3000
console.log(PORT);
app.listen(PORT, () =>
	console.log(`Hello World app is listening on port ${PORT} !`),
);
