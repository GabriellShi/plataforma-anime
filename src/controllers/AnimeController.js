const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
const path = require("path");


const db = require("../config/sequelize");
const Animes = require("../models/Animes");
const Episodios = require("../models/Episodios");
const { Op } = require("sequelize");
const { Sequelize } = require("../config/sequelize")



const animeController = {
  // index - controlador da aba que visualiza a lista dos usuario /
  // esse codigo renderiza a tabela 'users' dos usuarios
  // /Pode retornar uma página ou não
  index: async (req, res) => {
      try {
        // Busque todas as notícias do banco de dados
        const listaAnimeAdmin = await Animes.findAll({
        });
  
        return res.render("listaAnimeAdmin", {
          title: "Lista de Animes",
          listaAnimeAdmin,
        
        });
      } catch (error) {
        console.error(error);
        return res.status(500).render("error", {
          title: "Erro",
          message: "Ocorreu um erro ao carregar a lista de Animes",
        });
      }
    },


  // show - controlador que ira visualizar os detalhas de cada usuario da lista 'users'
  show: async (req, res) => {
    // Pega o parametro que vem da url, ou seja, na url a baixo, pegaria o valor 4
    // localhost:3000/user/4
    // id = 4
    const { id } = req.params;

    const anime = await Animes.findByPk(id)

    const episodios = await Episodios.findAll({
    });


    if (!anime) {
      return res.render("error", {
        title: "Ops!",
        message: "Anime não encontrado",
      });
    }

    return res.render("anime", {
      title: "Visualizar Anime",
      anime,
      episodios,
    });
  },

  create: async (req, res) => {
    return res.render("anime-create", { title: "Cadastrar Anime" });
  },
  store: async (req, res) => {
    const { nome, tipo, genero, autor, estudio, status, sinopse, capa } = req.body;

    try {

    const novaAnimes = await Animes.create({
      nome,
      tipo,
      genero,
      autor,
      estudio,
      status,
      sinopse,
      capa: capa,
    });


    res.redirect("/anime");
  } catch (error) {
    console.error(error); // Adicione essa linha para registrar o erro no console
    res.render("anime-create", {
      title: "Erro",
      message: "Erro ao Cadastrar Anime!",
    });
  }
  },

  // Mostra a tela
  edit: async (req, res) => {
    const { id } = req.params;

    try {
      // Busque os detalhes da notícia no banco de dados pelo ID
      const anime = await Animes.findByPk(id);
      const episodios = await Episodios.findAll({});

    if (!anime) {
      return res.render("error", {
        title: "Ops!",
        message: "Anime não encontrado",
      });
    }

    return res.render("anime-edit", {
      title: "Editar Anime",
      episodios,
      anime,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      title: "Erro",
      message:
        "Ocorreu um erro ao carregar os detalhes do Anime para edição",
    });
  }
  },

  // Executa a atualização
  update: async (req, res) => {
    const { id } = req.params;
    const { nome, tipo, genero, autor, estudio, status, sinopse, capa } = req.body;

    try {
      const animesToUpdate = await Animes.findByPk(id);
  
      await animesToUpdate.update({
        nome,
        tipo,
        genero,
        autor,
        estudio,
        status,
        sinopse,
        capa: capa,
      });

    return res.render("success", {
      title: "Anime Atualizado",
      message: `Anime ${animesToUpdate.nome} foi atualizado`,
    });
  } catch (error) {
    console.error(error);
    return res.render("error", {
      title: "Erro",
      message: "Erro ao atualizar Anime",
    });
  }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    try {
      // Busque os detalhes da notícia no banco de dados pelo ID
      const anime = await Animes.findByPk(id);

    if (!anime) {
      return res.render("error", {
        title: "Ops!",
        message: "Anime não encontrado",
      });
    }

    return res.render("anime-delete", {
      title: "Deletar Anime",
      anime,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      title: "Erro",
      message:
        "Ocorreu um erro ao carregar os detalhes do Anime para exclusão",
    });
  }
  },

  destroy: async (req, res) => {
    const { id } = req.params;

   try {
      const animeToDelete = await Animes.findByPk(id);

      if (!animeToDelete) {
        return res.render("error", {
          title: "Ops!",
          message: "Anime não encontrada",
        });
      }

      await animeToDelete.destroy();

    return res.render("success", {
      title: "Anime Deletado",
      message: "Anime deletado com sucesso!",
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

module.exports = animeController;
