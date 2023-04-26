

const express = require('express');
const router = express.Router();

// Controllers
const indexController = require ('../controllers/indexController');





router.get("/", indexController.index);






module.exports = router;