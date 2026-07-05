const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  organizedBy: {
    type: String,
  },
  capacity: {
    type: Number,
    required: true,
  },
  currentCapacity:{
    type:Number,
    default:0,
  },
  date: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
});

const eventModel = mongoose.model("event", eventSchema);

module.exports = eventModel;
