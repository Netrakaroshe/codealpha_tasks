const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderedItems: [
      {
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "menu",
          required: true,
        },
        priceAtOrder: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "table",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
