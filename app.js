const express = require("express");
const app = express();
const port = 3000;
const post = require("./api/models/posts");
const postData = new post();

app.get("/", (req, res) => {
  res
    .status(200)
    .send("Hell, my friends Nice to Meet You welcome to My blog Post API");
});

app.get("/api/posts", (req, res) => {
  res.status(200).send(postData.get());
});

app.listen(port, () =>
  console.log(`Hello World app is listening on port ${port} !`)
);
