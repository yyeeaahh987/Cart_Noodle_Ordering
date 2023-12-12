const mongoose = require("mongoose");
const User = require("../models/User");

const OrderSchema = new mongoose.Schema({
  User: {
    type: String,
    required: true,
  },
  Meat: {
    type: Boolean,
    required: true,
    default: false,
  },
  Vegetable: {
    type: Boolean,
    required: true,
    default: false,
  },
  Drink: {
    type: String,
    required: true,
    default: "None"
  },
  price: {
    type: Number,
    required: true,
  },
  Delivered: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
