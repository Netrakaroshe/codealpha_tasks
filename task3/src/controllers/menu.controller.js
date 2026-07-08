const mongoose = require("mongoose");
const inventoryModel = require("../models/inventory.model");
const menuModel = require("../models/menu.model");

async function addMenuItem(req, res) {
  try {
    const { itemName, description, price, typeOfItem, category } = req.body;

    if (
      !itemName ||
      !description ||
      price === undefined ||
      !typeOfItem ||
      !category
    ) {
      return res.status(400).json({
        message: "Incomplete field.",
      });
    }
    const normalizedItemName = itemName.trim().toLowerCase();
    const normalizedTypeOfItem = typeOfItem.trim().toLowerCase();

    const existingMenuItem = await menuModel.findOne({
      itemName: normalizedItemName,
    });
    if (existingMenuItem) {
      return res.status(409).json({
        message: "This item already exists",
      });
    }
    if (price < 0) {
      return res.status(400).json({
        message: "Price cannot be negative",
      });
    }
    if (
      !["vegetarian", "non-vegetarian", "vegan"].includes(normalizedTypeOfItem)
    ) {
      return res.status(400).json({
        message: "Enter valid type of Item",
      });
    }

    const menuItem = await menuModel.create({
      itemName,
      description,
      price,
      typeOfItem,
      category,
    });

    await inventoryModel.create({
      menuItem: menuItem._id,
    });

    return res.status(201).json({
      message: "Menu item added successfully",
      menuItem,
    });
  } catch (e) {
    console.error("Error while adding a menu item : ", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getAllMenuItems(req, res) {
  try {
    const menuItems = await menuModel.find();

    return res.status(200).json({
      message: "All menu items fetched successfully",
      menuItems,
    });
  } catch (e) {
    console.error("Error while fetching all menu items : ", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getAMenuItem(req, res) {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid id",
      });
    }

    const menuItem = await menuModel.findById(id);

    if (!menuItem) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    return res.status(200).json({
      message: "Menu item fetched successfully",
      menuItem,
    });
  } catch (e) {
    console.error("Error while getting a menu item : ", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = { addMenuItem, getAllMenuItems, getAMenuItem };
