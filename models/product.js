const fs = require("fs");
const path = require("path");

const rootDir = require("../helpers/path");
const p = path.join(rootDir, "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent)); // turns file contents into an array
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      console.log(this.id);
      // I need to use arrow function otherwise "this" in line looses it's content
      // using the same function but passing other as a callback
      if (this.id) {
        // updates the product if already exists
        const existingProductIndex = products.findIndex(
          (product) => product.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log("Error: " + err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log("Error: " + err);
        });
      }
    });
  }

  static fetchAll(cb) {
    // static means you can call this directly on the class and not only on object instanciated using this class
    getProductsFromFile(cb);
    // passing in a callback function that executes when fetchAll is called in products.js Controller that renders the page
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};

// products.js Controller is calling fetchAll with a callback fn that retrieves products and renders the page
// fetchAll is calling getProductsFromFile with the callback fn that it receives from products.js Controller
// getProductsFromFile call the callback fn passing in data from file as an argument which transforms into "products" parameter passed in from products.js Controller
