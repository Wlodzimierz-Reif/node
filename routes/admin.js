// const path = require("path");

const express = require("express");

// const rootDir = require("../helpers/path");
const productController = require("../controllers/products"); // importing controller to use in router(to follow MVC pattern)


const router = express.Router();


// /admin/add-product => GET
router.get("/add-product", productController.getAddProducts);

// /admin/add-product => POST
router.post("/add-product", productController.postAddProucts);

module.exports = router;
