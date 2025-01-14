const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// import mongoose from "mongoose";
// import { v4 as uuidv4 } from "uuid";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [emailRegex, "tolong input dengan format email."],
  },
  age: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
