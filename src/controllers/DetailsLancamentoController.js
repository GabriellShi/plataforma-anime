const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
const path = require("path");

// Configuração para conexão com o banco de dados
const db = require("../config/sequelize");
const Lancamento = require("../models/Lancamento");
const { Op } = require("sequelize");

const detailsLancamentoController = {
  // index - controlador da aba que visualiza a lista dos usuario /
  // esse codigo renderiza a tabela 'users' dos usuarios
  // /Pode retornar uma página ou não
  index: async (req, res) => {
    try {
      // Busque todas as notícias do banco de dados
      const lancamento = await Lancamento.findAll({
        order: [['created_at', 'DESC']]
      });

      return res.render("lancamento", {
        title: "Lista de lancamento",
        lancamento,

      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar as lancamento",
      });
    }
  },

  // show - controlador que irá visualizar os detalhes de cada notícia
  show: async (req, res) => {
    try {
      const { id } = req.params;

      // Busque os detalhes da notícia no banco de dados pelo ID
      const detailsLancamento = await Lancamento.findByPk(id);

      if (!detailsLancamento) {
        return res.render("error", {
          title: "Ops!",
          message: "Detalhes da notícia não encontrado",
        });
      }

      if (detailsLancamento.created_at) {
        const createdAtDate = new Date(detailsLancamento.created_at);
        const formattedCreatedAt = `${createdAtDate.getDate()}/${
          createdAtDate.getMonth() + 1
        }/${createdAtDate.getFullYear()}`;
        detailsLancamento.formattedCreatedAt = formattedCreatedAt;
      }

      return res.render("detailsLancamento", {
        title: "Visualizar notícia",
        lancamento: detailsLancamento,
        detailsLancamento,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar os detalhes da notícia",
      });
    }
  },

  create: async (req, res) => {
    return res.render("lancamento-create", { title: "Criar Calendario" });
  },

  store: async (req, res) => {
    const { titulo, horario, dia, streaming, image } = req.body;
    try {

      await Lancamento.create({
        titulo,
        horario,
        dia,
        streaming,
        image: image,
      });

      res.redirect("/lancamento");
    } catch (error) {
      console.error(error);
      res.render("lancamento-create", {
        title: "Erro",
        message: "Erro ao criar lançamento!",
      });
    }
  },

  // Mostra a tela
  edit: async (req, res) => {
    const { id } = req.params;

    try {
      // Busque os detalhes da notícia no banco de dados pelo ID
      const detailsLancamento = await Lancamento.findByPk(id);

      if (!detailsLancamento) {
        return res.render("error", {
          title: "Ops!",
          message: "Detalhes da notícia não encontrados",
        });
      }

      return res.render("lancamento-edit", {
        title: "Editar Notícia",
        lancamento: detailsLancamento, // Passamos os detalhes diretamente para a propriedade 'news'
        detailsLancamento,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message:
          "Ocorreu um erro ao carregar os detalhes da notícia para edição",
      });
    }
  },

  // Executa a atualização
  update: async (req, res) => {
    const { id } = req.params;
    const { titulo, horario, dia, streaming, image } = req.body;

    try {
      const newsToUpdate = await Lancamento.findByPk(id);

      await newsToUpdate.update({
        titulo,
        horario,
        dia,
        streaming,
        image: image,
      });

      return res.render("success", {
        title: "Notícia Atualizada",
        message: `Notícia ${newsToUpdate.titulo} foi atualizada`,
      });
    } catch (error) {
      console.error(error);
      return res.render("error", {
        title: "Erro",
        message: "Erro ao atualizar notícia",
      });
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    try {
      // Busque os detalhes da notícia no banco de dados pelo ID
      const detailsLancamento = await Lancamento.findByPk(id);

      if (!detailsLancamento) {
        return res.render("error", {
          title: "Ops!",
          message: "Detalhes da notícia não encontrados",
        });
      }

      return res.render("lancamento-delete", {
        title: "Deletar Notícia",
        detailsLancamento: detailsLancamento, // Certifique-se de passar o objeto corretamente aqui
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
      const newsToDelete = await Lancamento.findByPk(id);

      if (!newsToDelete) {
        return res.render("error", {
          title: "Ops!",
          message: "Notícia não encontrada",
        });
      }

      // Deleta a notícia do banco de dados
      await newsToDelete.destroy();

      return res.render("success", {
        title: "Notícia Deletada",
        message: "Notícia deletada com sucesso!",
      });
    } catch (error) {
      console.error(error);
      return res.render("error", {
        title: "Erro",
        message: "Erro ao deletar notícia",
      });
    }
  },
};

module.exports = detailsLancamentoController;
