const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  postId: String,
  commentId: Number,
  userId: Number,
  nickname: String,
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
