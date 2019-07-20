const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  lastName: {
    type: String,
    required: false,
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
  }
});

export const Contact = mongoose.model("Contact", contactSchema);
