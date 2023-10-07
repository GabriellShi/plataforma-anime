const db = require("../config/sequelize");
const Sequelize = require("sequelize");


const Pedidos = db.define(
  "Pedidos",
  {
    id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    usuario: {
      type: Sequelize.DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
    anime: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
    comentario: {
      type: Sequelize.DataTypes.STRING(500),
      allowNull: false,

    },

    created_at: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW, // Define o valor padrão como a data e hora atual
    },

  },

  {
    tableName: "pedidos", // Defina o nome da tabela aqui
    timestamps: false, // Isso desativará as colunas de timestamps
  },

);

module.exports = Pedidos;
