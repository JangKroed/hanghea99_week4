import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  commentId: Number,
  email: String,
  nickname: String,
  password: String,
});
// CommentSchema.virtual("commentId").get(function () {
//   return this._id.toHexString();
// });
// CommentSchema.set("toJSON", {
//   virtuals: true,
// });
export default mongoose.model("Comment", CommentSchema);
