const db = require("../config/sequelize");
const Sequelize = require("sequelize");


const Users = db.define(
  "Users",
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
    nomedeuser: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },
    senha: {
      type: Sequelize.DataTypes.STRING(100),
      allowNull: false,
    },

    token: {
      type: Sequelize.DataTypes.STRING(200),
      allowNull: false,
    },


    image_filename: {
      type: Sequelize.DataTypes.STRING(500),
      allowNull: true,
    },
    
    is_active: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        defaultValue: 1,
    },
    is_admin: {
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
    },

    created_at: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW, // Define o valor padrão como a data e hora atual
    },

  },

  {
    tableName: "users", // Defina o nome da tabela aqui
    timestamps: false, // Isso desativará as colunas de timestamps
  },

);

module.exports = Users;
