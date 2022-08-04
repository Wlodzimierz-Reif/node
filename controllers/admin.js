const mongodb = require("mongodb");
const Product = require("../models/product");

const ObjectId = mongodb.ObjectId;

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
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const product = new Product(title, price, description, imageUrl);
  product
    .save()
    .then(() => {
      console.log("Created product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        products: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        activeShop: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; // retrieved value is always a string!!!
  if (!editMode) {
    return res.redirect("/"); // could be eirther "return" or wrapping rest in "else"
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId; // in POST request product ID is passed via hidden input (check edit-product.ejs)
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedImageUrl = req.body.imageUrl;

  const product = new Product(
    updatedTitle,
    updatedPrice,
    updatedDescription,
    updatedImageUrl,
    prodId
  );
  // to chain .then()you need to return the previous(it return promise)
  product
    .save()
    .then((result) => {
      console.log("Updated product");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(() => {
      console.log("Destroyed record");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

/////////////// MYSQL STUFF

// exports.getAddProduct = (req, res, next) => {
//   // res.sendFile(path.join(rootDir, "views", "addProduct.html"));
//   res.render("admin/edit-product", {
//     // those are fields I'm passing to the view
//     pageTitle: "Add Product",
//     path: "/admin/add-product", // helps view decide which link is active
//     editing: false,
//   });
// };

// exports.postAddProduct = (req, res, next) => {
//   const title = req.body.title;
//   const imageUrl = req.body.imageUrl;
//   const description = req.body.description;
//   const price = req.body.price;
//   // we can use it because of associations(User has many Products in app.js). Sequelize automaticaly adds method create{nameOfTheModel}.
//   req.user
//     .createProduct({
//       title: title,
//       imageUrl: imageUrl,
//       description: description,
//       price: price,
//     })
//     // Product.create({
//     //   title: title,
//     //   imageUrl: imageUrl,
//     //   description: description,
//     //   price: price,
//     //   userId: req.user.id,
//     // })
//     .then((result) => {
//       console.log("Created product");
//       res.redirect("/admin/products");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit; // retrieved value is always a string!!!
//   if (!editMode) {
//     return res.redirect("/"); // could be eirther "return" or wrapping rest in "else"
//   }
//   const prodId = req.params.productId;
//   // Product.findByPk(prodId)
//   req.user
//     .getProducts({ where: { id: prodId } })
//     .then((product) => {
//       if (!product) {
//         return res.redirect("/");
//       }
//       res.render("admin/edit-product", {
//         pageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: editMode,
//         product: product,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId; // in POST request product ID is passed via hidden input (check edit-product.ejs)
//   const updatedTitle = req.body.title;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDescription = req.body.description;
//   const updatedPrice = req.body.price;
//   Product.findByPk(prodId)
//     .then((product) => {
//       product.title = updatedTitle;
//       product.imageUrl = updatedImageUrl;
//       product.description = updatedDescription;
//       product.price = updatedPrice;
//       return product.save(); // it's sequelize mathod that saves the product to DB. If product doesn't exist it will creat new, if does then will overwrite existing record
//     }) // to chain .then()you need to return the previous(it return promise)
//     .then((result) => {
//       console.log("Updated product");
//       res.redirect("/admin/products");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   // const updatedProduct = new Product( // creates new instance with updated params and saves it. We're passing in prodId so it edits existing product and not adds a new one(see save() method in product.js controller)
//   //   prodId,
//   //   updatedTitle,
//   //   updatedImageUrl,
//   //   updatedDescription,
//   //   updatedPrice
//   // );
//   // updatedProduct.save();
//   res.redirect("/admin/products");
// };

// exports.getProducts = (req, res, next) => {
//   req.user
//     .getProducts()
//     .then((products) => {
//       res.render("admin/products", {
//         products: products,
//         pageTitle: "Admin Products",
//         path: "/admin/products",
//         activeShop: true,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findByPk(prodId)
//     .then((product) => {
//       return product.destroy();
//     })
//     .then((result) => {
//       console.log("Destroyed record");
//       res.redirect("/admin/products");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
