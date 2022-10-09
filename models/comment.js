const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
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
