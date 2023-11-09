const Episodios = require("./Episodios"); // Importe o modelo Animes

const db = require("../config/sequelize");
const Sequelize = require("sequelize");

const Comentariosepisodios = db.define(
  "Comentariosepisodios",
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
    tableName: "comentariosepisodios",
    timestamps: false,
  }
);

module.exports = Comentariosepisodios;


Comentariosepisodios.belongsTo(Episodios, { foreignKey: "episodios_id" });