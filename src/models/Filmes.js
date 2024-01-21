const db = require("../config/sequelize");
const Sequelize = require("sequelize");


const Filmes = db.define(
  "Filmes",
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

    categoria: {
      type: Sequelize.DataTypes.TEXT(100),
      allowNull: false,
    },

    likes: {
      type: Sequelize.DataTypes.STRING(900),
    },

    dislikes: {
      type: Sequelize.DataTypes.STRING(900),
    },

    created_at: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW, // Define o valor padrão como a data e hora atual
    },

  },

  {
    tableName: "filmes", // Defina o nome da tabela aqui
    timestamps: false, // Isso desativará as colunas de timestamps
  },

);

module.exports = Filmes;
