const loginController = {
  // Pode retornar uma página ou não
  login: (req, res) => {
    return res.render("login", {
      title: "Lista de Animes", //user: req.cookies.user,
    });
  },
};

module.exports = loginController;
