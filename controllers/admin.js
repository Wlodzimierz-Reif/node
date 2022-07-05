const Product = require("../models/product");

exports.getAddProducts = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "addProduct.html"));
  res.render("admin/add-product", {
    // those are fields I'm passing to the view
    pageTitle: "Add Product",
    path: "/admin/add-product", // helps view decide which link is active
    productCSS: true,
    activeProducts: true,
  });
};

exports.postAddProucts = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(title, imageUrl, description, price);
  product.save(); // saves this class instance to products array
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      products: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
      activeShop: true,
    });
  });
};
