const paginaDoEpisodioSelecionadoController = {
    // Pode retornar uma página ou não
    paginaDoEpisodioSelecionado: (req, res) => {
        return res.render("paginaDoEpisodioSelecionado", {title: "Pagina do Anime", user: req.cookies.user,})
    },
};

module.exports = paginaDoEpisodioSelecionadoController;



