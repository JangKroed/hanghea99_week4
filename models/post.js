const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  postId: Number,
  userId: Number,
  nickname: String,
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  likes: Number,
});

module.exports = mongoose.model("Post", PostSchema);
