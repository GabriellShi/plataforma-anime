const express = require('express');
const router = express.Router();

// Controllers
const episodiosAdicionadosController = require ('../controllers/episodiosAdicionadosController');

router.get("/", episodiosAdicionadosController.episodiosAdicionados);

module.exports = router;