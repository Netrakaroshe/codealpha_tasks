const express = require("express");
const urlRoutes = require("./routes/url.routes");
const urlController = require("./controllers/url.controller");

const app = express();

app.use(express.json());
app.use("/api/url", urlRoutes);
app.get("/:shortCode", urlController.redirectToOriginalUrl);


module.exports = app;
