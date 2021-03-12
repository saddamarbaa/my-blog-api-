// import express framework from node_modules
const express = require("express");

// Creating express object(initializ express)
const app = express();

// import cors from node_modules (Using cors)
const cors = require("cors");

// Defining port number
const port = 3000;

// determine which domain can access the website
app.use(cors());

// Requiring models
const post = require("./api/models/posts");
const postData = new post();

const http = require("http");
const url = require("url");

// Function to serve all static files inside public directory.
app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res
    .status(200)
    .send("Hell, my friends Nice to Meet You welcome to My blog Post API");
});

app.get("/api/posts/:postId", (req, res) => {
  const postId = req.params.postId;
  const foundPost = postData.getIndividualBlog(postId);
  if (foundPost) res.status(200).send({ foundPost });
  res.status(404).send("Not Found");
});

app.get("/api/posts", (req, res) => {
  res.status(200).send(postData.get());
});

// Server setup
app.listen(port, () =>
  console.log(`Hello World app is listening on port ${port} !`)
);
