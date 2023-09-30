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

    animes_id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
    },

    filmes_id: {
      type: Sequelize.DataTypes.INTEGER.UNSIGNED,
    },

    numero_episodio: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },

    video_url: {
      type: Sequelize.DataTypes.STRING(500),
      allowNull: false,
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
      defaultValue: Sequelize.NOW,
    },

  },
  {
    tableName: "episodios",
    timestamps: false,
  }

  
);



module.exports = Episodios;
