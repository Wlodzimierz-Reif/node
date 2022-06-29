const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
// const { create } = require("express-handlebars");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();
// const hbs = create({
//   layoutsDir: "views/handlebars/layouts",
//   defaultLayout: "main",
//   extname: "hbs", // that allows to use .hbs extension in main layout. Otherwise it'll look for .handlebars file
// }); // config for handlebars

// app.engine("hbs", hbs.engine); // not needed with pu
app.set("view engine", "ejs"); // tells the app what tempate engine to use. "hbs" tell the app which file extension to use(could be anything)
app.set("views", "views/ejs"); // tells the app there to find the views (the default already is in 'views' - https://expressjs.com/en/5x/api.html)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // enables read access to external css files and omiting "../../../public/css..." when importing the stylesheet in html head

app.use("/admin", adminData.router); // allows to omit "/admin" when setting routes in adminRoutes
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "" });
});

app.listen(3000);
