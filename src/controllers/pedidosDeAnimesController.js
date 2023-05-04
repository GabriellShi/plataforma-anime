const pedidosDeAnimesController = {
  // Pode retornar uma página ou não
  pedidosDeAnimes: (req, res) => {
    return res.render("pedidosDeAnimes", {
      title: "Pagina do Anime", //user: req.cookies.user,
    });
  },
};

module.exports = pedidosDeAnimesController;
