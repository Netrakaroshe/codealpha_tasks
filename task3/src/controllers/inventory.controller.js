const mongoose = require("mongoose");
const inventoryModel = require("../models/inventory.model");

async function getAStock(req, res) {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid id",
      });
    }

    const inventoryStock = await inventoryModel
      .findById(id)
      .populate("menuItem");

    if (!inventoryStock) {
      return res.status(404).json({
        message: "Stock not found in inventory",
      });
    }

    return res.status(200).json({
      message: "Stock fetched successfully from inventory",
      inventoryStock,
    });
  } catch (e) {
    console.error("Error while fetching a stock from inventory : ", e);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getInventory(req, res) {
  try {
    const inventory = await inventoryModel.find().populate("menuItem");

    return res.status(200).json({
      message: "Inventory fetched successfully",
      inventory,
    });
  } catch (e) {
    console.error("Error while fetching inventory : ", e);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function updateStock(req, res) {
  try {
    const { quantity } = req.body;
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid id",
      });
    }

    if (!Number.isInteger(quantity) || quantity === 0) {
      return res.status(400).json({
        message: "Quantity cannot be zero",
      });
    }

    const updatedStock = await inventoryModel
      .findByIdAndUpdate(
        id,
        {
          $inc: {
            stock: quantity,
          },
        },
        { new: true },
      )
      .populate("menuItem");

    if (!updatedStock) {
      return res.status(404).json({
        message: "Stock not found in inventory",
      });
    }

    return res.status(200).json({
      message: "Stock updated successfully in inventory",
      updatedStock,
    });
  } catch (e) {
    console.error("Error while updating stock in inventory : ", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = { getAStock, getInventory, updateStock };
