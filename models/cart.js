

///////////////////// MYSQL

// const Sequelize = require("sequelize");
// const sequelize = require("../helpers/database");

// const Cart = sequelize.define("cart", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
// });

// module.exports = Cart;

////////////////////// JSON

// const fs = require("fs");
// const path = require("path");

// const rootDir = require("../helpers/path");
// const p = path.join(rootDir, "data", "cart.json");

// module.exports = class Cart {
//   static addProduct(id, productPrice) {
//     fs.readFile(p, (err, fileContent) => {
//       let cart = { products: [], totalPrice: 0 };
//       if (!err) {
//         cart = JSON.parse(fileContent);
//       }
//       const existingProductIndex = cart.products.findIndex(
//         (prod) => prod.id === id
//       );
//       const existingProduct = cart.products[existingProductIndex];
//       let updatedProduct;
//       if (existingProduct) {
//         updatedProduct = { ...existingProduct };
//         updatedProduct.qty = updatedProduct.qty + 1;
//         cart.products = [...cart.products];
//         cart.products[existingProductIndex] = updatedProduct;
//       } else {
//         updatedProduct = { id: id, qty: 1 };
//         cart.products = [...cart.products, updatedProduct];
//       }
//       cart.totalPrice = cart.totalPrice + +productPrice; // "+"productPrice changes it to typeof number instead of string
//       fs.writeFile(p, JSON.stringify(cart), (err) => {
//         console.log(err);
//       });
//     });
//   }

//   static deleteProduct(id, productPrice) {
//     fs.readFile(p, (err, fileContent) => {
//       if (err) {
//         console.log(err);
//         return;
//       } else {
//         const updatedCart = { ...JSON.parse(fileContent) };
//         const product = updatedCart.products.find(
//           (product) => product.id === id
//         );
//         if (!product) {
//           return;
//         }
//         const productQty = product.qty;
//         updatedCart.products = updatedCart.products.filter(
//           (product) => product.id !== id
//         );
//         console.log(product.price, product.qty);
//         updatedCart.totalPrice -= productPrice * productQty;
//         fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
//           console.log(err);
//         });
//       }
//     });
//   }

//   static getCart(cb) {
//     fs.readFile(p, (err, fileContent) => {
//       const cart = JSON.parse(fileContent);
//       if (err) {
//         cb(null);
//       } else {
//         cb(cart);
//       }
//     });
//   }
// };
