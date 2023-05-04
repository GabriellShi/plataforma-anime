const express = require("express");
const router = express.Router();

// Controllers
const melhoriasController = require("../controllers/melhoriasController");

router.get("/", melhoriasController.melhorias);

module.exports = router;
