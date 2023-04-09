const paginaDoAnimeController = {
    // Pode retornar uma página ou não
    paginaDoAnime: (req, res) => {
        return res.render("paginaDoAnime", {title: "Pagina do Anime", user: req.cookies.user,})
    },
};

module.exports = paginaDoAnimeController;

