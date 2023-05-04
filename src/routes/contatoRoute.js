const express = require("express");
const router = express.Router();

// Controllers
const contatoController = require("../controllers/contatoController");

router.get("/", contatoController.contato);

module.exports = router;
