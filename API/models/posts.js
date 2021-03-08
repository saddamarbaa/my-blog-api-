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

  addNewPost(newPost) {
    const currentPosts = this.readData();

    currentPosts.unshift(newPost);
    console.log(currentPosts);
    this.storeData(currentPosts);
  }

  readData() {
    const rawdata = fs.readFileSync(PATH);
    const posts = JSON.parse(rawdata);
    return (module.exports = posts);
  }

  storeData(rawData) {
    let data = JSON.stringify(rawData);
    fs.writeFileSync(PATH, data);
  }
}

module.exports = Post;
