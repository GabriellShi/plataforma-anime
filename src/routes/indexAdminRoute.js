const express = require("express");
const router = express.Router();

// Controllers
const indexAdminController = require("../controllers/indexAdminController");

router.get("/indexAdmin", indexAdminController.indexAdmin);

router.get("/paginasCreate", indexAdminController.paginasCreate);

router.get("/paginasViews", indexAdminController.paginasViews);


module.exports = router;
