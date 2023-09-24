const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
const path = require("path");


const db = require("../config/sequelize");
const Animes = require("../models/Animes");
const Episodios = require("../models/Episodios");
const Filmes = require("../models/Filmes");
const Lancamento = require("../models/Lancamento");
const { Op } = require("sequelize");
const { Sequelize } = require("../config/sequelize")

const paginasController = {

  listaAnimeUsuario: async (req, res) => {
    try {
      const page = req.query.page || 1; // Página atual, padrão é 1
      const perPage = 20; // Número de animes por página
  
      // Calcule o índice de início e fim com base na página atual
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
  
      // Busque todos os animes do banco de dados
      const listaAnimeAdmin = await Animes.findAll({
        order: [['created_at', 'DESC']]
      });
  
      // Filtrar os animes para a página atual
      const listaAnimeAdminPaginaAtual = listaAnimeAdmin.slice(startIndex, endIndex);
  
      // Calcule o número total de animes, o número total de páginas e a página atual
      const totalAnimes = listaAnimeAdmin.length;
      const totalPages = Math.ceil(totalAnimes / perPage);
  
      return res.render("listaAnimeUsuario", {
        title: "Lista de Anime",
        listaAnimeAdmin: listaAnimeAdminPaginaAtual,
        page, // Página atual
        totalPages, // Número total de páginas
        totalAnimes, // Número total de animes
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

      const page = req.query.page || 1; // Página atual, padrão é 1
      const perPage = 20; // Número de filmes por página
  
      // Calcule o índice de início e fim com base na página atual
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
  
      // Busque todas as notícias do banco de dados
      const episodios = await Episodios.findAll({
        order: [['created_at', 'DESC']]
      });

      const episodiosPaginaAtual = episodios.slice(startIndex, endIndex);

        // Calcule o número total de animes, o número total de páginas e a página atual
        const totalEpisodios = episodios.length;
        const totalPages = Math.ceil(totalEpisodios / perPage);

      return res.render("episodiosAdicionados", {
        title: "Lista de Episodios",
        episodios,
        episodios: episodiosPaginaAtual,
        page, // Página atual
        totalPages, // Número total de páginas
        totalEpisodios, // Número total de animes
      
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
      const page = req.query.page || 1; // Página atual, padrão é 1
      const perPage = 20; // Número de filmes por página
  
      // Calcule o índice de início e fim com base na página atual
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
  
      // Busque todos os filmes do banco de dados
      const filmes = await Filmes.findAll({
        order: [['created_at', 'DESC']],
      });
  
      // Filtrar os filmes para a página atual
      const filmesPaginaAtual = filmes.slice(startIndex, endIndex);

          // Calcule o número total de animes, o número total de páginas e a página atual
          const totalFilmes = filmes.length;
          const totalPages = Math.ceil(totalFilmes / perPage);
  
      return res.render("filmesAdicionados", {
        title: "Filmes Adicionados",
        filmes: filmesPaginaAtual,
        page, // Página atual
        totalPages, // Número total de páginas
        totalFilmes, // Número total de animes
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar a Lista de Filmes",
      });
    }
  },
  

  calendarioAnimes: async (req, res) => {
    const lancamento = await Lancamento.findAll({
      order: [['created_at', 'DESC']]

    });

    return res.render("calendarioAnimes", {
      title: "Calendario - Go Geek" ,
      lancamento, 
    });
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
