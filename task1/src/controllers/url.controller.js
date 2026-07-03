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

      let shortCodeExists = await urlModel.findOne({
        shortCode: shortCode,
      });

      if (!shortCodeExists) {
        break;
      }
    }

    const url = await urlModel.create({
      originalUrl,
      shortCode,
    });

    const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;
    return res.status(201).json({
      message: "Url shortened successfully",
      shortUrl,
    });
  } catch (e) {
    console.error("Error while shortening Url : ", e);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function redirectToOriginalUrl(req, res) {
  try {
    const shortCode = req.params.shortCode;

    const url = await urlModel.findOne({ shortCode });
    if (!url) {
      return res.status(404).json({
        message: "Page not found",
      });
    }

    res.redirect(url.originalUrl);
  } catch (e) {
    console.error("Error while redirecting : ", e);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
module.exports = { shortenUrl, redirectToOriginalUrl };
