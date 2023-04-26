const episodiosAdicionadosController = {
    // Pode retornar uma página ou não
    episodiosAdicionados: (req, res) => {
        return res.render("episodiosAdicionados", {title: "Pagina do Anime", //user: req.cookies.user,
    })
    },
};

module.exports = episodiosAdicionadosController;

