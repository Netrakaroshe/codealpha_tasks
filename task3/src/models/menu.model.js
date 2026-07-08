const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  typeOfItem: {
    type: String,
    enum: ["vegetarian", "non-vegetarian", "vegan"],
    required: true,
    trim: true,
    lowercase: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

const menuModel = mongoose.model("menu", menuSchema);

module.exports = menuModel;
