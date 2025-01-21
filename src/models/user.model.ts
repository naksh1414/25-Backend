import { Schema, model } from "mongoose";
import { nanoid } from "nanoid";

const userSchema = new Schema({
  slug: {
    type: String,
    unique: true,
    default: () => nanoid(8),
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  college: {
    type: String,
  },
  branch: {
    type: String,
  },
  year: {
    type: String,
  },
  phone: {
    type: String,
  },
  libraryId: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
  profilePicture: {
    type: String,
    default: "",
  },
});

export const UserModel = model("User", userSchema);
