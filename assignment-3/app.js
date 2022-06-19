const express = require("express");

const path = require("path");

const app = express();
const bodyParser = require("body-parser");

const routesOne = require("./routes/one");
const routesTwo = require("./routes/two");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/shop", routesTwo);
app.use(routesOne);

app.use(express.static(path.join(__dirname, "public")));
app.listen(3000);
