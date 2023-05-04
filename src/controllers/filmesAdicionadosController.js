const filmesAdicionadosController = {
  // Pode retornar uma página ou não
  filmesAdicionados: (req, res) => {
    return res.render("filmesAdicionados", {
      title: "Pagina do Anime", //user: req.cookies.user,
    });
  },
};

module.exports = filmesAdicionadosController;
