const path = require("path");

const express = require("express");

const router = express.Router();

router.get("/two", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "two.html"));
});

module.exports = router;
