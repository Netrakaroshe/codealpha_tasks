const express = require("express");

const menuRoutes = require("./routes/menu.routes");
const inventoryRoutes = require("./routes/inventory.routes");
const tableRoutes = require("./routes/table.routes");
const reservationRoutes = require("./routes/reservation.routes");

const app = express();

app.use(express.json());
app.use("/api/menu", menuRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/table", tableRoutes);
app.use("/api/reservation", reservationRoutes);

module.exports = app;
