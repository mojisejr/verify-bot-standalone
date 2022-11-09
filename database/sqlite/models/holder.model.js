const { Model, DataTypes } = require("sequelize");
const sequelize = require("../sqlite.database");

class Holder extends Model {}

Holder.init(
  {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
    },
    discordId: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    discordName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastbalance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "holder",
  }
);

module.exports = Holder;
