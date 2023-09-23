const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
const bcrypt = require("../helpers/bcrypt");
const path = require("path");

const db = require("../config/sequelize");
const Users = require("../models/Users");
const { Op } = require("sequelize");
const { Sequelize } = require("../config/sequelize")



const userController = {



  // index - controlador da aba que visualiza a lista dos usuario /
  // esse codigo renderiza a tabela 'users' dos usuarios
  // /Pode retornar uma página ou não
  index: async (req, res) => {
    try {
      // Busque todas as notícias do banco de dados
      const users = await Users.findAll({
        order: [['created_at', 'DESC']]
      });

      return res.render("users", {
        title: "Lista de Usuarios",
        users,   
      
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar os Usuarios",
      });
    }
  },

  // show - controlador que ira visualizar os detalhas de cada usuario da lista 'users'
  show: async (req, res) => {

    try {
    const { id } = req.params;

    const user = await Users.findOne({

    });

    if (!user) {
      return res.render("error", {
        title: "Ops!",
        message: "Detalhes do Usuario não encontrado",
      });
    }
    // // Esse codigo abaixo ira fazer uma listagem dos id que tem na lista e fazer uma busca pelo usuario
    // // apresentando uma mensagem caso encontrado ou não
    // const userResult = users.find((user) => user.id === parseInt(id));
    // if (!userResult) {
    //   return res.render("error", {
    //     title: "Ops!",
    //     message: "Usuario não encontrado",
    //   });
    // }

    // const user = {
    //   ...userResult,
    //   image: files.base64Encode(upload.path + userResult.image),
    // };
    return res.render("user", {
      title: "Visualizar usuario",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      title: "Erro",
      message: "Ocorreu um erro ao carregar os detalhes do Usuario",
    });
  }
  },

  create: async(req, res) => {
    return res.render("register", { title: "Cadastrar Usuario" });
    
  },
  store: async (req, res) => {
   
  },

  // Mostra a tela
  edit: async (req, res) => {

    const { id } = req.params;

    try {
      // Busque os detalhes da notícia no banco de dados pelo ID
      const user = await Users.findByPk(id);
  
      if (!user) {
        return res.render("error", {
          title: "Ops!",
          message: "Detalhes da notícia não encontrados",
        });
      }

    return res.render("user-edit", {
      title: "Editar Usuário",
      user,
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      title: "Erro",
      message:
        "Ocorreu um erro ao carregar os detalhes do Usuario para edição",
    });
  }
  },

  // Executa a atualização
  update: async (req, res) => {

    const { id } = req.params;
    const { nome, nomedeuser, senha, email } = req.body;

  
    try {
      const usersToUpdate = await Users.findByPk(id);
  
      await usersToUpdate.update({
        nome, 
        nomedeuser, 
        senha, 
        email
      });

    return res.render("success", {
      title: "Usuário Atualizado",
      message: `Usuário ${usersToUpdate.nome} foi atualizado`,
    });

  } catch (error) {
    console.error(error);
    return res.render("error", {
      title: "Erro",
      message: "Erro ao atualizar Usuario",
    });
  }
  },

  delete: async (req, res) => {


    const { id } = req.params;

    try {
      // Busque os detalhes da notícia no banco de dados pelo ID
      const user = await Users.findByPk(id);

      if (!user) {
        return res.render("error", {
          title: "Ops!",
          message: "Detalhes do Usuario não encontrados",
        });
      }

    return res.render("user-delete", {
      title: "Deletar Usuario",
      user,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      title: "Erro",
      message:
        "Ocorreu um erro ao carregar os detalhes do Usario para exclusão",
    });
  }
  },

  destroy: async (req, res) => {

 
    const { id } = req.params;

    try {
      const usersToDelete = await Users.findByPk(id);

      if (!usersToDelete) {
        return res.render("error", {
          title: "Ops!",
          message: "Usuario não encontrada",
        });
      }
    
      await usersToDelete.destroy();

    return res.render("success", {
      title: "Usuario Deletado",
      message: "Usuário deletado com sucesso!",
    });

  } catch (error) {
    console.error(error);
    return res.render("error", {
      title: "Erro",
      message: "Erro ao deletar Usuario",
    });
  }
  },


};

module.exports = userController;
