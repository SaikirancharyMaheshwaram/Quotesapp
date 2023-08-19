import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fav: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
});

export const UserModel = mongoose.model("users", UserSchema);
