const cadastroController = {
    // Pode retornar uma página ou não
    cadastro: (req, res) => {
        return res.render("cadastro", {title: "Pagina do Anime", user: req.cookies.user,})
    },
};

module.exports = cadastroController;



