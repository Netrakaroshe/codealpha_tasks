const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "event",
    required: true,
  },
});

const registrationModel = mongoose.model("registration", registrationSchema);

module.exports = registrationModel;