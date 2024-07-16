const mysql = require("mysql");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("fastapi", "root", "password", {
  host: "localhost",
  dialect: "mysql",
  database: "fastapi",
  // Other options
});

module.exports = sequelize;
