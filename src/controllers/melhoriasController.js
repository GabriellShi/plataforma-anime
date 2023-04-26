const melhoriasController = {
    // Pode retornar uma página ou não
    melhorias: (req, res) => {
        return res.render("melhorias", {title: "Pagina do Anime", //user: req.cookies.user,
    })
    },
};

module.exports = melhoriasController;

