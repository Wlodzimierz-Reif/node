const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")

const usersRoutes = require("./routes/users")
const addUserRoutes = require("./routes/addUser")

const app = express();

app.set("view engine", "ejs");
app.set("views", "views")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // enables read access to external css files and omiting "../../../public/css..." when importing the stylesheet in html head

app.use(addUserRoutes.router)
app.use(usersRoutes)

app.use((req, res, next) => {
    res.status(404).render("404", { pageTitle: "Page Not Found", path: "" });
  });

app.listen(3000)