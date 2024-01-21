const fs = require("fs");
const path = require("path");
const bcrypt = require("../helpers/bcrypt");
const upload = require("../helpers/multer");

const db = require("../config/sequelize");
const Users = require("../models/Users");
const Animes = require("../models/Animes");
const Filmes = require("../models/Filmes");
const Doramas = require("../models/Doramas");
const Favoritos = require("../models/Favoritos");
const { Op } = require("sequelize");
const { Sequelize } = require("../config/sequelize");
  
const crypto = require('crypto');
const nodemailer = require('nodemailer');

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
        include: [Animes, Filmes, Doramas], // Isso trará os detalhes do anime associado aos favoritos
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
  removerFavorito: async (req, res) => {
    try {
        const userId = req.cookies.user.id;
        const { id, contentType } = req.params;
        const contentId = req.params.id;

        console.log(`Removendo ${contentType} com ID ${contentId} para o usuário ${userId}`);

        // Verifique se o conteúdo está nos favoritos do usuário
        const favorite = await Favoritos.findOne({
            where: {
                [`${contentType}s_id`]: contentId,
                users_id: userId,
            },
        });
        if (favorite) {
            // O conteúdo está nos favoritos, então remova
            await Favoritos.destroy({
                where: {
                    [`${contentType}s_id`]: contentId,
                    users_id: userId,
                },
            });

            console.log(`${contentType} removido dos favoritos com sucesso`);
              res.status(200).json({ message: `${contentType} removido dos favoritos com sucesso` });
          } else {
              console.log(`${contentType} não está nos favoritos do usuário`);
              res.status(400).json({ message: `${contentType} não está nos favoritos do usuário` });
          }
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Erro interno do servidor" });
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


  renderRecuperarSenha: (req, res) => {
    return res.render("recuperarSenha", { title: "Recuperar Senha", user: req.cookies.user });
  },
  // Controlador para recuperação de senha
recuperarSenha: async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      console.log('Erro: O campo de e-mail está vazio.');
      return res.render('recuperarSenha', { title: 'Recuperar Senha', user: req.cookies.user });
    } else {
      console.log('Email recebido:', email);
    }

    console.log('Email capturado do formulário:', email);

    // Verificar se o usuário existe
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      console.log('Erro: Usuário não encontrado para o e-mail fornecido.');
      return res.render('recuperarSenha', { title: 'Recuperar Senha', user: req.cookies.user });
    }

    // Função para gerar um token de recuperação de senha
    function generatePasswordResetToken() {
      return crypto.randomBytes(20).toString('hex');
    }

    // Configurar o transporte nodemailer com os dados da credencial
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'contatoanimesblack@gmail.com', // Substitua pelo seu endereço de e-mail
        clientId: '101298532470-42crnub0g8hs98b6qpud49ej2v4olq2n.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken: 'SEU_REFRESH_TOKEN_AQUI', // Você precisa obter o refresh token
      },
    });

    async function sendPasswordResetEmail(user, token) {
      const mailOptions = {
        from: 'contatoanimesblack@gmail.com', // Deve ser o mesmo e-mail usado acima
        to: user.email,
        subject: 'Recuperação de Senha',
        text: `Você solicitou a recuperação de senha. Use este token para redefinir sua senha: ${token}`,
      };

      await transporter.sendMail(mailOptions);
    }

    const token = generatePasswordResetToken();

    // Salvar o token no banco de dados associado ao usuário
    user.token = token;
    await user.save();

    // Enviar o token por e-mail
    await sendPasswordResetEmail(user, token);

    // Redirecionar para uma página de confirmação
    return res.render('recuperarSenha', { title: 'Recuperar Senha', user: req.cookies.user });
  } else {
    console.log('GET request recebida para a página de recuperação de senha.');
    // Lógica para renderizar a página de recuperação de senha
    return res.render('recuperarSenha', { title: 'Recuperar Senha', user: req.cookies.user });
  }
},




};

module.exports = authController;
