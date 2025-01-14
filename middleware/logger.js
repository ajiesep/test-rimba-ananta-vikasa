const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const { fileURLToPath } = require("url");

// import morgan from "morgan";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const logStream = fs.createWriteStream(
  path.join(__dirname, "../../requests.log"),
  { flags: "a" }
);

const logger = morgan("combined", { stream: logStream });

module.exports = logger;
