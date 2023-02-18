import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      uniq: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
