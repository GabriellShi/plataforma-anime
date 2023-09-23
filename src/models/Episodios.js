const db = require("../config/sequelize");
const Sequelize = require("sequelize");


const Episodios = db.define(
  "Episodios",
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
    data: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
      image: {
      type: Sequelize.DataTypes.STRING(500),
      allowNull: false,
    },


    created_at: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW, // Define o valor padrão como a data e hora atual
    },

  },

  {
    tableName: "episodios", // Defina o nome da tabela aqui
    timestamps: false, // Isso desativará as colunas de timestamps
  },

);

module.exports = Episodios;
