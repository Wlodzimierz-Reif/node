const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.set("view engine", "pug"); // tells the app what tempate engine to use
app.set("views", "views"); // tells the app there to find the views (the default already is in 'views' - https://expressjs.com/en/5x/api.html)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // enables read access to external css files

app.use("/admin", adminData.router); // allows to omit "/admin" when setting routes in adminRoutes
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "pageNotFound.html"));
  res.status(404).render("pageNotFound");
});

app.listen(3000);
