const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Customer = require("./Customer");
const Product = require("./Product");

const CartItem = sequelize.define(
  "CartItem",
  {
    cartItemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    accountId: {
      type: DataTypes.INTEGER,
      references: {
        model: Customer,
        key: "accountId",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "productId",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "CartItem",
  }
);

module.exports = CartItem;
