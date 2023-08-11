const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Repair = db.define("repairs", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pendding', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'pendding',
  },
  motorsNumber:{
    type: DataTypes.INTEGER,
    allowNull:false,
  },
  description:{
  type: DataTypes.TEXT,
  allowNull:false,
  },
  UserId:{
   type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Repair;