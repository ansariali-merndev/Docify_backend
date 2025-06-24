import mongoose from "mongoose";

const userScehma = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserDB =
  mongoose.models.User || mongoose.model("User", userScehma);
