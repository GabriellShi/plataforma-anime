const express = require('express');
const router = express.Router();

// Controllers
const paginaDoEpisodioSelecionadoController = require ('../controllers/paginaDoEpisodioSelecionadoController');

router.get("/", paginaDoEpisodioSelecionadoController.paginaDoEpisodioSelecionado);

module.exports = router;