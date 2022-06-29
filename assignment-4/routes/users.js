const express = require("express");

const router = express.Router();

const usersData = require("./addUser")

router.get("/", (req, res, next) => {
  const usersList = usersData.users;
  console.log(usersList);
  res.render("list", {
    users: usersList,
    pageTitle: "Users",
    path: "/",
  });
});

module.exports = router;

