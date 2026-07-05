const eventModel = require("../models/event.model");
const registrationModel = require("../models/registration.model");
const mongoose = require("mongoose");
async function addNewRegistration(req, res) {
  try {
    const { name, email, event } = req.body;
    if (!name || !email || !event) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(event)) {
      return res.status(400).json({
        message: "Invalid event ID",
      });
    }
    const existingEvent = await eventModel.findById(event);
    if (!existingEvent) {
      return res.status(404).json({
        message: "No such event found",
      });
    }
    const normalizedEmail = email.toLowerCase().trim();
    const existingRegistration = await registrationModel.findOne({
      event,
      email: normalizedEmail,
    });
    if (existingRegistration) {
      return res.status(409).json({
        message: "You have already registered for this event",
      });
    }
    if (existingEvent.currentCapacity >= existingEvent.capacity) {
      return res.status(409).json({
        message: "Event registrations are full",
      });
    }
    const registration = await registrationModel.create({
      name,
      email: normalizedEmail,
      event,
    });
    await eventModel.findByIdAndUpdate(event, {
      $inc: {
        currentCapacity: 1,
      },
    });
    return res.status(201).json({
      message: "New registration added successfully",
      registration,
    });
  } catch (e) {
    console.log("Error while adding new registration : ", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getRegistration(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid registration ID",
      });
    }

    const registration = await registrationModel.findById(id).populate("event");

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    return res.status(200).json({
      message: "Registration fetched successfully",
      registration,
    });
  } catch (e) {
    console.error("error while fetching a registration : ", e);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function deleteRegistration(req, res) {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid Id",
      });
    }

    const registration = await registrationModel.findById(id).populate("event");

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }
    const eventDate = registration.event.date;
    if (eventDate <= new Date()) {
      return res.status(400).json({
        message: "Cannot cancel registration for past event",
      });
    }

    const deletedRegistration = await registrationModel
      .findByIdAndDelete(id)
      .populate("event");

    await eventModel.findByIdAndUpdate(registration.event._id, {
      $inc: {
        currentCapacity: -1,
      },
    });

    return res.status(200).json({
      message: "Registration cancelled successfully",
      deletedRegistration,
    });
  } catch (e) {
    console.error("Error while cancelling registration : ", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getAllRegistrations(req, res) {
  try {
    const registrations = await registrationModel.find().populate("event");

    return res.status(200).json({
      message: "Fetched all registrations",
      registrations,
    });
  } catch (e) {
    console.error("Error while fetching all registrations : ", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {
  addNewRegistration,
  getRegistration,
  getAllRegistrations,
  deleteRegistration,
};
