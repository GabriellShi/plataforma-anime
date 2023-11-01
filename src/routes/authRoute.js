// routes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const isAuth = require("../middlewares/auth");
const isGuest = require("../middlewares/guest");

const upload = require("../helpers/multer");


// Suas rotas existentes
router.get("/login", isGuest, authController.login);
router.post("/login", isGuest, authController.auth);
router.get("/register", isGuest, authController.register);
router.post("/register", isGuest, authController.create);
router.post("/logout", isAuth, authController.logout);


// Em routes.js
router.post("/areaCliente/updateImage", isAuth, upload.single("image_filename"), authController.updateProfileImage);

router.get("/areaCliente", isAuth, authController.areaCliente);

router.get("/favoritos", isAuth, authController.areaCliente);

// Rota para exibir a página de recuperação de senha (GET)
router.get("/recuperarSenha", authController.renderRecuperarSenha);

// Rota para tratar o envio de e-mail de recuperação de senha (POST)
router.post("/recuperarSenha", authController.recuperarSenha);



module.exports = router;
