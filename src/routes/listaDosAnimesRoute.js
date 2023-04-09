const express = require('express');
const router = express.Router();

// Controllers
const listaDosAnimesController = require ('../controllers/listaDosAnimesController');

router.get("/", listaDosAnimesController.listaDosAnimes);

module.exports = router;