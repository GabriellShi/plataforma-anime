const recuperarSenhaController = {
  // Pode retornar uma página ou não
  recuperarSenha: (req, res) => {
    return res.render("recuperarSenha", {
      title: "Pagina do Anime", //user: req.cookies.user,
    });
  },
};

module.exports = recuperarSenhaController;
