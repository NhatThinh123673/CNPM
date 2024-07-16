const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Customer = require("./Customer");
const TypePayment = require("./TypePayment");

const Orders = sequelize.define(
  "Orders",
  {
    orderId: {
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
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    codeCoupon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    typePaymentId: {
      type: DataTypes.INTEGER,
      references: {
        model: TypePayment,
        key: "typePaymentId",
      },
    },
  },
  {
    timestamps: false,
    tableName: "Orders",
  }
);

module.exports = Orders;
