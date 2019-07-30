const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  phone: {
    type: String,
    required: true,
    max: 25,
    min: 11
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  _id: {
    type: String
  }
});

module.exports = mongoose.model("contact", contactSchema);
