const User = require("../models/userModel");
const validator = require("validator");
// import User from "../models/userModel.js";
// import validator from "validator";

const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }
    // if (email && !validator.isEmail(email)) {
    //   return res.status(400).json({ error: "Invalid email format" });
    // }
    const newUser = new User({ name, email, age });
    console.log(newUser, ">>>>>>>>>");

    const createdUser = await newUser.save();
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, ...updatedUser } = req.body;

    if (email && !validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser.id !== id) {
        return res.status(400).json({ error: "Email is already in use" });
      }
    }

    const updatedUserData = { ...updatedUser };
    if (email) updatedUserData.email = email;

    const updatedUserRecord = await User.findByIdAndUpdate(
      id,
      updatedUserData,
      { new: true }
    );

    if (!updatedUserRecord) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUserRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
    // console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
