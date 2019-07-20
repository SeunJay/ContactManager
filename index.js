const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const contactsRouter = require("./routes/contact")

const app = express();

dotenv.config();

//Connect to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connected to DB!");
});

//routes middleware
app.use("/contacts", contactsRouter)

app.listen(5000, () => {
  console.log("Server up and running");
});
