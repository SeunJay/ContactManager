const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
//const bodyParser = require("body-parser");
const contactsRoute = require("./routes/contact");
const cors = require("cors");

dotenv.config();

// app.use(
//   bodyParser.urlencoded({
//     extended: false
//   })
// );
// app.use(bodyParser.json());

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

app.listen(4000, () => {
  console.log("Server up and running on port 4000");
});
