import mongoose from "mongoose";

import { Schema } from "mongoose";

 const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilePic: {
    type: String,
    default: ''
  },
  bio: {
    type: String,

  },

}, { timestamps: true });



export const User = mongoose.model('User', UserSchema);