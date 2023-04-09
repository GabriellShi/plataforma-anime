const express = require('express');
const router = express.Router();

// Controllers
const paginaDoAnimeController = require ('../controllers/paginaDoAnimeController');

router.get("/", paginaDoAnimeController.paginaDoAnime);

module.exports = router;