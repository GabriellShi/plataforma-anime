const express = require("express");
const router = express.Router();

// Controllers
const generosController = require("../controllers/generosController");

router.get("/", generosController.generos);

module.exports = router;
