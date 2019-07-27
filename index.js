const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const contactsRoute = require("./routes/contact");

dotenv.config();

//Connect to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connected to DB!");
});

//Middleware
app.use(express.json());

//routes middleware
app.use("/contacts", contactsRoute);

app.listen(5000, () => {
  console.log("Server up and running");
});
