const Animes = require("./Animes"); // Importe o modelo Animes
const Users = require("./Users"); // Importe o modelo Animes
const Doramas = require("./Doramas"); // Importe o modelo Animes
const Filmes = require("./Filmes"); // Importe o modelo Animes

const db = require("../config/sequelize");
const Sequelize = require("sequelize");

const Favoritos = db.define(
  "Favoritos",
  {
    id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      animes_id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      },
  
      users_id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      },
    created_at: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "favoritos",
    timestamps: false,
  }
);

module.exports = Favoritos;


Favoritos.belongsTo(Animes, { foreignKey: "animes_id" });
Favoritos.belongsTo(Users, { foreignKey: "users_id" });
Favoritos.belongsTo(Doramas, { foreignKey: "doramas_id" });
Favoritos.belongsTo(Filmes, { foreignKey: "filmes_id" });