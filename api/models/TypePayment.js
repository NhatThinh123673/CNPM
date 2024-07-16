const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const TypePayment = sequelize.define(
  "TypePayment",
  {
    typePaymentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "Type_payments",
  }
);

module.exports = TypePayment;
