/** @format */

// Import express framework from node_modules
const express = require("express");

// Create a new instance of express (initialize express)
const app = express();

// Requiring dotenv(Environment variables)
const dotenv = require("dotenv");
dotenv.config();

// Requiring http and url
const http = require("http");
const url = require("url");

// Import multer from node_modules
const multer = require("multer");

//Import the mongoose module
const mongoose = require("mongoose");

// Grab the Schema Object from mongoose
const { Schema } = mongoose;

// Access Environment variables
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const PORT = process.env.PORT;

// Connecting to MongoDB(Connecting to the Database)
const mongoDB = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.poqja.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(mongoDB, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// console.log("MongoDB database connection established successfully");

// Defining a Model
// and Creating a Database Schema
// Define schema
const UserModelSchema = new Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

// Compile model from schema
const User = mongoose.model("User", UserModelSchema);

// Set Storage Engine
// Configuring and validating the upload
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/uploads");
	},

	// By default, multer removes file extensions so let's add them back
	filename: (req, file, cb) => {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${getImageExtension(file.mimetype)}`,
		);
	},
});

// Check Image Extension
const getImageExtension = (mimetype) => {
	switch (mimetype) {
		case "image/png":
			return ".png";
		case "image/PNG":
			return ".PNG";
		case "image/jpg":
			return ".jpg";
		case "image/JPG":
			return ".JPG";
		case "image/JPEG":
			return ".JPEG";
		case "image/jpeg":
			return ".jpeg";
		case "image/webp":
			return ".webp";
	}
};

// initialize upload variable
const upload = multer({ storage: storage });

// import cors from node_modules (Using cors)
const cors = require("cors");

// determine which domain can access the website
app.use(cors());

// Requiring models
const post = require("./api/models/posts");

const postData = new post();

// parses incoming requests with JSON payloads
app.use(express.json());

// Public file
// serve all static files inside public directory.
app.use("/static", express.static("public"));

// API Endpoint (Home Route)
app.get("/", (req, res) => {
	res.status(200).send(
		"Hello, my friends Nice to Meet You welcome to My blog Post API",
	);
});

// API Endpoint for register
app.post("/api/posts/register", (req, res) => {
	const newUser = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});

	// save model to database , passing a callback
	newUser.save(function (err, User) {
		//if user already exist(already been register)
		if (err) {
			console.log("unable to save to database");
			console.log(err);
			res.send(400, {
				status: err,
			});
		} else {
			console.log("item saved to database");
			console.log(User);
			res.send({
				status: "registered",
			});
		}
	});
});

// API Endpoint for Login
app.post("/api/posts/login", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	// Finds one document. // using callback
	// Find one user whose `email` is 'given email', and `password` is 'given password' otherwise `null`
	User.findOne({ email: email, password: password }, (err, user) => {
		if (user) {
			{
				res.send({
					status: "Valid",
				});
			}
		} else {
			res.status(404).send({
				status: "Not Found",
			});
		}
	});
});

// API Endpoint to return all Posts (Posts Route)
app.get("/api/posts", (req, res) => {
	return res.status(200).send(postData.get());
});

// API Endpoint to return one post based on id (individual Posts Route)
app.get("/api/posts/:postId", (req, res) => {
	const postId = req.params.postId;
	const foundPost = postData.getIndividualBlog(postId);
	if (foundPost) {
		res.status(200).send({ foundPost });
	} else {
		res.status(404).send("Not Found");
	}
});

//  API Endpoint to add new Post  (Add Route)
//  upload Single file(image)
app.post("/api/posts", upload.single("post_image"), (req, res) => {
	const image = req.file;
	const postTitle = req.body.title;
	const postContent = req.body.content;

	if (!image) {
		return res.status(400).send("Please upload Image");
	} else if (!postTitle) {
		return res.status(400).send("Please add post title");
	} else if (!postContent) {
		return res.status(400).send("Please add post content");
	}

	const newPost = {
		id: `${Date.now()}`,
		title: postTitle,
		content: postContent,
		post_image: `uploads/${req.file.filename}`,
		added_date: `${Date.now()}`,
	};
	postData.addNewPost(newPost);
	return res.status(201).send(newPost);
});

// Server setup
// Tell our app to listen on port 3000
console.log(PORT);
app.listen(PORT, () =>
	console.log(`Hello World app is listening on port ${PORT} !`),
);
