import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  postId: Number,
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
// PostSchema.virtual("postId").get(function () {
//   return this._id.toHexString();
// });
// PostSchema.set("toJSON", {
//   virtuals: true,
// });
export default mongoose.model("Post", PostSchema);
