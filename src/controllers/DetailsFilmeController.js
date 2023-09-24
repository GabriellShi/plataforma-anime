const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
const path = require("path");


const db = require("../config/sequelize");
const Filmes = require("../models/Filmes");
const { Op } = require("sequelize");
const { Sequelize } = require("../config/sequelize")



const detailsFilmeController = {
  // index - controlador da aba que visualiza a lista dos usuario /
  // esse codigo renderiza a tabela 'users' dos usuarios
  // /Pode retornar uma página ou não
  index: async (req, res) => {
      try {
        // Busque todas as notícias do banco de dados
        const filmes = await Filmes.findAll({
        });
  
        return res.render("filme", {
          title: "Lista de Filmes",
          filmes,
        
        });
      } catch (error) {
        console.error(error);
        return res.status(500).render("error", {
          title: "Erro",
          message: "Ocorreu um erro ao carregar a lista de Filmes",
        });
      }
    },


  // show - controlador que ira visualizar os detalhas de cada usuario da lista 'users'
  show: async (req, res) => {
    // Pega o parametro que vem da url, ou seja, na url a baixo, pegaria o valor 4
    // localhost:3000/user/4
    // id = 4
    const { id } = req.params;

    const detailsFilme = await Filmes.findByPk(id)


    if (!detailsFilme) {
      return res.render("error", {
        title: "Ops!",
        message: "Filme não encontrado",
      });
    }

    return res.render("detailsFilme", {
      title: "Visualizar Filme",
      detailsFilme,
    });
  },

  create: async (req, res) => {
    return res.render("filme-create", { title: "Cadastrar Filme" });
  },
  store: async (req, res) => {
    const { nome, tipo, genero, autor, estudio, sinopse, capa } = req.body;

    try {

    const novaFilme = await Filmes.create({
      nome,
      tipo,
      genero,
      autor,
      estudio,
      sinopse,
      capa: capa,
    });


    res.redirect("/filme");
  } catch (error) {
    console.error(error); // Adicione essa linha para registrar o erro no console
    res.render("filme-create", {
      title: "Erro",
      message: "Erro ao Cadastrar Filme!",
    });
  }
  },

  // Mostra a tela
  edit: async (req, res) => {
    const { id } = req.params;

    try {
      // Busque os detalhes da notícia no banco de dados pelo ID
      const detailsFilme = await Filmes.findByPk(id);

    if (!detailsFilme) {
      return res.render("error", {
        title: "Ops!",
        message: "Filme não encontrado",
      });
    }

    return res.render("filme-edit", {
      title: "Editar Filme",
      detailsFilme,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      title: "Erro",
      message:
        "Ocorreu um erro ao carregar os detalhes do Filme para edição",
    });
  }
  },

  // Executa a atualização
  update: async (req, res) => {
    const { id } = req.params;
    const { nome, tipo, genero, autor, estudio, sinopse, capa } = req.body;

    try {
      const filmeToUpdate = await Filmes.findByPk(id);
  
      await filmeToUpdate.update({
        nome,
        tipo,
        genero,
        autor,
        estudio,
        sinopse,
        capa: capa,
      });

    return res.render("success", {
      title: "Filme Atualizado",
      message: `Filme ${filmeToUpdate.nome} foi atualizado`,
    });
  } catch (error) {
    console.error(error);
    return res.render("error", {
      title: "Erro",
      message: "Erro ao atualizar Filme",
    });
  }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    try {
      // Busque os detalhes da notícia no banco de dados pelo ID
      const detailsFilme = await Filmes.findByPk(id);

    if (!detailsFilme) {
      return res.render("error", {
        title: "Ops!",
        message: "Filme não encontrado",
      });
    }

    return res.render("filme-delete", {
      title: "Deletar Filme",
      detailsFilme,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      title: "Erro",
      message:
        "Ocorreu um erro ao carregar os detalhes do Filme para exclusão",
    });
  }
  },

  destroy: async (req, res) => {
    const { id } = req.params;

   try {
      const filmeToDelete = await Filmes.findByPk(id);

      if (!filmeToDelete) {
        return res.render("error", {
          title: "Ops!",
          message: "filme não encontrada",
        });
      }

      await filmeToDelete.destroy();

    return res.render("success", {
      title: "filme Deletado",
      message: "filme deletado com sucesso!",
    });
  } catch (error) {
    console.error(error);
    return res.render("error", {
      title: "Erro",
      message: "Erro ao deletar Filme",
    });
  }
  },


};

module.exports = detailsFilmeController;
