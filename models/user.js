import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: Number,
  nickname: String,
  password: String,
});
// UserSchema.virtual("userId").get(function () {
//   return this._id.toHexString();
// });
// UserSchema.set("toJSON", {
//   virtuals: true,
// });
export default mongoose.model("User", UserSchema);
