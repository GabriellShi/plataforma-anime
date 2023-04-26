const express = require('express');
const router = express.Router();

// Controllers
const recuperarSenhaController = require ('../controllers/recuperarSenhaController');

router.get("/", recuperarSenhaController.recuperarSenha);

module.exports = router;