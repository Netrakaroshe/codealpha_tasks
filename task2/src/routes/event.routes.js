const express = require("express");
const eventController = require("../controllers/event.controller");
const router = express.Router();

router.post("/add", eventController.addEvent);
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getAnEvent);

module.exports = router;
