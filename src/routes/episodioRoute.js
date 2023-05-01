const express = require('express');
const router = express.Router();
const upload = require("../helpers/multer");
// Controllers
const episodioController = require ('../controllers/EpisodioController');

// Rota do controlador 'store' que ira criar um novo usuario
router.get("/create", episodioController.create);

// Essa rota faz conecção com a create de cima, ela ira ser a responsavel pelo envio do formulario
// com o metodo 'post '
router.post("/create", upload.single("imagem"), episodioController.store);

router.get("/episodiosAdicionados", episodioController.episodiosAdicionados);





// Rota do controlador 'index' que ira mostras a lista dos usuarios 
router.get("/", episodioController.index);

// Rota do controlador 'show' que ira fazer a visualização de cada usuario 
router.get("/:id", episodioController.show);

module.exports = router;