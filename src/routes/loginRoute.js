const express = require('express');
const router = express.Router();

// Controllers
const loginController = require ('../controllers/loginController');

router.get("/", loginController.login);

module.exports = router;