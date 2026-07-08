const express = require("express");
const menuController = require("../controllers/menu.controller");
const router = express.Router();

router.post("/add", menuController.addMenuItem);
router.get("/", menuController.getAllMenuItems);
router.get("/:id", menuController.getAMenuItem);

module.exports = router;
