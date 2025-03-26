// Core Module
const path = require("path");

// External Module
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const { default: mongoose } = require("mongoose");
const DB_PATH = process.env.MONGODB_URI;

//Local Module
const errorsController = require("./controllers/errors.js");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));
app.use(errorsController.pageNotFound);

const PORT = 3000;

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to Mongo");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo: ", err);
  });
