const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
const path = require("path");

const db = require("../config/sequelize");
const Animes = require("../models/Animes");
const Episodios = require("../models/Episodios");
const Filmes = require("../models/Filmes");
const { Op } = require("sequelize");
const { Sequelize } = require("../config/sequelize"); 

const episodioController = {
  // index - controlador da aba que visualiza a lista dos usuario /
  // esse codigo renderiza a tabela 'users' dos usuarios
  // /Pode retornar uma página ou não
  index: async (req, res) => {
    try {
      // Busque todas as notícias do banco de dados
      const episodios = await Episodios.findAll({
        order: [['created_at', 'DESC']]
      });

      return res.render("episodios", {
        title: "Lista de Episodios",
        episodios,
      
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar a Lista Episodios",
      });
    }
  },

  // show - controlador que ira visualizar os detalhas de cada usuario da lista 'users'
  show: async (req, res) => {
    try {
      const { id } = req.params;
  
      // Primeiro, encontre o episódio pelo ID
      const episodio = await Episodios.findByPk(id);
  
      if (!episodio) {
        return res.render("error", {
          title: "Ops!",
          message: "Episódio não encontrado",
        });
      }
  
      // Em seguida, obtenha o ID do anime relacionado a esse episódio
      const animeId = episodio.animes_id;

      const filmeId = episodio.filmes_id;



  
      // Agora, busque o anime com base no animeId
      const anime = await Animes.findByPk(animeId);

      const detailsFilme = await Filmes.findByPk(filmeId);



  
      // Em seguida, busque todos os episódios relacionados a esse anime
      const episodios = await Episodios.findAll({
        where: {
          animes_id: animeId,
          filmes_id: filmeId
        },
        order: [['numero_episodio', 'ASC']],
      });

      

  
  
  
      // Obtenha o índice do episódio atual
      const currentEpisodeIndex = episodios.findIndex(
        (ep) => ep.numero_episodio === episodio.numero_episodio
      );


  
      // Obtenha os episódios anterior e próximo com base no índice atual
      const previousEpisode =
        currentEpisodeIndex > 0 ? episodios[currentEpisodeIndex - 1] : null;
      const nextEpisode =
        currentEpisodeIndex < episodios.length - 1
          ? episodios[currentEpisodeIndex + 1]
          : null;
  
      return res.render("episodio", {
        title: "Visualizar Episódio",
        episodio,
        anime,
        detailsFilme,
        episodios,
        previousEpisode,
        nextEpisode,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar os detalhes do episódio",
      });
    }
  },
  

  create: async (req, res) => {

    return res.render("episodio-create", {
      title: "Cadastrar Episodio"
     });
  },
  
  store: async (req, res) => {
    const { nome, data, image, animes_id, filmes_id, numero_episodio, video_url } = req.body;

    try {
        const novosEpisodios = await Episodios.create({
            nome,
            data,
            image,
            animes_id,
            filmes_id,
            numero_episodio,
            video_url,
        });

        res.redirect("/episodio");
    } catch (error) {
        console.error(error); 
        res.render("episodio-create", {
            title: "Erro",
            message: "Erro ao Cadastrar Episodio!",
        });
    }
},

  edit: async (req, res) => {
    const { id } = req.params;

    try {

      const anime = await Animes.findByPk(id);

      // Busque os detalhes da notícia no banco de dados pelo ID

      const episodio = await Episodios.findByPk(id);

      const detailsFilme = await Filmes.findByPk(id);

    if (!episodio) {
      return res.render("error", {
        title: "Ops!",
        message: "episodio não encontrado",
      });
    }

    return res.render("episodio-edit", {
      title: "Editar episodio",
      episodio,
      episodios: episodio,
      detailsFilme,

    });
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      title: "Erro",
      message:
        "Ocorreu um erro ao carregar os detalhes do Episodio para edição",
    });
  }
  },

   // Executa a atualização
   update: async (req, res) => {
    const { id } = req.params;
    const { nome, data, image, animes_id, filmes_id, numero_episodio, video_url} = req.body;


    try {
      const episodioToUpdate = await Episodios.findByPk(id);
  
      await episodioToUpdate.update({
        nome,
        data,
        image,
        animes_id,
        filmes_id,
        numero_episodio,
        video_url,
      });

    return res.render("success", {
      title: "episodio Atualizado",
      message: `episodio ${episodioToUpdate.nome} foi atualizado`,
    });
  } catch (error) {
    console.error(error);
    return res.render("error", {
      title: "Erro",
      message: "Erro ao atualizar episodio",
    });
  }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    try {
      // Busque os detalhes da notícia no banco de dados pelo ID
      const episodio = await Episodios.findByPk(id);

    if (!episodio) {
      return res.render("error", {
        title: "Ops!",
        message: "episodio não encontrado",
      });
    }

    return res.render("episodio-delete", {
      title: "Deletar episodio",
      episodio,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      title: "Erro",
      message:
        "Ocorreu um erro ao carregar os detalhes do episodio para exclusão",
    });
  }
  },

  destroy: async (req, res) => {
    const { id } = req.params;

   try {
      const episodioToDelete = await Episodios.findByPk(id);

      if (!episodioToDelete) {
        return res.render("error", {
          title: "Ops!",
          message: "episodio não encontrada",
        });
      }

      await episodioToDelete.destroy();

    return res.render("success", {
      title: "episodio Deletado",
      message: "episodio deletado com sucesso!",
    });
  } catch (error) {
    console.error(error);
    return res.render("error", {
      title: "Erro",
      message: "Erro ao deletar episodio",
    });
  }
  },

};

module.exports = episodioController;
