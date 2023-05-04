const express = require("express");
const router = express.Router();

// Controllers
const filmesAdicionadosController = require("../controllers/filmesAdicionadosController");

router.get("/", filmesAdicionadosController.filmesAdicionados);

module.exports = router;
