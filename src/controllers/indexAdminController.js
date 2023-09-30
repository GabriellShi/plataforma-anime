const Animes = require("../models/Animes");
const Episodios = require("../models/Episodios");
const Filmes = require("../models/Filmes");


const indexAdminController = {
  // Pode retornar uma página ou não
  indexAdmin: (req, res) => {
    return res.render("indexAdmin", {
      title: "Pagina do Anime", //user: req.cookies.user,
    });
  },


paginasCreate: (req, res) => {
  return res.render("paginasCreate", {
    title: "Pagina Creater", //user: req.cookies.user,
  });
},

paginasViews: (req, res) => {
  return res.render("paginasViews", {
    title: "Pagina Views", //user: req.cookies.user,
  });
},

adicionarEpisodiosLista: async(req, res) => {
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


  return res.render("adicionarEpisodiosLista", {
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


adicionarFilmesLista: async(req, res) => {
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


  return res.render("adicionarFilmesLista", {
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


};
module.exports = indexAdminController;
