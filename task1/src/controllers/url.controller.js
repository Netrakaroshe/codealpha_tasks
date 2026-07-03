const urlModel = require("../models/url.model");

async function shortenUrl(req, res) {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) {
      return res.status(400).json({
        message: "Invalid",
      });
    }
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let shortCode;
    while (true) {
      shortCode = "";
      for (let i = 0; i < 6; i++) {
        const index = Math.floor(Math.random() * chars.length);
        shortCode += chars[index];
      }

      let isShortCodeAlreadyExists = await urlModel.findOne({
        shortCode: shortCode,
      });

      if (!isShortCodeAlreadyExists) {
        break;
      }
    }

    const url = await urlModel.create({
      originalUrl,
      shortCode,
    });

    return res.status(201).json({
      message: "Url shortened successfully",
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
    });
  } catch (e) {
    console.error("Error while shortening Url : ", e);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = { shortenUrl };
