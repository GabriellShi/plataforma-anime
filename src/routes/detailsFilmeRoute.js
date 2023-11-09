    const express = require("express");
    const router = express.Router();

    const upload = require("../helpers/multer");

    // Controllers
    const detailsFilmeController = require("../controllers/DetailsFilmeController");


    router.post("/:id/adicionar-favorito", detailsFilmeController.adicionarFavorito);

    // Rota para os comentários antigos
    router.get('/:id/antigo', detailsFilmeController.showAntigo);

    // Rota para os comentários recentes
    router.get('/:id/recente', detailsFilmeController.showRecente);

        // Rota para salvar um novo comentário
    router.post("/:id/comment", detailsFilmeController.storeComment);

    router.delete("/:id/comment/:commentId", detailsFilmeController.deleteComment);

        // Rota para votar "gostei"
    router.post("/vote/:id/like", detailsFilmeController.like);

    // Rota para votar "não gostei"
    router.post("/vote/:id/dislike", detailsFilmeController.dislike);

    
router.post("/:id/comment/:commentId/like", detailsFilmeController.likeComment);
router.post("/:id/comment/:commentId/dislike", detailsFilmeController.dislikeComment);

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
