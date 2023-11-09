const express = require("express");
const router = express.Router();
const upload = require("../helpers/multer");
// Controllers
const episodioController = require("../controllers/EpisodioController");

 // Rota para salvar um novo comentário
router.post("/:id/comment", episodioController.storeComment);

router.delete("/:id/comment/:commentId", episodioController.deleteComment);


    // Rota para os comentários antigos
    router.get('/:id/antigo', episodioController.showAntigo);

    // Rota para os comentários recentes
    router.get('/:id/recente', episodioController.showRecente);

// Rota do controlador 'store' que ira criar um novo usuario
router.get("/create", episodioController.create);

router.post("/:id/comment/:commentId/like", episodioController.likeComment);
router.post("/:id/comment/:commentId/dislike", episodioController.dislikeComment);

// Essa rota faz conecção com a create de cima, ela ira ser a responsavel pelo envio do formulario
// com o metodo 'post '
router.post("/create", upload.single("image"), episodioController.store);

// Rota do controlador 'index' que ira mostras a lista dos usuarios
router.get("/", episodioController.index);

// Rota do controlador 'show' que ira fazer a visualização de cada usuario
router.get("/:id", episodioController.show);

// Mostra a tela
router.get("/edit/:id", episodioController.edit);

// Executa a atualização
router.put("/edit/:id", upload.single("image"), episodioController.update);

router.get("/delete/:id", episodioController.delete);

router.delete("/delete/:id", episodioController.destroy);


module.exports = router;
