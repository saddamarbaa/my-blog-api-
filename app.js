/** @format */

// import express framework from node_modules
const express = require('express');

// Creating express object(initializ express)
const app = express();

// import cors from node_modules (Using cors)
const cors = require('cors');

// determine which domain can access the website
app.use(cors());

// Defining port number
const port = 3000;

// Requiring models
const post = require('./api/models/posts');
const postData = new post();

// Requiring http and url
const http = require('http');
const url = require('url');

// Function to serve all static files inside public directory.
app.use('/static', express.static('public'));

// API Endpoint
app.get('/', (req, res) => {
	res.status(200).send(
		'Hello, my friends Nice to Meet You welcome to My blog Post API',
	);
});

// API Endpoint to return one post based on id
app.get('/api/posts/:postId', (req, res) => {
	const postId = req.params.postId;
	const foundPost = postData.getIndividualBlog(postId);
	if (foundPost) {
		res.status(200).send({ foundPost });
	} else {
		res.status(404).send('Not Found');
	}
});

// API Endpoint to return all Posts
app.get('/api/posts', (req, res) => {
	return res.status(200).send(postData.get());
});

// Server setup
app.listen(port, () =>
	console.log(`Hello World app is listening on port ${port} !`),
);
