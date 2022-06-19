const path = require("path");

const express = require("express");

const router = express.Router();

router.get("/one", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "one.html"));
});

module.exports = router;
