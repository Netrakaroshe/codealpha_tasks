const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "menu",
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
});

const inventoryModel = mongoose.model("inventory", inventorySchema);

module.exports = inventoryModel;
