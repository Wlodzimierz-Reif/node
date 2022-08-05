const mongodb = require("mongodb");
const { getDb } = require("../helpers/database");

class Product {
  // id is optional. If undefined mongodb will generate is automatically
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    // need ternery here as mongodb.ObjectId() will create one even if id is undefined
    this._id = id ? mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      console.log("updating");
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
      // $set is a mongoDB thing for updating
    } else {
      console.log("Creating product");
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => {
        // this is Javascript but gets converted to JSON by MongoDB
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    // .find return a cursor which is an object provided by mongoDB that allows us to go through elements
    // do not call find().toArray() with a lot of documents. Implement pagination then
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        // console.log(products);W
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    // next() is an utility function that will get the last document found(mongoDB doesn't know we are only looking for one)
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => {
        console.log("Deleted item");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;

/////////////////// MYSQL STUFF

// const { Sequelize } = require("sequelize");

// const sequelize = require("../helpers/database");

// const Product = sequelize.define("product", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true, // similar to index
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// module.exports = Product;

/////////////////////// OLD VERSION WITHOUT DATABASE AND SEQUELIZE

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
