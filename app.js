const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { getPageNotFound } = require("./controllers/404");

const { mongoConnect } = require("./helpers/database");
const User = require("./models/user");

const app = express();

// SETS UP THE VIEWS ENGINE AND FOLDER
app.set("view engine", "ejs"); // tells the app what tempate engine to use. "hbs" tell the app which file extension to use(could be anything)
app.set("views", "views"); // tells the app there to find the views (the default already is in 'views' - https://expressjs.com/en/5x/api.html)

// REGISTERED MIDDLEWARE.
// All of that will be used only if we run succesfully sequeize initialisation
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // enables read access to external css files and omiting "../../../public/css..." when importing the stylesheet in html head

app.use((req, res, next) => {
  User.findById("63103d2300a49b7e27cb2d59") // now it's mongoose method
    .then((user) => {
      // that instead of req.user = user gives me class of User that I can use all User methods on instead of just data
      // req.user = new User(user.name, user.email, user.cart, user._id); // now we can use the fetched user in our app
      req.user = user; // it's Mongoose way to use "User" model
      next(); // otherwise we get stuck
    })
    .catch((err) => {
      console.log(err);
    });
});

// REGISTERS ROUTES (Middleware)
app.use("/admin", adminRoutes); // allows to omit "/admin" when setting routes in adminRoutes
app.use(shopRoutes);
app.use(getPageNotFound);

// mongoConnect(() => {
//   app.listen(3000);
// });
mongoose
  .connect(
    "mongodb+srv://wlodev:wlodev@cluster0.nrwbdc3.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    User.findOne().then((user) => {
      // findOne without params returns first found
      if (!user) {
        const user = new User({
          name: "wlodev",
          email: "wlodev@maxx.com",
          cart: {
            items: [],
          },
        });
        user.save(); // mongoose method
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

///////// SQL STUFF

// const sequelize = require("./helpers/database");
// const Product = require("./models/product");
// const User = require("./models/user");
// const Cart = require("./models/cart");
// const CartItem = require("./models/cart-item");
// const Order = require("./models/order");
// const OrderItem = require("./models/order-item");

// // SETS TABLE RELATIONS
// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); // this relates the DB tables. second argument is a config
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User); // optional. Inversion of UserhasOne(Cart)
// Cart.belongsToMany(Product, { through: CartItem }); // through sets intermettiary table that holds the connection
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

// // RUNS AT THE BEGINNING OF THE APPLICATION NOT ONLY WHEN REQUEST COMES IN.
// sequelize
//   // .sync({ force: true }) // overwrites you table(drops all existing and replaces them). TO be used in production only to reflect the changes in ode
//   .sync()
//   // sync() creates a table in DB using defined model
//   .then((result) => {
//     return User.findByPk(1); // dummy code to find if I have user or whether I need to create one
//     // console.log(result);
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({ name: "Vlodev", email: "dummy@email.com" });
//     }
//     // return Promise.resolve(user); // it automaticly resolves to user. We need to return promise to chain .then and "user" is not a promise. But it's not necessary as everything returned in .then is automaticly wrapped in promise
//     return user;
//   })
//   .then((user) => {
//     user.getCart().then((cart) => {
//       if (!cart) {
//         // we can call createCart() on user thanks to sequelize associations. We can use get, set, add, add(for multiple items instead of addCart use addCarts), remove(for one, for many add "s"), has(one and many), count and create on associated models
//         return user.createCart();
//       } else {
//         return cart;
//       }
//     });
//   })
//   .then((cart) => {
//     app.listen(3000);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
