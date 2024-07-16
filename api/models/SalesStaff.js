const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const SalesStaff = sequelize.define(
  "SalesStaff",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adminState: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "Sales_staff",
  }
);

module.exports = SalesStaff;
