const express = require('express');
const router = express.Router();

// Controllers
const areaClienteController = require ('../controllers/areaClienteController');

router.get("/", areaClienteController.areaCliente);

module.exports = router;