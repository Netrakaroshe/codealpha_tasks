const mongoose = require("mongoose");
const eventModel = require("../models/event.model");

async function addEvent(req, res) {
  try {
    const { title, description, organizedBy, capacity, date, venue } = req.body;

    if (
      !title ||
      !description ||
      !organizedBy ||
      !capacity ||
      !date ||
      !venue
    ) {
      return res.status(400).json({
        message: "Bad request",
      });
    }

    const dateStamp = new Date(date);
    if (Number.isNaN(dateStamp.getTime())) {
      return res.status(400).json({
        message: "Bad request. Enter valid date",
      });
    }

    const today = new Date();
    if (dateStamp <= today) {
      return res.status(400).json({
        message: "Event can only be set after today",
      });
    }

    const event = await eventModel.create({
      title,
      description,
      organizedBy,
      capacity,
      date: dateStamp,
      venue,
    });
    return res.status(201).json({
      message: "Event added successfully",
      event,
    });
  } catch (e) {
    console.log("Error while adding event : ", e);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function getAllEvents(req, res) {
  try {
    const events = await eventModel.find();
    return res.status(200).json({
      message: "Fetched all events",
      events,
    });
  } catch (e) {
    console.error("Error while fetching events : ", e);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function getAnEvent(req, res) {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid event ID",
      });
    }

    const event = await eventModel.findById(id);
    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    return res.status(200).json({
      message: "Fetched an event",
      event,
    });
  } catch (e) {
    console.error("Error while fetching an event : ", e);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = { addEvent, getAllEvents, getAnEvent };
