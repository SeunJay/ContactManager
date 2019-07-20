const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

dotenv.config();

//Connect to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connected to DB!");
});

app.listen(5000, () => {
  console.log("Server up and running");
});
