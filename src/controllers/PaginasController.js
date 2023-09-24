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

  episodiosAdicionados: async (req, res) => {

    try {
      // Busque todas as notícias do banco de dados
      const episodios = await Episodios.findAll({
        order: [['created_at', 'DESC']]
      });
  
      return res.render("episodiosAdicionados", {
        title: "Lista de Episodios",
        episodios,
      
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar a Lista Episodios",
      });
    }
  },


  
  filmesAdicionados: async (req, res) => {

    try {
      // Busque todas as notícias do banco de dados
      const filmes = await Filmes.findAll({
        order: [['created_at', 'DESC']]
      });

      return res.render("filmesAdicionados", {
        title: "Filmes Adicionados",
        filmes,
      
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar a Lista Filmes",
      });
    }
  },

  contato: async (req, res) => {
    return res.render("contato", { title: "Contato" });
  },

  recuperarSenha: async (req, res) => {
    return res.render("recuperarSenha", { title: "Recuperar Senha" });
  },

  pedidosDeAnimes: async (req, res) => {
    return res.render("pedidosDeAnimes", { title: "Pedidos de Novos Animes" });
  },

  melhorias: async (req, res) => {
    return res.render("melhorias", { title: "Melhorias" });
  },

  generos: async (req, res) => {
    return res.render("generos", { title: "Generos" });
  },


  areaCliente: async (req, res) => {
    return res.render("areaCliente", { title: "Area do Cliente", user: req.cookies.user, });
  },

};



module.exports = paginasController;
