const generosController = {
  // Pode retornar uma página ou não
  generos: (req, res) => {
    return res.render("generos", {
      title: "Pagina do Anime", //user: req.cookies.user,
    });
  },
};

module.exports = generosController;
