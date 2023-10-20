const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3,
  },
  desc: {
    type: String,
    required: true,
    min: 8,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  review: {
    type: Number,
    required: true,
  },
  catagory: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Food", FoodSchema);
