const paginasController = {
  contato: (req, res) => {
    return res.render("contato", { title: "Contato" });
  },

  recuperarSenha: (req, res) => {
    return res.render("recuperarSenha", { title: "Recuperar Senha" });
  },

  pedidosDeAnimes: (req, res) => {
    return res.render("pedidosDeAnimes", { title: "Pedidos de Novos Animes" });
  },

  melhorias: (req, res) => {
    return res.render("melhorias", { title: "Melhorias" });
  },

  generos: (req, res) => {
    return res.render("generos", { title: "Generos" });
  },

  filmesAdicionados: (req, res) => {
    return res.render("filmesAdicionados", { title: "Filmes Adicionados" });
  },

  areaCliente: (req, res) => {
    return res.render("areaCliente", { title: "Area do Cliente", user: req.cookies.user, });
  },

};



module.exports = paginasController;
