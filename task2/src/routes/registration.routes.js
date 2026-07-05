const express = require("express");
const registrationController = require("../controllers/registration.controller");
const router = express.Router();

router.post("/add", registrationController.addNewRegistration);
router.get("/:id", registrationController.getRegistration);
router.delete("/:id", registrationController.deleteRegistration);
router.get("/", registrationController.getAllRegistrations);

module.exports = router;
