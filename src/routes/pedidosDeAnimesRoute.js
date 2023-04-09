const express = require('express');
const router = express.Router();

// Controllers
const pedidosDeAnimesController = require ('../controllers/pedidosDeAnimesController');

router.get("/", pedidosDeAnimesController.pedidosDeAnimes);

module.exports = router;