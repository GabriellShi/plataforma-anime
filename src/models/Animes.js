const db = require("../config/sequelize");
const Sequelize = require("sequelize");


const Animes = db.define(
  "Animes",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    nome: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
    autor: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
    estudio: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
    sinopse: {
        type: Sequelize.DataTypes.TEXT(1000),
        allowNull: false,
      },
      genero: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
      capa: {
      type: Sequelize.DataTypes.STRING(500),
      allowNull: false,
    },
    tipo: {
      type: Sequelize.DataTypes.TEXT(1000),
      allowNull: false,
    },
    status: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },

    likes: {
      type: Sequelize.DataTypes.STRING(900),
      allowNull: false,
    },

    dislikes: {
      type: Sequelize.DataTypes.STRING(900),
      allowNull: false,
    },


    created_at: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW, // Define o valor padrão como a data e hora atual
    },

  },

  {
    tableName: "animes", // Defina o nome da tabela aqui
    timestamps: false, // Isso desativará as colunas de timestamps
  },

);

module.exports = Animes;
