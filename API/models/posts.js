const { raw } = require("express");
const fs = require("fs");
const PATH = "./data.json";

class Post {
  constructor() {}

  get() {
    // get Posts
    return this.readData();
  }

  getIndividualBlog() {
    // Get one Blog Post
  }

  add() {
    // Add New Post
    console.log("ok");
  }

  readData() {
    const rawdata = fs.readFileSync(PATH);
    const posts = JSON.parse(rawdata);
    return (module.exports = posts);
  }
}

module.exports = Post;
