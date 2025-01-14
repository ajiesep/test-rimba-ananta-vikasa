const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
// import {
//   createUser,
//   getUsers,
//   getUserById,
//   updateUser,
//   deleteUser,
// } from "../controllers/userController.js";
const User = require("../models/userModel");
// import User from "../models/userModel.js";
const validator = require("validator");
// import validator from "validator";

jest.mock("../models/userModel.js");
jest.mock("validator");

describe("User Controller", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    test("should create a new user successfully", async () => {
      const userData = {
        name: "John Doe",
        email: "john@example.com",
        age: 25,
      };

      const savedUser = { ...userData, id: "123" };

      req.body = userData;
      User.prototype.save = jest.fn().mockResolvedValue(savedUser);

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(savedUser);
    });

    test("should return 400 if required data is missing", async () => {
      req.body = { name: "John Doe" };

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Data tidak lengkap" });
    });

    test("should handle errors during user creation", async () => {
      req.body = {
        name: "John Doe",
        email: "john@example.com",
        age: 25,
      };

      const error = new Error("Database error");
      User.prototype.save = jest.fn().mockRejectedValue(error);

      await createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe("getUsers", () => {
    test("should get all users successfully", async () => {
      const users = [
        { id: "1", name: "John", email: "john@example.com", age: 25 },
        { id: "2", name: "Jane", email: "jane@example.com", age: 30 },
      ];

      User.find = jest.fn().mockResolvedValue(users);

      await getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });

    test("should handle errors when getting users", async () => {
      const error = new Error("Database error");
      User.find = jest.fn().mockRejectedValue(error);

      await getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe("getUserById", () => {
    test("should get user by id successfully", async () => {
      const user = {
        id: "123",
        name: "John",
        email: "john@example.com",
        age: 25,
      };
      req.params.id = "123";

      User.findById = jest.fn().mockResolvedValue(user);

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    test("should return 404 if user not found", async () => {
      req.params.id = "123";
      User.findById = jest.fn().mockResolvedValue(null);

      await getUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });
  });

  describe("updateUser", () => {
    test("should update user successfully", async () => {
      const updatedUser = {
        id: "123",
        name: "John Updated",
        email: "john.updated@example.com",
        age: 26,
      };

      req.params.id = "123";
      req.body = {
        name: "John Updated",
        email: "john.updated@example.com",
        age: 26,
      };

      validator.isEmail.mockReturnValue(true);
      User.findOne = jest.fn().mockResolvedValue(null);
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedUser);

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedUser);
    });

    test("should return 400 if email format is invalid", async () => {
      req.params.id = "123";
      req.body = { email: "invalid-email" };

      validator.isEmail.mockReturnValue(false);

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Invalid email format" });
    });

    test("should return 400 if email is already in use", async () => {
      req.params.id = "123";
      req.body = { email: "existing@example.com" };

      validator.isEmail.mockReturnValue(true);
      User.findOne = jest.fn().mockResolvedValue({ id: "456" });

      await updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Email is already in use",
      });
    });
  });

  describe("deleteUser", () => {
    test("should delete user successfully", async () => {
      req.params.id = "123";
      User.findByIdAndDelete = jest.fn().mockResolvedValue({ id: "123" });

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "User deleted" });
    });

    test("should return 404 if user not found for deletion", async () => {
      req.params.id = "123";
      User.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });
  });
});
