// import express, { json } from "express";
// import { config } from "dotenv";
// import logger from "./middleware/logger.js";
// import connectDB from "./config/db.js";
// import UserRoutes from "./routes/UserRoutes.js";

const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger.js");
const connectDB = require("./config/db.js");
const UserRoutes = require("./routes/UserRoutes.js");

dotenv.config();

const app = express();

// app.use(json());
app.use(express.json());

// route
app.use(logger);
app.use("/api/", UserRoutes);

// database
connectDB();

// port
const PORT = process.env.PORT || 3000;

// server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
