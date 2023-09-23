const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
const path = require("path");


const db = require("../config/sequelize");
const Animes = require("../models/Animes");
const Episodios = require("../models/Episodios");
const { Op } = require("sequelize");
const { Sequelize } = require("../config/sequelize")

const paginasController = {

  listaAnimeUsuario: async (req, res) => {
    try {
      // Busque todas as notícias do banco de dados
      const listaAnimeAdmin = await Animes.findAll({
      });


    return res.render("listaAnimeUsuario", {
      title: "Lista de Anime",
      listaAnimeAdmin,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      title: "Erro",
      message: "Ocorreu um erro ao carregar a lista de Animes",
    });
  }
  },


  contato: (req, res) => {
    return res.render("contato", { title: "Contato" });
  },

  recuperarSenha: (req, res) => {
    return res.render("recuperarSenha", { title: "Recuperar Senha" });
  },

  pedidosDeAnimes: (req, res) => {
    return res.render("pedidosDeAnimes", { title: "Pedidos de Novos Animes" });
  },

  melhorias: (req, res) => {
    return res.render("melhorias", { title: "Melhorias" });
  },

  generos: (req, res) => {
    return res.render("generos", { title: "Generos" });
  },

  filmesAdicionados: (req, res) => {
    return res.render("filmesAdicionados", { title: "Filmes Adicionados" });
  },

  areaCliente: (req, res) => {
    return res.render("areaCliente", { title: "Area do Cliente", user: req.cookies.user, });
  },

};



module.exports = paginasController;
