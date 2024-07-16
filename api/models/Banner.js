// models/Banner.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Banner = sequelize.define(
  "Banner",
  {
    bannerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "Banner",
  }
);

module.exports = Banner;
