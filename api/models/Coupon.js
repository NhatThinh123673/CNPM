// models/Coupon.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Coupon = sequelize.define(
  "Coupon",
  {
    couponId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "Coupon",
  }
);

module.exports = Coupon;
