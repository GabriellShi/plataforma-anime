const express = require("express");
const router = express.Router();

const upload = require("../helpers/multer");

// Controllers
const userController = require("../controllers/UserController");




// Rota do controlador 'store' que ira criar um novo usuario
router.get("/create", userController.create);

// Essa rota faz conecção com a create de cima, ela ira ser a responsavel pelo envio do formulario
// com o metodo 'post '
router.post("/create", upload.single("image"), userController.store);

// Mostra a tela
router.get("/edit/:id", userController.edit);

// Executa a atualização
router.put("/edit/:id", upload.single("image"), userController.update);

router.get("/delete/:id", userController.delete);

router.delete("/delete/:id", userController.destroy);

// Rota do controlador 'index' que ira mostras a lista dos usuarios
router.get("/", userController.index);

// Rota do controlador 'show' que ira fazer a visualização de cada usuario
router.get("/:id", userController.show);
router.get("/:nomedeuser", userController.show);

module.exports = router;
