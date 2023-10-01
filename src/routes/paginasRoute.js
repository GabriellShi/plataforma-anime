const express = require("express");
const router = express.Router();

const upload = require("../helpers/multer");

// Controllers
const paginasController = require("../controllers/PaginasController");

router.get("/listaAnimeUsuario", paginasController.listaAnimeUsuario);


router.get("/episodiosAdicionados", paginasController.episodiosAdicionados);


// No seu arquivo de rotas

router.get("/genero/:genero", paginasController.paginaGeneroSelecionado);
router.get("/genero", paginasController.genero); // Adicione esta linha


router.get("/calendario", paginasController.calendarioAnimes);

router.get("/pedidos_ou_melhorias", paginasController.pedidos_ou_melhorias);



router.get("/contato", paginasController.contato);

router.get("/recuperarSenha", paginasController.recuperarSenha);

router.get("/pedidosDeAnimes", paginasController.pedidosDeAnimes);

router.get("/melhorias", paginasController.melhorias);


router.get("/filmesAdicionados", paginasController.filmesAdicionados);

router.get("/areaCliente", paginasController.areaCliente);








module.exports = router;
