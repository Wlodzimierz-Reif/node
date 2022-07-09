const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "addProduct.html"));
  res.render("admin/edit-product", {
    // those are fields I'm passing to the view
    pageTitle: "Add Product",
    path: "/admin/add-product", // helps view decide which link is active
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(null, title, imageUrl, description, price);
  product.save(); // saves this class instance to products array
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; // retrieved value is always a string!!!
  if (!editMode) {
    return res.redirect("/"); // could be eirther "return" or wrapping rest in "else"
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId; // in POST request product ID is passed via hidden input (check edit-product.ejs)
  console.log(prodId);
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;
  const updatedProduct = new Product( // creates new instance with updated params and saves it. We're passing in prodId so it edits existing product and not adds a new one(see save() method in product.js controller)
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDescription,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect("/admin/products")
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
