const tableModel = require("../models/table.model");
const mongoose = require("mongoose");

async function addTable(req, res) {
  try {
    const { tableNo, customerCapacity } = req.body;

    if (tableNo === undefined || customerCapacity === undefined) {
      return res.status(400).json({
        message: "Incomplete fields",
      });
    }
    if (tableNo <= 0 || customerCapacity <= 0) {
      return res.status(400).json({
        message: "Invalid inputs",
      });
    }

    if (!Number.isInteger(tableNo) || !Number.isInteger(customerCapacity)) {
      return res.status(400).json({
        message: "This field can only be a integer",
      });
    }
    const existingTable = await tableModel.findOne({ tableNo });

    if (existingTable) {
      return res.status(409).json({
        message: "Table already exists",
      });
    }

    const table = await tableModel.create({
      tableNo,
      customerCapacity,
    });

    return res.status(201).json({
      message: "New table added successfully",
      table,
    });
  } catch (e) {
    console.error("Error while adding new table : ", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getTables(req, res) {
  try {
    const tables = await tableModel.find();

    return res.status(200).json({
      message: "Fetched all tables successfully",
      tables,
    });
  } catch (e) {
    console.error("Error while fetching all tables : ", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getATable(req, res) {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid id",
      });
    }

    const table = await tableModel.findById(id);

    if (!table) {
      return res.status(404).json({
        message: "Table not found",
      });
    }

    return res.status(200).json({
      message: "Table fetched successfully",
      table,
    });
  } catch (e) {
    console.error("Error while fetching a table : ", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = { addTable, getTables, getATable };
