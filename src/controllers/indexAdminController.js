const Animes = require("../models/Animes");
const Episodios = require("../models/Episodios");
const Filmes = require("../models/Filmes");
const Pedidos = require("../models/Pedidos");
const Doramas = require("../models/Doramas");


const indexAdminController = {
  // Pode retornar uma página ou não
  indexAdmin:async(req, res) => {
    return res.render("indexAdmin", {
      title: "Pagina do Anime", //user: req.cookies.user,
    });
  },


paginasCreate: async(req, res) => {
  return res.render("paginasCreate", {
    title: "Pagina Creater", //user: req.cookies.user,
  });
},

paginasViews: async(req, res) => {
  return res.render("paginasViews", {
    title: "Pagina Views", //user: req.cookies.user,
  });
},

paginasComentarios: async(req, res) => {

  const pedidos = await Pedidos.findAll({
    order: [['created_at', 'DESC']]
  });

  return res.render("paginasComentarios", {
    title: "Pagina Views", //user: req.cookies.user,
    pedidos,
  });
},

adicionarEpAnimesLista: async(req, res) => {
  try {
    const page = req.query.page || 1; // Página atual, padrão é 1
    const perPage = 20; // Número de animes por página
    const searchQuery = req.query.search || ''; // Termo de pesquisa, padrão é vazio

    let condition = {};


      // Calcule o índice de início e fim com base na página atual
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;

      if (searchQuery) {
        condition.nome = { [Op.like]: `%${searchQuery}%` };
      }

      const listaAnimeAdmin = await Animes.findAll({
        order: [['created_at', 'DESC']]

      });
    const listaAnimeAdminPaginaAtual = listaAnimeAdmin.slice(startIndex, endIndex);

 // Calcule o número total de animes, o número total de páginas e a página atual
 const totalAnimes = listaAnimeAdmin.length;
 const totalPages = Math.ceil(totalAnimes / perPage);


  return res.render("adicionarEpAnimesLista", {
    title: "Pagina Episodiso Lista",
    listaAnimeAdmin: listaAnimeAdminPaginaAtual,
    page, // Página atual
    totalPages,
    totalAnimes,
    searchQuery,

   });
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      title: "Erro",
      message: "Ocorreu um erro ao carregar a lista de Animes",
    });
  }

},


adicionarEpFilmesLista: async(req, res) => {
  try {
    const page = req.query.page || 1; // Página atual, padrão é 1
    const perPage = 20; // Número de animes por página
    const searchQuery = req.query.search || ''; // Termo de pesquisa, padrão é vazio

    let condition = {};


      // Calcule o índice de início e fim com base na página atual
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;

      if (searchQuery) {
        condition.nome = { [Op.like]: `%${searchQuery}%` };
      }

      const filmes = await Filmes.findAll({
        order: [['created_at', 'DESC']]

      });
    const filmesPaginaAtual = filmes.slice(startIndex, endIndex);

 // Calcule o número total de animes, o número total de páginas e a página atual
 const totalFilmes = filmes.length;
 const totalPages = Math.ceil(totalFilmes / perPage);


  return res.render("adicionarEpFilmesLista", {
    title: "Pagina Episodiso Lista",
    filmes: filmesPaginaAtual,
    page, // Página atual
    totalPages,
    totalFilmes,
    searchQuery,

   });
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      title: "Erro",
      message: "Ocorreu um erro ao carregar a lista de Animes",
    });
  }

},


adicionarEpDoramasLista: async(req, res) => {
  try {
    const page = req.query.page || 1; // Página atual, padrão é 1
    const perPage = 20; // Número de animes por página
    const searchQuery = req.query.search || ''; // Termo de pesquisa, padrão é vazio

    let condition = {};


      // Calcule o índice de início e fim com base na página atual
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;

      if (searchQuery) {
        condition.nome = { [Op.like]: `%${searchQuery}%` };
      }

      const doramas = await Doramas.findAll({
        order: [['created_at', 'DESC']]

      });
    const doramasPaginaAtual = doramas.slice(startIndex, endIndex);

 // Calcule o número total de animes, o número total de páginas e a página atual
 const totalDoramas = doramas.length;
 const totalPages = Math.ceil(totalDoramas / perPage);


  return res.render("adicionarEpDoramasLista", {
    title: "Pagina Episodiso Lista",
    doramas: doramasPaginaAtual,
    page, // Página atual
    totalPages,
    totalDoramas,
    searchQuery,

   });
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      title: "Erro",
      message: "Ocorreu um erro ao carregar a lista de doramas",
    });
  }

},

};
module.exports = indexAdminController;
