const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
const path = require("path");

// Configuração para conexão com o banco de dados
const db = require("../config/sequelize");
const Pedidos = require("../models/Pedidos");
const { Op } = require("sequelize");

const pedidosController = {



  create: async (req, res) => {

    const pedidos = await Pedidos.findAll({
      order: [['created_at', 'DESC']]
    });

    return res.render("pedidos-create", { title: "Criar Calendario",
    pedidos,
    user: req.cookies.user,

  });
  },

  store: async (req, res) => {
    const { usuario, email, anime, comentario} = req.body;
    try {

      await Pedidos.create({
        usuario,
        email,
        anime,
        comentario,

    
      });

      res.redirect("/pedido/create");
    } catch (error) {
      console.error(error);
      res.render("pedido/create", {
        title: "Erro",
        message: "Erro ao criar lançamento!",
      });
    }
  },
 

  
  pedidosDelete: async (req, res) => {
    const pedidos = await Pedidos.findAll({
      order: [['created_at', 'DESC']]
    });

    return res.render("pedidosDelete", { title: "Criar Calendario",
    pedidos,
  });
  },

  delete: async (req, res) => {
    const { id } = req.params;

    try {
      // Busque os detalhes da notícia no banco de dados pelo ID
      const pedido = await Pedidos.findByPk(id);


      return res.render("pedidos-delete", {
        title: "Deletar Notícia",
        pedido: pedido, // Certifique-se de passar o objeto corretamente aqui
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message:
          "Ocorreu um erro ao carregar os detalhes da notícia para exclusão",
      });
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params;
  
    try {
      const pedidoToDelete = await Pedidos.findByPk(id);
  
      if (!pedidoToDelete) {
        return res.render("error", {
          title: "Ops!",
          message: "Pedido não encontrado",
        });
      }
  
      // Deleta o pedido do banco de dados
      await pedidoToDelete.destroy();
  
      // Redireciona de volta para a página de criação de pedidos
      return res.redirect("/pedido/create");
    } catch (error) {
      console.error(error);
      return res.render("error", {
        title: "Erro",
        message: "Erro ao deletar pedido",
      });
    }
  },
  
};

module.exports = pedidosController;
