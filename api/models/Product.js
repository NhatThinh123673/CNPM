// models/Product.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Category = require("./Category");

const Product = sequelize.define(
  "Product",
  {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    des: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cateId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "cateId",
      },
    },
  },
  {
    timestamps: false,
    tableName: "Product",
  }
);

module.exports = Product;
