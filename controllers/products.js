const Product = require("../models/product");

exports.getAddProducts = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "addProduct.html"));
  res.render("addProduct", {
    // those are fields I'm passing to the view
    pageTitle: "Add Product",
    path: "/admin/add-product", // helps view decide which link is active
    productCSS: true,
    activeProducts: true,
  });
};

exports.postAddProucts = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save(); // saves this class instance to products array
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    //that's why you add "static" keyword. Otherwise I'd have to create new Product instance with a dummy title to use it's methods
    // products are returned from callBack function
    res.render("shop", {
      products: products,
      pageTitle: "Shop",
      path: "/",
      activeShop: true,
    });
  });
  // in app.js already pug is defined as default tempating engine and views as templates folder. We just need to tell express res.render("shop") or "admin" insted of /views/shop.pug etc.
  // {products} injects the data into the
};
