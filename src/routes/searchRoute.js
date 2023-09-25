const express = require("express");
const router = express.Router();

// Controllers
const searchController = require("../controllers/SearchController");

router.post("/search", searchController.search);

module.exports = router;
