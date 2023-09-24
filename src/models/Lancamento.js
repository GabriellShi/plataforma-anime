const db = require("../config/sequelize");
const Sequelize = require("sequelize");


const Lancamento = db.define(
  "Lancamento",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: Sequelize.DataTypes.STRING(150),
      allowNull: false,
    },
    horario: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
    dia: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },

    streaming: {
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
    tableName: "lancamento", // Defina o nome da tabela aqui
    timestamps: false, // Isso desativará as colunas de timestamps
  },

);

module.exports = Lancamento;
