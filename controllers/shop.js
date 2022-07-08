const Product = require("../models/product");
const Cart = require("../models/cart");

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

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId; // extracts :productId from address
  Product.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
  // res.redirect("/");
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

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId; // retrieving productId passed from form in product-detail.ejs. Only POST request can access req.body
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => [
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
  }),
];

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
