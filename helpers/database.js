const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "Dziach7Dziam", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
