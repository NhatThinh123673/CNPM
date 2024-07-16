const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Customer = require("./Customer");
const Product = require("./Product");

const Review = sequelize.define(
  "Review",
  {
    accountId: {
      type: DataTypes.INTEGER,
      references: {
        model: Customer,
        key: "accountId",
      },
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "productId",
      },
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rates: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "Reviews",
  }
);

module.exports = Review;
