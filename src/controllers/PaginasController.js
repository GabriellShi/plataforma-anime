const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
const path = require("path");


const db = require("../config/sequelize");
const Animes = require("../models/Animes");
const Episodios = require("../models/Episodios");
const Filmes = require("../models/Filmes");
const Lancamento = require("../models/Lancamento");
const Users = require('../models/Users');
const Doramas = require('../models/Doramas');

const { Op } = require("sequelize");

const { Sequelize } = require("../config/sequelize")

const paginasController = {
  listaAnimeUsuario: async (req, res) => {

    try {
      const page = req.query.page || 1; // Página atual, padrão é 1
      const perPage = 20; // Número de animes por página
      const selectedLetter = req.query.letter || 'all'; // Letra selecionada, padrão é 'all'
      const searchQuery = req.query.search || ''; // Termo de pesquisa, padrão é vazio
      const selectedType = req.query.tipo || ''; // Tipo de linguagem selecionada
      const selectedOrder = req.query.ordenacao || 'recentes';
      let selectedGenres = req.query.genero || [];
  
      if (!Array.isArray(selectedGenres)) {
        selectedGenres = [selectedGenres];
      }
  
      let order;
      if (selectedOrder === 'OrdemAlfabetica') {
        order = [['nome', 'ASC']];
      } else {
        order = [['created_at', 'DESC']];
      }
  
      // Calcule o índice de início e fim com base na página atual
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
  
      // Defina uma condição de filtro com base na letra selecionada
      let condition = {};
  
      if (selectedLetter !== 'all') {
        condition.nome = { [Op.like]: `${selectedLetter}%` };
      }
  
      // Adicione uma condição para a pesquisa pelo nome
      if (searchQuery) {
        condition.nome = { [Op.like]: `%${searchQuery}%` };
      }
  
      // Adicione uma condição para o tipo de linguagem selecionada
      if (selectedType) {
        condition.tipo = selectedType;
      }
  
      // Adicione a condição de filtro para o gênero selecionado
      if (selectedGenres.length > 0) {
        condition.genero = { [Op.in]: selectedGenres };
      }
  
      // Busque os animes do banco de dados com base na condição
      const listaAnimeAdmin = await Animes.findAll({
        where: condition,
        order: order,
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
        selectedLetter, // Letra selecionada
        searchQuery, // Termo de pesquisa
        selectedType, // Tipo de linguagem selecionada
        selectedOrder,
        selectedGenres,
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
  

  

  episodiosAdicionados: async (req, res) => {

    try {

      const categoriaSelecionada = req.query.categoria || "recentes";


      let episodios;
  
      if (categoriaSelecionada === "all") {


        episodios = await Episodios.findAll({
          order: [['created_at', 'DESC']]
        });
      } else if (categoriaSelecionada === "recentes") {

        episodios = await Episodios.findAll({
          where: {
            created_at: {
              [Op.gte]: new Date(new Date().getFullYear(), 0, 1),
            },
          },
          order: [['created_at', 'DESC']]
        });
      }
  
      const page = req.query.page || 1; // Página atual, padrão é 1
      const perPage = 20; // Número de filmes por página
  
      // Calcule o índice de início e fim com base na página atual
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
  
      // // Busque todas as notícias do banco de dados
      // const episodios = await Episodios.findAll({
      //   order: [['created_at', 'DESC']]
      // });

      const animesPopulares = await Animes.findAll({
        order: [
            ['likes', 'DESC'], // Ordenar por likes em ordem decrescente
        ],
        limit: 4, // Limitar a 4 resultados
    });

        // Ira ajustar a ordem que não está funcionando no DESC 
      animesPopulares.sort((a, b) => b.likes - a.likes);
  
      function calculatePercentage(anime) {
        const totalLikes = animesPopulares[0].likes; // Suponha que o anime mais votado esteja no topo
        const percentage = (anime.likes / totalLikes) * 100;
        return percentage.toFixed(1); // Arredonde para uma casa decimal
      }

      const episodiosPaginaAtual = episodios.slice(startIndex, endIndex);

        // Calcule o número total de animes, o número total de páginas e a página atual
        const totalEpisodios = episodios.length;
        const totalPages = Math.ceil(totalEpisodios / perPage);

      return res.render("episodiosAdicionados", {
        title: "Lista de Episodios",
        episodios,
        categoriaSelecionada,
        episodios: episodiosPaginaAtual,
        page, // Página atual
        totalPages, // Número total de páginas
        totalEpisodios, // Número total de animes
        animesPopulares: animesPopulares.map((anime, index) => ({
          ...anime.get({ plain: true }),
          percentage: calculatePercentage(anime), // Adicione a porcentagem
        })),
      user: req.cookies.user,

      
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
      const perPage = 20; // Número de animes por página
      const selectedLetter = req.query.letter || 'all'; // Letra selecionada, padrão é 'all'
      const searchQuery = req.query.search || ''; // Termo de pesquisa, padrão é vazio
      const selectedType = req.query.tipo || ''; // Tipo de linguagem selecionada
      const selectedOrder = req.query.ordenacao || 'recentes';
      let selectedGenres = req.query.genero || [];
  
      if (!Array.isArray(selectedGenres)) {
        selectedGenres = [selectedGenres];
      }
  
      let order;
      if (selectedOrder === 'OrdemAlfabetica') {
        order = [['nome', 'ASC']];
      } else {
        order = [['created_at', 'DESC']];
      }
  
      // Calcule o índice de início e fim com base na página atual
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
  
      // Defina uma condição de filtro com base na letra selecionada
      let condition = {};
  
      if (selectedLetter !== 'all') {
        condition.nome = { [Op.like]: `${selectedLetter}%` };
      }
  
      // Adicione uma condição para a pesquisa pelo nome
      if (searchQuery) {
        condition.nome = { [Op.like]: `%${searchQuery}%` };
      }
  
      // Adicione uma condição para o tipo de linguagem selecionada
      if (selectedType) {
        condition.tipo = selectedType;
      }
  
      // Adicione a condição de filtro para o gênero selecionado
      if (selectedGenres.length > 0) {
        condition.genero = { [Op.in]: selectedGenres };
      }
  
      // Busque os animes do banco de dados com base na condição
      const filmes = await Filmes.findAll({
        where: condition,
        order: order,
      });
  
      // Filtrar os animes para a página atual
      const filmesPaginaAtual = filmes.slice(startIndex, endIndex);
  
      // Calcule o número total de animes, o número total de páginas e a página atual
      const totalFilmes = filmes.length;
      const totalPages = Math.ceil(totalFilmes / perPage);

      const animesPopulares = await Animes.findAll({
        order: [
            ['likes', 'DESC'], // Ordenar por likes em ordem decrescente
        ],
        limit: 4, // Limitar a 4 resultados
    });

    // Ira ajustar a ordem que não está funcionando no DESC 
  animesPopulares.sort((a, b) => b.likes - a.likes);
  
      return res.render("filmesAdicionados", {
        title: "Lista de Filmes",
        filmes: filmesPaginaAtual,
        page, // Página atual
        totalPages, // Número total de páginas
        totalFilmes, // Número total de Filmes
        selectedLetter, // Letra selecionada
        searchQuery, // Termo de pesquisa
        selectedType, // Tipo de linguagem selecionada
        selectedOrder,
        selectedGenres,
        animesPopulares,
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


  doramasAdicionados: async (req, res) => {

    try {
      const page = req.query.page || 1; // Página atual, padrão é 1
      const perPage = 20; // Número de animes por página
      const selectedLetter = req.query.letter || 'all'; // Letra selecionada, padrão é 'all'
      const searchQuery = req.query.search || ''; // Termo de pesquisa, padrão é vazio
      const selectedType = req.query.tipo || ''; // Tipo de linguagem selecionada
      const selectedOrder = req.query.ordenacao || 'recentes';
      let selectedGenres = req.query.genero || [];
  
      if (!Array.isArray(selectedGenres)) {
        selectedGenres = [selectedGenres];
      }
  
      let order;
      if (selectedOrder === 'OrdemAlfabetica') {
        order = [['nome', 'ASC']];
      } else {
        order = [['created_at', 'DESC']];
      }
  
      // Calcule o índice de início e fim com base na página atual
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
  
      // Defina uma condição de filtro com base na letra selecionada
      let condition = {};
  
      if (selectedLetter !== 'all') {
        condition.nome = { [Op.like]: `${selectedLetter}%` };
      }
  
      // Adicione uma condição para a pesquisa pelo nome
      if (searchQuery) {
        condition.nome = { [Op.like]: `%${searchQuery}%` };
      }
  
      // Adicione uma condição para o tipo de linguagem selecionada
      if (selectedType) {
        condition.tipo = selectedType;
      }
  
      // Adicione a condição de filtro para o gênero selecionado
      if (selectedGenres.length > 0) {
        condition.genero = { [Op.in]: selectedGenres };
      }
  
      // Busque os animes do banco de dados com base na condição
      const doramas = await Doramas.findAll({
        where: condition,
        order: order,
      });
  
      // Filtrar os animes para a página atual
      const doramasPaginaAtual = doramas.slice(startIndex, endIndex);
  
      // Calcule o número total de animes, o número total de páginas e a página atual
      const totalDoramas = doramas.length;
      const totalPages = Math.ceil(totalDoramas / perPage);

      const animesPopulares = await Animes.findAll({
        order: [
            ['likes', 'DESC'], // Ordenar por likes em ordem decrescente
        ],
        limit: 4, // Limitar a 4 resultados
    });

    // Ira ajustar a ordem que não está funcionando no DESC 
  animesPopulares.sort((a, b) => b.likes - a.likes);
  
      return res.render("doramasAdicionados", {
        title: "Lista de doramas",
        doramas: doramasPaginaAtual,
        page, // Página atual
        totalPages, // Número total de páginas
        totalDoramas, // Número total de Filmes
        selectedLetter, // Letra selecionada
        searchQuery, // Termo de pesquisa
        selectedType, // Tipo de linguagem selecionada
        selectedOrder,
        selectedGenres,
        animesPopulares,
      user: req.cookies.user,

      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar a lista de doramas",
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
      user: req.cookies.user,

    });
  },

  

  paginaGeneroSelecionado: async (req, res) => {

    try {
      const page = req.query.page || 1;
      const perPage = 20;
      const selectedLetter = req.query.letter || 'all';
      const searchQuery = req.query.search || '';
      const selectedType = req.query.tipo || '';
      const selectedOrder = req.query.ordenacao || 'recentes';
      const genero = req.params.genero; // Obtenha o gênero da URL
  
      let order;
      if (selectedOrder === 'OrdemAlfabetica') {
        order = [['nome', 'ASC']];
      } else {
        order = [['created_at', 'DESC']];
      }
  
   
      // Sua lógica de consulta para buscar os animes com o gênero especificado
      const listaAnimeAdmin = await Animes.findAll({
        where: {
          genero: genero, // Filtre pelo gênero da URL
          // Outras condições de filtro aqui (letra, pesquisa, tipo)
        },
        order: order,
      });


      const totallistaAnimeAdmin = listaAnimeAdmin.length;
      const totalPages = Math.ceil(totallistaAnimeAdmin / perPage);
      return res.render("paginaGeneroSelecionado", {
         title: "Generos" ,
         listaAnimeAdmin,
         page,
         totalPages,
         totallistaAnimeAdmin,
         selectedLetter,
      user: req.cookies.user,

        });
  
      // Restante da lógica para paginação e renderização
      // ...
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar a lista de Animes",
      });
    }
  },
  
  
  genero: async (req, res) => {

    
    const animesPopulares = await Animes.findAll({
      order: [
        ['likes', 'DESC'], // Ordenar por likes em ordem decrescente
      ],
      limit: 4, // Limitar a 4 resultados
    });

    animesPopulares.sort((a, b) => b.likes - a.likes);

        // Função para calcular a porcentagem com base nos votos
        function calculatePercentage(anime) {
          const totalLikes = animesPopulares[0].likes; // Suponha que o anime mais votado esteja no topo
          const percentage = (anime.likes / totalLikes) * 100;
          return percentage.toFixed(1); // Arredonde para uma casa decimal
        }
  

    return res.render("genero", { title: "Generos",
    animesPopulares: animesPopulares.map((anime, index) => ({
      ...anime.get({ plain: true }),
      percentage: calculatePercentage(anime), // Adicione a porcentagem
    })),
    user: req.cookies.user,
  });
  },


  contato: async (req, res) => {

    return res.render("contato", { title: "Contato",
    user: req.cookies.user,
  });
  },



  melhorias: async (req, res) => {

    return res.render("melhorias", { title: "Melhorias",
    user: req.cookies.user,
  });
  },




};



module.exports = paginasController;
