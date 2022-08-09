const mongodb = require("mongodb");
const { getDb } = require("../helpers/database");

const ObjectId = mongodb.ObjectId;
class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart; // cart: {items: []}
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbOp;
    console.log("Creating user");
    dbOp = db.collection("users").insertOne(this);
    // }
    return dbOp
      .then((result) => {
        // this is Javascript but gets converted to JSON by MongoDB
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      // can't use "==" in here as both productId and _id are mongodb objects and I can't compare objects
      // console.log("cp " + typeof cp.productId);
      // console.log("prod" + typeof product._id);
      return cp.productId.toString() == product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    // if it has such product already update it's quantity. Else add it
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne({ _id: ObjectId(this._id) }, { $set: { cart: updatedCart } })
      .then()
      .catch((err) => {
        console.log(err);
      });
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((i) => i.productId);
    return db
      .collection("products")
      .find({ _id: { $in: productIds } }) // mongodb query to find all products with all ids from productIds array
      .toArray() // It returns a cursor with all the items
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }).quantity,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteItemFromCart(productId) {
    const db = getDb();
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    });
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      )
      .then()
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(userId) {
    const db = getDb();
    // no need to use next(0 afeter findOne() as it returns element not "cursor"
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;

///////////////////// MYSQL

// const Sequelize = require("sequelize");

// const sequelize = require("../helpers/database");

// const User = sequelize.define("user", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING,
// });

// module.exports = User;
