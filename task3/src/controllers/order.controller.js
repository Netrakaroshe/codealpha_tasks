const mongoose = require("mongoose");
const tableModel = require("../models/table.model");
const menuModel = require("../models/menu.model");
const inventoryModel = require("../models/inventory.model");
const orderModel = require("../models/order.model");

async function addOrder(req, res) {
  try {
    const { table, orderedItems } = req.body;

    if (!table || !Array.isArray(orderedItems) || orderedItems.length === 0) {
      return res.status(400).json({
        message: "Missing inputs",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(table)) {
      return res.status(400).json({
        message: "Invalid table id",
      });
    }
    for (const item of orderedItems) {
      if (!mongoose.Types.ObjectId.isValid(item.menuItem)) {
        return res.status(400).json({
          message: "Invalid menu items id",
        });
      }
      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        return res.status(400).json({
          message: "Quantity can only be a positive integer",
        });
      }
    }

    const existingtable = await tableModel.findById(table);
    if (!existingtable) {
      return res.status(404).json({
        message: "This table does not exist",
      });
    }

    for (const item of orderedItems) {
      const menuItem = await menuModel.findById(item.menuItem);

      if (!menuItem) {
        return res.status(404).json({
          message: "This menu item does not exist",
        });
      }

      item.priceAtOrder = menuItem.price;
      const currentStock = await inventoryModel.findOne({
        menuItem: item.menuItem,
      });
      if (!currentStock) {
        return res.status(404).json({
          message: "Inventory record not found",
        });
      }
      if (currentStock.stock < item.quantity) {
        return res.status(400).json({
          message: "Menu item not available",
        });
      }
    }
    const order = await orderModel.create({
      orderedItems,
      table,
    });
    for (const item of orderedItems) {
      await inventoryModel.findOneAndUpdate(
        {
          menuItem: item.menuItem,
        },
        {
          $inc: {
            stock: -item.quantity,
          },
        },
      );
    }

    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (e) {
    console.error("Error while adding an order : ", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getAllOrders(req, res) {
  try {
    const orders = await orderModel
      .find()
      .populate("table")
      .populate("orderedItems.menuItem");

    return res.status(200).json({
      message: "Fetched all orders successfully",
      orders,
    });
  } catch (e) {
    console.error("Error while fetching all orders : ", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getOrder(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid id",
      });
    }

    const order = await orderModel
      .findById(id)
      .populate("table")
      .populate("orderedItems.menuItem");
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    return res.status(200).json({
      message: "Fetched order successfully",
      order,
    });
  } catch (e) {
    console.error("Error while fetching order : ", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = { addOrder, getAllOrders, getOrder };
