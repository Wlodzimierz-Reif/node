// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://wlodev:test@cluster0.nrwbdc3.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// ABOVE mondodb boilerplate from their website

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://wlodev:wlodev@cluster0.nrwbdc3.mongodb.net/shop?retryWrites=true&w=majority"
  )
    // in uri I've added "shop" so it connects to it
    .then((client) => {
      console.log("Connected");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("node-complete", "root", "Dziach7Dziam", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;
