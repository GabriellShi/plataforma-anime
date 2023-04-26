const express = require('express');
const router = express.Router();

// Controllers
const indexAdminController = require ('../controllers/indexAdminController');

router.get("/", indexAdminController.indexAdmin);

module.exports = router;