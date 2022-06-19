const path = require("path");

const express = require("express");

const rootDir = require("../helpers/path");

const router = express.Router();

const adminData = require("./admin");

router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render("shop", { products: products, docTitle: "Shopp" }); // in app.js already pug is defined as default tempating engine and views as templates folder. We just need to tell express res.render("shop") or "admin" insted of /views/shop.pug etc.
  // {products} injects the data into the
});

module.exports = router;
