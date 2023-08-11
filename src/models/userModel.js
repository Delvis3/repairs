const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const User = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
 password:{
   type: DataTypes.STRING(20),
   allowNull: false,
 },  
 role:{
  type: DataTypes.ENUM("client","employee"),
  allowNull: false,
 },
  status: {
    type: DataTypes.ENUM("available", "disabled"),
    allowNull: false,
    defaultValue: "available",
  },
});

module.exports = User;