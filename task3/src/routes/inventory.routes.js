const express = require("express");
const inventoryController = require("../controllers/inventory.controller");
const router = express.Router();

router.patch("/:id", inventoryController.updateStock);
router.get("/", inventoryController.getInventory);
router.get("/:id", inventoryController.getAStock);

module.exports = router;
