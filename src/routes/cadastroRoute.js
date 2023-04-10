const express = require('express');
const router = express.Router();

// Controllers
const cadastroController = require ('../controllers/cadastroController');

router.get("/", cadastroController.cadastro);

module.exports = router;