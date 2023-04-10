const areaClienteController = {
    // Pode retornar uma página ou não
    areaCliente: (req, res) => {
        return res.render("areaCliente", {title: "Pagina do Anime", user: req.cookies.user,})
    },
};

module.exports = areaClienteController;






