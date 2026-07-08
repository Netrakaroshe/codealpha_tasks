const express = require("express");
const router = express.Router();
const tableController = require("../controllers/table.controller");

router.post("/add", tableController.addTable);
router.get("/", tableController.getTables);
router.get("/:id", tableController.getATable);

module.exports = router;
