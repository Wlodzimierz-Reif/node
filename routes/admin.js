// const path = require("path");

const express = require("express");

// const rootDir = require("../helpers/path");
const adminController = require("../controllers/admin"); // importing controller to use in router(to follow MVC pattern)

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);
router.get("/products", adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);
router.get("/edit-product/:productId", adminController.getEditProduct);
router.post("/edit-product", adminController.postEditProduct);

module.exports = router;
