const express = require("express");
const router = express.Router();

const upload = require("../helpers/multer");

// Controllers
const pedidosController = require("../controllers/PedidosController");


router.get("/pedidosDelete", pedidosController.pedidosDelete);


// router.post("/pedidosMelhorias", pedidosController.pedidosMelhorias);

// Rota do controlador 'store' que ira criar um novo usuario
router.get("/create", pedidosController.create);

// Essa rota faz conecção com a create de cima, ela ira ser a responsavel pelo envio do formulario
// com o metodo 'post '
router.post("/create", upload.single("image"), pedidosController.store);

router.get("/pedidosDelete", pedidosController.pedidosDelete);


// Executa a atualização
router.get("/delete/:id", pedidosController.delete);

router.delete("/delete/:id", pedidosController.destroy);



module.exports = router;
