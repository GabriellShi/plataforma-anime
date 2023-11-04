const express = require("express");
const router = express.Router();

const upload = require("../helpers/multer");

// Controllers
const animeController = require("../controllers/AnimeController");
const isAuth = require("../middlewares/auth"); // Middleware de autenticação

router.get("/:id", isAuth, animeController.show); // Protegido pelo middleware isAuth


// Rota para adicionar um anime aos favoritos do usuário
router.post("/:id/adicionar-favorito", animeController.adicionarFavorito);


    // Rota para os comentários antigos
router.get('/:id/antigo', animeController.showAntigo);

    // Rota para os comentários recentes
router.get('/:id/recente', animeController.showRecente);



// Rota para salvar um novo comentário
router.post("/:id/comment", animeController.storeComment);

router.delete("/:id/comment/:commentId", animeController.deleteComment);



// Rota para votar "gostei"
router.post("/vote/:id/like", animeController.like);

// Rota para votar "não gostei"
router.post("/vote/:id/dislike", animeController.dislike);

// Rota do controlador 'store' que ira criar um novo usuario
router.get("/create", animeController.create);

// Essa rota faz conecção com a create de cima, ela ira ser a responsavel pelo envio do formulario
// com o metodo 'post '
router.post("/create", upload.single("capa"), animeController.store);

// Mostra a tela
router.get("/edit/:id", animeController.edit);

// Executa a atualização
router.put("/edit/:id", upload.single("capa"), animeController.update);

router.get("/delete/:id", animeController.delete);

router.delete("/delete/:id", animeController.destroy);


// Rota do controlador 'index' que ira mostras a lista dos usuarios
router.get("/", animeController.index);

// Rota do controlador 'show' que ira fazer a visualização de cada usuario
router.get("/:id", isAuth, animeController.show);


module.exports = router;
