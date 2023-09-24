const express = require("express");
const router = express.Router();

const upload = require("../helpers/multer");

// Controllers
const datailsLancamentoController = require("../controllers/DetailsLancamentoController");

// Rota do controlador 'store' que ira criar um novo usuario
router.get("/create", datailsLancamentoController.create);

// Essa rota faz conecção com a create de cima, ela ira ser a responsavel pelo envio do formulario
// com o metodo 'post '
router.post("/create", upload.single("image"), datailsLancamentoController.store);

// Mostra a tela
router.get("/edit/:id", datailsLancamentoController.edit);

// Executa a atualização
router.post("/edit/:id", upload.single("image"), datailsLancamentoController.update);
router.get("/delete/:id", datailsLancamentoController.delete);

router.delete("/delete/:id", datailsLancamentoController.destroy);

// Rota do controlador 'index' que ira mostras a lista dos usuarios
router.get("/", datailsLancamentoController.index);

// Rota do controlador 'show' que ira fazer a visualização de cada usuario
router.get("/:id", datailsLancamentoController.show);
router.get("/:nomedeuser", datailsLancamentoController.show);

module.exports = router;
