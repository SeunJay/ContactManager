const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const contactsRoute = require("./routes/contact");
const cors = require("cors");

dotenv.config();

//Middleware
app.use(express.json());

app.use(cors());

//Connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true },
  (error, connect) => {
    if (error) {
      console.log("An error occured", error);
      return;
    }
    console.log("Connected to DB!");
  }
);

//routes middleware
app.use("/contacts", contactsRoute);

if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(4000, () => {
  console.log("Server up and running on port 4000");
});
