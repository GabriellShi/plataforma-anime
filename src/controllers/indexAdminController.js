const indexAdminController = {
  // Pode retornar uma página ou não
  indexAdmin: (req, res) => {
    return res.render("indexAdmin", {
      title: "Pagina do Anime", //user: req.cookies.user,
    });
  },


paginasCreate: (req, res) => {
  return res.render("paginasCreate", {
    title: "Pagina Creater", //user: req.cookies.user,
  });
},

paginasViews: (req, res) => {
  return res.render("paginasViews", {
    title: "Pagina Views", //user: req.cookies.user,
  });
},


};
module.exports = indexAdminController;
