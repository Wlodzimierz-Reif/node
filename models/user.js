const mongodb = require("mongodb");
const { getDb } = require("../helpers/database");

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  save() {
    const db = getDb();
    let dbOp;
    // if (this._id) {
    //   console.log("updating");
    //   dbOp = db
    //     .collection("users")
    //     .updateOne({ _id: this._id }, { $set: this });
    //   // $set is a mongoDB thing for updating
    // } else {
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

  static findById(userId) {
    const db = getDb();
    // no need to use next(0 afeter findOne() as it returns element not "cursor"
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) })
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
