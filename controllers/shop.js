const Product = require("../models/product");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  // Product.fetchAll() // vanilla mongoDB stuff
  Product.find() // Mongoose method for fetching all
    .then((products) => {
      res.render("shop/product-list", {
        products: products,
        pageTitle: "Shop",
        path: "/products",
        activeShop: true,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // in app.js already pug is defined as default tempating engine and views as templates folder. We just need to tell express res.render("shop") or "admin" insted of /views/shop.pug etc.
  // {products} injects the data into the template
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId; // extracts :productId from address

  Product.findById(prodId) // it's mongoDB and mongoose method
    // mongoose can even convert "prodIs" string to object
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  // meand get home page (index.html) not item Index...
  // Product.fetchAll()
  Product.find() // Mongoose method
    .then((products) => {
      res.render("shop/index", {
        products: products,
        pageTitle: "Shop",
        path: "/",
        activeShop: true,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  console.log(req.session);
  req.user
    // MongoDB way

    // .getCart()
    .populate("cart.items.productId") // it fetches and populates all ths data in this indicated place
    // .execPopulate() // in old mongoose .populate doesn't return promise so it must be turned into one
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: products,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId; // retrieving productId passed from form in product-detail.ejs. Only POST request can access req.body
  Product.findById(prodId) // is't both MondoDB and Mongoose method
    .then((product) => {
      return req.user.addToCart(product); // we've added this custom method using mongoose to user model
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
        // { ...i.productId._doc } is needed as otherwise it stores only product id not the whole object. _doc is the mongoose method that gives us access to the whole object incuding metadata(that we can't see)
      });
      const order = new Order({
        user: {
          name: req.user.name,
          usedId: req.user, // mongoose will automaticaly pick Id. No need to write req.user._id
        },
        products: products,
      });
      order.save();
    })
    .then((result) => {
      req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  // req.user
  // .getOrders() // old MongoDB
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        pageTitle: "Orders",
        path: "/orders",
        orders: orders,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

/////////////////////////////////////////////////////////// MYSQL

// const Product = require("../models/product");
// const Order = require("../models/order");

// exports.getProducts = (req, res, next) => {
//   Product.findAll()
//     .then((products) => {
//       res.render("shop/product-list", {
//         products: products,
//         pageTitle: "Shop",
//         path: "/products",
//         activeShop: true,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   // in app.js already pug is defined as default tempating engine and views as templates folder. We just need to tell express res.render("shop") or "admin" insted of /views/shop.pug etc.
//   // {products} injects the data into the template
// };

// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productId; // extracts :productId from address
//   // Product.findAll({
//   //   where: {
//   //     id: prodId,
//   //   },
//   // })
//   Product.findByPk(prodId)
//     .then((product) => {
//       res.render("shop/product-detail", {
//         product: product,
//         pageTitle: product.title,
//         path: "/products",
//       });
//     })
//     .catch((err) => console.log(err));
//   // res.redirect("/");
// };

// exports.getIndex = (req, res, next) => {
//   // meand get home page (index.html) not item Index...
//   Product.findAll()
//     .then((products) => {
//       res.render("shop/index", {
//         products: products,
//         pageTitle: "Shop",
//         path: "/",
//         activeShop: true,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.getCart = (req, res, next) => {
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts(); //we can get products from cart thaks to "Cart.belongsToMany(Product, { through: CartItem })" association in app.js
//     })
//     .then((products) => {
//       res.render("shop/cart", {
//         pageTitle: "Your Cart",
//         path: "/cart",
//         products: products,
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.postCart = (req, res, next) => {
//   const prodId = req.body.productId; // retrieving productId passed from form in product-detail.ejs. Only POST request can access req.body
//   let fetchedCart;
//   let newQuantity = 1;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts({ where: { id: prodId } }); // retrieve only single product
//     })
//     .then((products) => {
//       let product;
//       if (products.length > 0) {
//         product = products[0];
//       }
//       if (product) {
//         const oldQuantity = product.cartItem.quantity;
//         newQuantity = oldQuantity + 1;
//         return product;
//       }
//       return Product.findByPk(prodId);
//     })
//     .then((product) => {
//       // another magic sequelize method to manage many to many relationss
//       return fetchedCart.addProduct(product, {
//         through: { quantity: newQuantity },
//       });
//     })
//     .then(() => {
//       res.redirect("/cart");
//     })
//     .catch((err) => console.log(err));
// };

// exports.postCartDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   req.user
//     .getCart()
//     .then((cart) => {
//       return cart.getProducts({ where: { id: prodId } });
//     })
//     .then((products) => {
//       const product = products[0];
//       return product.cartItem.destroy();
//     })
//     .then((result) => {
//       res.redirect("/cart");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   // Product.findById(prodId, (product) => {
//   //   Cart.deleteProduct(prodId, product.price);
//   // });
// };

// exports.postOrder = (req, res, next) => {
//   // you get user's cart, get products from that cart, then you create an order on that user and then you add products to that order with the quantity
//   let fetchedCart;
//   req.user
//     .getCart()
//     .then((cart) => {
//       fetchedCart = cart;
//       return cart.getProducts();
//     })
//     .then((products) => {
//       return (
//         req.user
//           .createOrder()
//           // createOrder() we get thanks to associations. It's sequelize method.
//           .then((order) => {
//             // below associates products to that order
//             return order.addProducts(
//               products.map((product) => {
//                 // "orderItem" name comes from OrderItem model name(first arguent in "define")
//                 product.orderItem = { quantity: product.cartItem.quantity };
//                 return product;
//               })
//             );
//           })
//           .catch((err) => console.log(err))
//       );
//     })
//     .then((result) => {
//       // after you create order you clear the cart
//       return fetchedCart.setProducts(null);
//     })
//     .then((result) => {
//       res.redirect("/orders");
//     })
//     .catch((err) => console.log(err));
// };

// exports.getOrders = (req, res, next) => {
//   // getOrders is magic method added by sequelize
//   req.user
//   // below is an example of sequelize eager loading. Works because we have relation between orders and products. You can then use .products in view file for every passed order
//     .getOrders({ include: ["products"] })
//     .then((orders) => {
//       res.render("shop/orders", {
//         pageTitle: "Orders",
//         path: "/orders",
//         orders: orders,
//       });
//     })
//     .catch((err) => console.log(err));
// };
