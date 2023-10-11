const fs = require("fs");
const path = require("path");
const bcrypt = require("../helpers/bcrypt");
const upload = require("../helpers/multer");

const db = require("../config/sequelize");
const Users = require("../models/Users");
const Animes = require("../models/Animes");
const Favoritos = require("../models/Favoritos");
const { Op } = require("sequelize");
const { Sequelize } = require("../config/sequelize");
  
const crypto = require('crypto');


const authController = {
  // Tela para cadastro do usuario
  register: (req, res) => {
    return res.render("register", {
      title: "cadastro",
      user: req.cookies.user,
      admin: req.cookies.admin,
    });
  },

  // Processamento do cadastro do usuario
  create: async (req, res) => {
    
    const { nome, email, senha, nomedeuser, image } = req.body;
    if (!nome || !email || !senha || !nomedeuser) {
      return res.render("register", {
        title: "Cadastro",

        error: {
          message: "Preencha todos os campos",
        },
      });
    }

    // if (senha !== confirmar_senha) {
    //   return res.render("register", {
    //     title: "Cadastro",
    //     error: {
    //       message: "Senhas não Coincidem",
    //     },
    //   });
    // }
    try {
      const novaUsers = await Users.create({
        nome,
        nomedeuser,
        email,
        senha: bcrypt.generateHash(senha),
        admin: false,
        criadoEm: new Date(),
        modificadoEm: new Date(),
      });

      res.redirect("/login");
    } catch (error) {
      console.error(error); // Adicione essa linha para registrar o erro no console
      res.render("register", {
        title: "Erro",
        message: "Erro ao criar usuario!",
      });
    }
  },
  // Tela para realizar Login
  login: (req, res) => {
    return res.render("login", {
      title: "Login",
      user: req.cookies.user,
      admin: req.cookies.admin,
    });
  },

  // Processamento do Login
  // Processamento do Login
  auth: async (req, res) => {
    try {
      console.log("Tentando encontrar o usuário com email:", req.body.email);

      const user = await Users.findOne({ where: { email: req.body.email } });

      console.log("Usuário encontrado:", user);

      if (!user) {
        return res.render("login", {
          title: "Login",
          error: {
            message: "E-mail ou Senha inválidos",
          },
        });
      }

      const isPasswordValid = await bcrypt.compareHash(
        req.body.senha,
        user.senha
      );

      if (!isPasswordValid) {
        return res.render("login", {
          title: "Login",
          error: {
            message: "E-mail ou Senha inválidos",
          },
        });
      }

      // Autenticação bem-sucedida
      // req.session.email = user.email;
      res.cookie("user", {
        id: user.id,
        nome: user.nome,
        admin: user.is_admin === 1,
      });
      res.redirect("/areaCliente");
    } catch (error) {
      console.error(error);
      res.status(500).render("error", {
        title: "Erro",
        message: "Erro ao realizar o login",
      });
    }
  },

  // ...

  areaCliente: async (req, res) => {
    const userId = req.cookies.user.id;
  
    try {
      const user = await Users.findByPk(userId);
  

      const favoritos = await Favoritos.findAll({
        where: {
          users_id: userId,
        },
        include: [Animes], // Isso trará os detalhes do anime associado aos favoritos
      });

      if (!user) {
        return res.render("error", {
          title: "Ops!",
          message: "Usuário não encontrado",
        });
      }
  
      if (user.image_filename) {
        user.image = `/uploads/${user.image_filename}`;
      } else {
        user.image = "/image/default-image.jpg"; // Substitua pelo caminho padrão da imagem
      }



      return res.render("areaCliente", {
        title: "Área do Cliente",
        user,
        favoritos,
        // Você já está passando o usuário, certifique-se de que ele esteja disponível na página
      });
    } catch (error) {
      console.error(error);
      res.status(500).render("error", {
        title: "Erro",
        message: "Erro ao carregar a página da Área do Cliente",
      });
    }
  },
  

// ...

  
  updateProfileImage: async (req, res) => {
    const image = req.file; // A imagem enviada pelo formulário
  
    if (!image) {
      return res.render("areaCliente", {
        title: "Área do Cliente",
        user: req.cookies.user,
        error: "Selecione uma imagem de perfil para atualizar.",
      });
    }
  
    try {
      const userId = req.cookies.user.id; // Recupera o ID do usuário a partir dos cookies
  
      // Recupere o usuário com base no ID do cookie
      const user = await Users.findByPk(userId);
  
      if (!user) {
        return res.render("error", {
          title: "Ops!",
          message: "Usuário não encontrado",
        });
      }
  
      // Verifique se o usuário já possui uma imagem de perfil existente
      if (user.image_filename) {
        // Construa o caminho completo do arquivo antigo
        const oldImagePath = path.join(
          __dirname,
          "../../uploads",
          user.image_filename
        );
  
        // Verifique se o arquivo antigo existe antes de tentar excluí-lo
        if (fs.existsSync(oldImagePath)) {
          // Exclua o arquivo antigo da pasta "uploads"
          fs.unlinkSync(oldImagePath);
          console.log("Imagem antiga excluída com sucesso.");
        } else {
          console.log("A imagem antiga não foi encontrada na pasta 'uploads'.");
        }
      }
  
      // Salve o novo nome do arquivo da imagem no registro do usuário no banco de dados
      await user.update({ image_filename: image.filename });
  
      const imagePath = `/uploads/${image.filename}`;
      console.log("Caminho da nova imagem:", imagePath);
  
      res.redirect("/areaCliente");

    } catch (error) {
      console.error(error);
      res.status(500).render("error", {
        title: "Erro",
        message: "Erro ao atualizar a imagem de perfil",
      });
    }
  },
  

  // Processamento do Deslogar
  logout: (req, res) => {
    // req.session.destroy();
    res.clearCookie("user");
    res.clearCookie("admin");

    res.redirect("/");
  },



  recuperarSenha: async (req, res) => {
    // Lógica para processar a recuperação de senha
    const { email } = req.body;


function generatePasswordResetToken() {
  return crypto.randomBytes(20).toString('hex');
}
    // Aqui você deve adicionar a lógica para gerar um token de redefinição de senha,
    // enviar um e-mail com um link contendo o token para o usuário e armazenar o token
    // no banco de dados associado ao usuário.
  
    // Após o envio do e-mail, redirecione o usuário para uma página de confirmação.
  
    return res.render("recuperarSenha", { title: "Recuperar Senha",
    user: req.cookies.user,
    generatePasswordResetToken,
   });
  },
  
};

module.exports = authController;
