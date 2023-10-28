const Doramas = require("./Doramas"); // Importe o modelo Animes

const db = require("../config/sequelize");
const Sequelize = require("sequelize");

const Comentariosdoramas = db.define(
  "Comentariosdoramas",
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
    created_at: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    tableName: "comentariosdoramas",
    timestamps: false,
  }
);

module.exports = Comentariosdoramas;


Comentariosdoramas.belongsTo(Doramas, { foreignKey: "doramas_id" });