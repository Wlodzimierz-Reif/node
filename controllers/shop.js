const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      console.log(products);
      res.render("shop/product-list", {
        products: products,
        pageTitle: "Shop",
        path: "/products",
        activeShop: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // in app.js already pug is defined as default tempating engine and views as templates folder. We just need to tell express res.render("shop") or "admin" insted of /views/shop.pug etc.
  // {products} injects the data into the
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId; // extracts :productId from address
  // Product.findAll({
  //   where: {
  //     id: prodId,
  //   },
  // })
  Product.findByPk(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
  // res.redirect("/");
};

exports.getIndex = (req, res, next) => {
  // meand get home page (index.html) not item Index...
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        products: products,
        pageTitle: "Shop",
        path: "/",
        activeShop: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     // object destructuring
  //     res.render("shop/index", {
  //       products: rows,
  //       pageTitle: "Shop",
  //       path: "/",
  //       activeShop: true,
  //     });
  //   })
  //   .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      products.forEach((product) => {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      });
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId; // retrieving productId passed from form in product-detail.ejs. Only POST request can access req.body
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
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
