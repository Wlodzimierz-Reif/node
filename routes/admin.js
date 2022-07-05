// const path = require("path");

const express = require("express");

// const rootDir = require("../helpers/path");
const adminController = require("../controllers/admin"); // importing controller to use in router(to follow MVC pattern)

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProducts);
router.get("/products", adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProucts);

module.exports = router;
