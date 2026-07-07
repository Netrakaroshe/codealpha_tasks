const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  tableNo: {
    type: Number,
    required: true,
    unique: true,
  },
  customerCapacity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const tableModel = mongoose.model("table", tableSchema);

module.exports = tableModel;
