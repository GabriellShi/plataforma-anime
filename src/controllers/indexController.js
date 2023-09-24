const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
const path = require("path");

const db = require("../config/sequelize");
const Animes = require("../models/Animes");
const Episodios = require("../models/Episodios");
const Filmes = require("../models/Filmes");
const { Op } = require("sequelize");
const { Sequelize } = require("../config/sequelize")



const indexController = {
  // Pode retornar uma página ou não
  index: async (req, res) => {
    try {
      // Busque todas as notícias do banco de dados
      const listaAnimeAdmin = await Animes.findAll({
        order: [['created_at', 'DESC']]
      });

      const episodios = await Episodios.findAll({
        order: [['created_at', 'DESC']]
      });

      const filmes = await Filmes.findAll({
        order: [['created_at', 'DESC']]
      });

// Função para dividir um array em grupos de tamanho especificado
function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks; // Adicione esta linha para retornar o array de grupos
}

      
    return res.render("index", {
      title: "plataforma de animes",
      listaAnimeAdmin,
      episodios,
      filmes,
      chunkArray,
      user: req.cookies.user,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      title: "Erro",
      message: "Ocorreu um erro ao carregar a lista de Animes",
    });
  }

  },


  
};


module.exports = indexController;
