    const express = require("express");
    const router = express.Router();

    const upload = require("../helpers/multer");

    // Controllers
    const detailsFilmeController = require("../controllers/DetailsFilmeController");

    // Rota do controlador 'store' que ira criar um novo usuario
    router.get("/create", detailsFilmeController.create);

    // Essa rota faz conecção com a create de cima, ela ira ser a responsavel pelo envio do formulario
    // com o metodo 'post '
    router.post("/create", upload.single("capa"), detailsFilmeController.store);

    // Mostra a tela
    router.get("/edit/:id", detailsFilmeController.edit);

    // Executa a atualização
    router.put("/edit/:id", upload.single("capa"), detailsFilmeController.update);

    router.get("/delete/:id", detailsFilmeController.delete);

    router.delete("/delete/:id", detailsFilmeController.destroy);


    // Rota do controlador 'index' que ira mostras a lista dos usuarios
    router.get("/", detailsFilmeController.index);

    // Rota do controlador 'show' que ira fazer a visualização de cada usuario
    router.get("/:id", detailsFilmeController.show);

    module.exports = router;
