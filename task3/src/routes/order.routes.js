const express = require("express");
const orderController = require("../controllers/order.controller");
const router = express.Router();

router.post("/add", orderController.addOrder);
router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrder);

module.exports = router;
