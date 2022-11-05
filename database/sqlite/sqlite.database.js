const { Sequelize } = require("sequelize");
const path = require("path");
// const basePath = process.cwd();

const sequelize = new Sequelize("game-state-db", "user", "pass", {
  dialect: "sqlite",
  storage: path.resolve(__dirname, "db.sqlite"),
  logging: false,
});

module.exports = sequelize;
