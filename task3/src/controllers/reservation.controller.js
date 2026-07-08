const reservationModel = require("../models/reservation.model");
const tableModel = require("../models/table.model");
const mongoose = require("mongoose");

async function addReservation(req, res) {
  try {
    const { customerName, email, phoneNo, startDateTime, table } = req.body;

    if (!customerName || !email || !phoneNo || !startDateTime || !table) {
      return res.status(400).json({
        message: "Missing inputs",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(table)) {
      return res.status(400).json({
        message: "Invalid table id",
      });
    }

    const existingTable = await tableModel.findById(table);

    if (!existingTable) {
      return res.status(404).json({
        message: "Table not found",
      });
    }

    const start = new Date(startDateTime);
    const today = new Date();

    if (Number.isNaN(start.getTime())) {
      return res.status(400).json({
        message: "Invalid start date and time",
      });
    }
    if (start.getTime() <= today.getTime()) {
      return res.status(400).json({
        message: "Reservations can only be made for a future date and time.",
      });
    }

    const reservePeriod = 2.5 * 60 * 60 * 1000;

    const end = new Date(start.getTime() + reservePeriod);

    const overlappingReservation = await reservationModel.findOne({
      table,
      startDateTime: {
        $lt: end,
      },
      endDateTime: {
        $gt: start,
      },
    });
    if (overlappingReservation) {
      return res.status(409).json({
        message: "This table is already reserved for selected time",
      });
    }

    const reservation = await reservationModel.create({
      customerName,
      email,
      phoneNo,
      table,
      startDateTime: start,
      endDateTime: end,
    });

    return res.status(201).json({
      message: "Reservation created successfully",
      reservation,
    });
  } catch (e) {
    console.error("Error while adding a reservation : ", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getAllReservations(req, res) {
  try {
    const reservations = await reservationModel.find().populate("table");

    return res.status(200).json({
      message: "All reservations fetched successfully",
      reservations,
    });
  } catch (e) {
    console.error("Error while fetching all reservations : ", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getReservation(req, res) {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid id",
      });
    }

    const reservation = await reservationModel.findById(id).populate("table");
    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    return res.status(200).json({
      message: "Reservation fetched successfully",
      reservation,
    });
  } catch (e) {
    console.error("Error while fetching a reservation : ", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function cancelReservation(req, res) {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid id",
      });
    }

    const reservation = await reservationModel.findByIdAndDelete(id);
    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    return res.status(200).json({
      message: "Reservation deleted successfully",
      reservation,
    });
  } catch (e) {
    console.error("Error while deleting a reservation : ", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {
  addReservation,
  getAllReservations,
  getReservation,
  cancelReservation,
};
