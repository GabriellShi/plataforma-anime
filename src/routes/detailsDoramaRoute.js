const express = require("express");
const router = express.Router();

const upload = require("../helpers/multer");

// Controllers
const detailsDoramaController = require("../controllers/DetailsDoramaController");


router.post("/:id/adicionar-favorito", detailsDoramaController.adicionarFavorito);


    // Rota para os comentários antigos
    router.get('/:id/antigo', detailsDoramaController.showAntigo);

    // Rota para os comentários recentes
    router.get('/:id/recente', detailsDoramaController.showRecente);


    // Rota para salvar um novo comentário
router.post("/:id/comment", detailsDoramaController.storeComment);

router.delete("/:id/comment/:commentId", detailsDoramaController.deleteComment);

    // Rota para votar "gostei"
router.post("/vote/:id/like", detailsDoramaController.like);

// Rota para votar "não gostei"
router.post("/vote/:id/dislike", detailsDoramaController.dislike);

router.post("/:id/comment/:commentId/like", detailsDoramaController.likeComment);
router.post("/:id/comment/:commentId/dislike", detailsDoramaController.dislikeComment);

// Rota do controlador 'store' que ira criar um novo usuario
router.get("/create", detailsDoramaController.create);

// Essa rota faz conecção com a create de cima, ela ira ser a responsavel pelo envio do formulario
// com o metodo 'post '
router.post("/create", upload.single("capa"), detailsDoramaController.store);

// Mostra a tela
router.get("/edit/:id", detailsDoramaController.edit);

// Executa a atualização
router.put("/edit/:id", upload.single("capa"), detailsDoramaController.update);

router.get("/delete/:id", detailsDoramaController.delete);

router.delete("/delete/:id", detailsDoramaController.destroy);


// Rota do controlador 'index' que ira mostras a lista dos usuarios
router.get("/", detailsDoramaController.index);

// Rota do controlador 'show' que ira fazer a visualização de cada usuario
router.get("/:id", detailsDoramaController.show);

module.exports = router;
