const express = require("express");
const app = express();
const port = 3000;

// respond with "Hell, my friends Nice to Meet You welcome to My blog Post API" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res
    .status(200)
    .send("Hell, my friends Nice to Meet You welcome to My blog Post API");
});

const posts = [
  {
    id: "1581461442206",
    title: "This is a New Blog Post",
    content: "This is the content! ",
    post_image: "uploads/post-image-1581461442199.jpg",
    added_date: "1581461442206",
  },
];

app.get("/api/posts", (req, res) => {
  res.status(200).send(posts);
});

app.listen(port, () =>
  console.log(`Hello World app is listening on port ${port} !`)
);
