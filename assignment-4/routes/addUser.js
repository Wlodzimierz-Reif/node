const express = require("express");

const router = express.Router();

const users = [];

router.get("/add-user", (req, res, next) => {
  res.render("addUser", {
    pageTitle: "Users",
    path: "/add-user",
  });
});

router.post("/add-user", (req, res, next) => {
    users.push({user: req.body.userName})
    res.redirect("/")
})

exports.router = router;
exports.users = users;