const Filmes = require("./Filmes"); // Importe o modelo Animes

const db = require("../config/sequelize");
const Sequelize = require("sequelize");

const Comentariosfilmes = db.define(
  "Comentariosfilmes",
  {
    id: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
    usuario: {
      type: Sequelize.DataTypes.STRING, // Correção aqui
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING, // Correção aqui
      allowNull: false,
    },
    comentario: {
      type: Sequelize.DataTypes.TEXT, // Correção aqui
      allowNull: false,
    },

    filmes_id: {
      type: Sequelize.DataTypes.TEXT, // Correção aqui
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "comentariosfilmes",
    timestamps: false,
  }
);

module.exports = Comentariosfilmes;


Comentariosfilmes.belongsTo(Filmes, { foreignKey: "filmes_id" });