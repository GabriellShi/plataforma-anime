const fs = require("fs");
const path = require("path");
const bcrypt = require("../helpers/bcrypt");

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
  create: (req, res) => {
    const usersJson = fs.readFileSync(
      // caminho do Arquivo
      path.join(__dirname, "..", "data", "users.json"),
      // formato de leitura
      "utf-8",
    );
    const users = JSON.parse(usersJson);



    const { nome, nomedeuser, senha, email } =
      req.body;
    if (
      !nome ||
      !email ||
      !senha ||
      !nomedeuser
    ) {
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

    const newId = users[users.length - 1].id + 1;

    const newUser = {
      id: newId,
      nome,
      nomedeuser,
      email,
      senha: bcrypt.generateHash(senha),
      admin: false,
      criadoEm: new Date(),
      modificadoEm: new Date(),
    };

    newUser.id = newId;
    users.push(newUser);
    fs.writeFileSync(
      path.join(__dirname, "..", "data", "users.json"),
      JSON.stringify(users),
    );
    res.redirect("/login");
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
auth: (req, res) => {
  res.clearCookie("user");
  res.clearCookie("admin");
  const usersJson = fs.readFileSync(
    // caminho do Arquivo
    path.join(__dirname, "..", "data", "users.json"),
    // formato de leitura
    "utf-8",
  );
  const users = JSON.parse(usersJson);

  const { email, senha } = req.body;
  const userAuth = users.find((user) => {
    if (user.email === email) {
      return bcrypt.compareHash(senha, user.senha);
    }
  });

  if (!userAuth) {
    return res.render("login", {
      title: "Login",
      error: {
        message: " E-mail ou Senha invalido",
      },
    });
  }

  // Filtra as chaves que o objeto ira ter
  const user = JSON.parse(
    JSON.stringify(userAuth, ["id", "nome", "sobrenome", "apelido", "admin"]),
  );

  req.session.email = userAuth.email;
  res.cookie("user", user);
  res.cookie("admin", user.admin);

  res.redirect("/");
},

// Processamento do Deslogar
logout: (req, res) => {
  req.session.destroy();
  res.clearCookie("user");
  res.clearCookie("admin");

  res.redirect("/");
},
};

module.exports = authController;
