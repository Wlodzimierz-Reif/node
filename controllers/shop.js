const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    //that's why you add "static" keyword. Otherwise I'd have to create new Product instance with a dummy title to use it's methods
    // products are returned from callBack function
    res.render("shop/product-list", {
      products: products,
      pageTitle: "Shop",
      path: "/products",
      activeShop: true,
    });
  });
  // in app.js already pug is defined as default tempating engine and views as templates folder. We just need to tell express res.render("shop") or "admin" insted of /views/shop.pug etc.
  // {products} injects the data into the
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      products: products,
      pageTitle: "Shop",
      path: "/",
      activeShop: true,
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart",
  });
};

exports.getOrders = (req, res, next) => [
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders"
  })
]

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
