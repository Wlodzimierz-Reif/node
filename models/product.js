const { Sequelize } = require("sequelize");

const sequelize = require("../helpers/database");

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true, // similar to index
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;

// OLD VERSION WITHOUT DATABASE AND SEQUELIZE

// const db = require("../helpers/database");
// const fs = require("fs");

// const Cart = require("./cart");

// // const getProductsFromFile = (cb) => { //on how to get data from file
// //   fs.readFile(p, (err, fileContent) => {
// //     if (err) {
// //       return cb([]);
// //     }
// //     cb(JSON.parse(fileContent)); // turns file contents into an array
// //   });
// // };

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     // returning a promise
//     return db.execute(
//       "INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)", // ? to avoid executing code by inserting executable code in input fields by users. Requires secon argument array with values
//       [this.title, this.price, this.description, this.imageUrl]
//     );
//   }

//   static deleteById(id) {}

//   static fetchAll() {
//     return db.execute("SELECT * FROM products");
//   }

//   static findById(id) {
//      return db.execute("SELECT * FROM products WHERE products.id = ?", [id])
//   }
// };

// // products.js Controller is calling fetchAll with a callback fn that retrieves products and renders the page
// // fetchAll is calling getProductsFromFile with the callback fn that it receives from products.js Controller
// // getProductsFromFile call the callback fn passing in data from file as an argument which transforms into "products" parameter passed in from products.js Controller
