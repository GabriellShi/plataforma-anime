const Animes = require("./Animes"); // Importe o modelo Animes

const db = require("../config/sequelize");
const Sequelize = require("sequelize");

const Comentariosanimes = db.define(
  "Comentariosanimes",
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

    likescomentarios: {
      type: Sequelize.DataTypes.STRING(900),
    },

    dislikescomentarios: {
      type: Sequelize.DataTypes.STRING(900),
    },
    
    created_at: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "comentariosanimes",
    timestamps: false,
  }
);

module.exports = Comentariosanimes;


Comentariosanimes.belongsTo(Animes, { foreignKey: "animes_id" });