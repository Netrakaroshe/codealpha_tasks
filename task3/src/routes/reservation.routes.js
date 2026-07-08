const express = require("express");
const reservationController = require("../controllers/reservation.controller");
const router = express.Router();

router.post("/add", reservationController.addReservation);
router.get("/", reservationController.getAllReservations);
router.get("/:id", reservationController.getReservation);
router.delete("/:id", reservationController.cancelReservation);

module.exports = router;
