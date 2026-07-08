const express = require("express");
const menuRoutes = require("./routes/menu.routes");
const inventoryRoutes = require("./routes/inventory.routes");
const app = express();

app.use(express.json());
app.use("/api/menu", menuRoutes);
app.use("/api/inventory", inventoryRoutes);

module.exports = app;
