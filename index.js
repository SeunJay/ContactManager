const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

app.listen(5000, () => {
  console.log("Server up and running");
});
