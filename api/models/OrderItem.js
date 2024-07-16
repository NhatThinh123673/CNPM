// models/OrderItem.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Orders = require("./Orders");
const Product = require("./Product");

const OrderItem = sequelize.define(
  "OrderItem",
  {
    orderItemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: Orders,
        key: "orderId",
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
  },
  {
    timestamps: false,
    tableName: "OrderItem",
  }
);

module.exports = OrderItem;
