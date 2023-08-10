const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "angie",
  database: "academlomotors",
  port: 5432,
  logging: false,
});

module.exports = { db };