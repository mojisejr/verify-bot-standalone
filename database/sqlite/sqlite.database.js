const { Sequelize } = require("sequelize");
const path = require("path");
// const basePath = process.cwd();

const sequelize = new Sequelize({
  dialect: "sqlite",
  // storage: path.resolve(__dirname, "db.sqlite"),
  storage: "./db.sqlite",
});

module.exports = sequelize;
