const router = require("express").Router();

const User = require("../models/User.model");
const Post = require("../models/Post.model");

// ****************************************************************************************
// GET route to display the form to create a new post
// ****************************************************************************************

// localhost:3000/post-create
router.get("/post-create", (req, res) => {
  User.find()
    .then(dbUsers => {
      res.render("posts/create", { dbUsers });
    })
    .catch(err => console.log(`Err while displaying post input page: ${err}`));
});

// ****************************************************************************************
// POST route to submit the form to create a post
// ****************************************************************************************

// <form action="/post-create" method="POST">

// ... your code here
router.post("/post-create", async (req, res) => {
  const { body } = req;
  const { author: authorId } = req.body;
  const post = await Post.create(body);
  await User.findByIdAndUpdate(authorId, { $push: { posts: post._id } });
  res.redirect("/posts");
});

// ****************************************************************************************
// GET route to display all the posts
// ****************************************************************************************

// ... your code here
router.get("/posts", async (req, res) => {
  const posts = await Post.find().populate("author");
  res.render("posts/list", { posts });
});

// ****************************************************************************************
// GET route for displaying the post details page
// shows how to deep populate (populate the populated field)
// ****************************************************************************************

// ... your code here
router.get("/posts/:postId", async (req, res, next) => {
  const post = await Post.findById(req.params.postId)
    .populate("author comments")
    .populate({
      path: "comments",
      populate: { path: "author", model: "User" }
    });
  res.render("posts/details", { post });
});

module.exports = router;
