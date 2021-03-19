/** @format */
// vew this latter
// https://stackabuse.com/handling-file-uploads-in-node-js-with-expres-and-multer/
// https://lo-victoria.com/build-rest-api-with-nodejs-upload-files-mongodb
// https://www.npmjs.com/package/multer

// import express framework from node_modules
const express = require("express");

// Requiring http and url
const http = require("http");
const url = require("url");

// Create a new instance of express (initializ express)
const app = express();

// import multer from node_modules
const multer = require("multer");

// Set Storage Engine
// Configuring and validating the upload
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "public/uploads");
	},
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
		case "image/jpeg":
			return ".jpeg";
		case "image/webp":
			return ".webp";
		default:
			break;
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
const { groupEnd } = require("console");
const postData = new post();

// parses incoming requests with JSON payloads
app.use(express.json());

// Defining port number
const port = 3000;

// Public file
// serve all static files inside public directory.
app.use("/static", express.static("public"));

// API Endpoint
app.get("/", (req, res) => {
	res.status(200).send(
		"Hello, my friends Nice to Meet You welcome to My blog Post API",
	);
});

// API Endpoint to return one post based on id
app.get("/api/posts/:postId", (req, res) => {
	const postId = req.params.postId;
	const foundPost = postData.getIndividualBlog(postId);
	if (foundPost) {
		res.status(200).send({ foundPost });
	} else {
		res.status(404).send("Not Found");
	}
});

// API Endpoint to return all Posts
app.get("/api/posts", (req, res) => {
	return res.status(200).send(postData.get());
});

//  API Endpoint to add new Post
//  upload Single file(image)
app.post("/api/posts", upload.single("post_image"), (req, res) => {
	const newPost = {
		id: `${Date.now()}`,
		title: req.body.title,
		content: req.body.content,
		post_image: `uploads/${req.file.filename}`,
		added_date: `${Date.now()}`,
	};
	postData.addNewPost(newPost);
	return res.status(201).send(newPost);
});

// Server setup
// Tell our app to listen on port 3000
app.listen(port, () =>
	console.log(`Hello World app is listening on port ${port} !`),
);
