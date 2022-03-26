import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Name is required"],
    },
    lastname: {
      type: String,
      required: [true, "LastName is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
