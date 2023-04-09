const listaDosAnimesController = {
    // Pode retornar uma página ou não
    listaDosAnimes: (req, res) => {
        return res.render("listaDosAnimes", {title: "Lista de Animes", user: req.cookies.user,})
    },
};

module.exports = listaDosAnimesController;