const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
const path = require("path");

const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const Animes = require("../models/Animes");
const Filmes = require("../models/Filmes");

const searchController = {
  search: async (req, res) => {

    const termoPesquisa = req.body.searchQuery; // Alterado para req.body

    try {
      const listaAnimeAdmin = await Animes.findAll({
        where: {
          [Sequelize.Op.or]: [
            {
                nome: {
                [Sequelize.Op.like]: `%${termoPesquisa}%`,
              },
            },
          ],
        },
      });

      const filmes = await Filmes.findAll({
        where: {
          [Sequelize.Op.or]: [
            {
              nome: {
                [Sequelize.Op.like]: `%${termoPesquisa}%`,
              },
            },
          ],
        },
      });

      res.render("search", {
        title: "Resultado Pesquisa - ",
        listaAnimeAdmin,
        filmes,
        termoPesquisa,
      user: req.cookies.user,

      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro ao buscar dados no banco de dados");
    }
  },
};

module.exports = searchController;
