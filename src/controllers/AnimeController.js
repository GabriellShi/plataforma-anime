const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
const path = require("path");

const db = require("../config/sequelize");
const Animes = require("../models/Animes");
const Episodios = require("../models/Episodios");
const Users = require("../models/Users");
const Favoritos = require("../models/Favoritos");

const Comentariosanimes = require("../models/Comentariosanimes");
const { Op } = require("sequelize");
const { Sequelize } = require("../config/sequelize");

const animeController = {
  // index - controlador da aba que visualiza a lista dos usuario /
  // esse codigo renderiza a tabela 'users' dos usuarios
  // /Pode retornar uma página ou não
  index: async (req, res) => {
    try {
      // Busque todas as notícias do banco de dados
      const listaAnimeAdmin = await Animes.findAll({
        order: [["created_at", "DESC"]],
      });

      return res.render("listaAnimeAdmin", {
        title: "Lista de Animes",
        listaAnimeAdmin,
        user: req.cookies.user,
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
    const { id } = req.params;

    // Pega o parametro que vem da url, ou seja, na url a baixo, pegaria o valor 4
    // localhost:3000/user/4
    // id = 4

    const anime = await Animes.findByPk(id, {});

    if (!anime) {
      return res.render("error", {
        title: "Ops!",
        message: "Anime não encontrado",
      });
    }

    const episodios = await Episodios.findAll({
      where: { animes_id: anime.id }, // Filtrar por ID do anime
      order: [["numero_episodio", "ASC"]], // Ordenar por número de episódio, se necessário
    });

    const comentarios = await Comentariosanimes.findAll({
      where: { animes_id: anime.id },
    });

    const animesPopulares = await Animes.findAll({
      order: [
        ["likes", "DESC"], // Ordenar por likes em ordem decrescente
      ],
      limit: 4, // Limitar a 4 resultados
    });

    animesPopulares.sort((a, b) => b.likes - a.likes);

    return res.render("anime", {
      title: "Visualizar Anime",
      anime,
      episodios,
      animesPopulares,
      comentarios,
      user: req.cookies.user, // Passando o objeto user para a página
    });
  },

  adicionarFavorito: async (req, res) => {
    try {
      const userId = req.cookies.user.id;
      const { id } = req.params;
      const animeId = req.params.id;

      // Verifique se o anime já está nos favoritos do usuário
      const favorite = await Favoritos.findOne({
        where: {
          animes_id: animeId,
          users_id: userId,
        },
      });

      if (favorite) {
        console.log("Anime já está nos favoritos do usuário");
        res
          .status(400)
          .json({ message: "Anime já está nos favoritos do usuário" });
      } else {
        // O anime ainda não está nos favoritos do usuário, adicione-o
        await Favoritos.create({
          animes_id: id,
          users_id: userId,
        });

        console.log("Anime adicionado aos favoritos com sucesso");
        res
          .status(200)
          .json({ message: "Anime adicionado aos favoritos com sucesso" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  adicionarFavorito: async (req, res) => {

    try {
        const userId = req.cookies.user.id;
        const animeId = req.params.id; 

        // Verifique se o anime já está nos favoritos do usuário
        const favorite = await Favoritos.findOne({
            where: {
                animes_id: animeId,
                users_id: userId,
            },
        });

        if (favorite) {
            console.log("Anime já está nos favoritos do usuário");
            res.status(400).json({ message: "Anime já está nos favoritos do usuário" });
        } else {
            // O anime ainda não está nos favoritos do usuário, adicione-o
            await Favoritos.create({
                animes_id: animeId,
                users_id: userId,
            });

            console.log("Anime adicionado aos favoritos com sucesso");
            res.status(200).json({ message: "Anime adicionado aos favoritos com sucesso" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
},

  like: async (req, res) => {
    const { id } = req.params;

    try {
      const anime = await Animes.findByPk(id);
      if (!anime) {
        return res.status(404).json({ error: "Anime não encontrado" });
      }

      anime.likes++; // Incrementa o contador de "gostei"
      await anime.save();

      res.json({ likes: anime.likes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  dislike: async (req, res) => {
    const { id } = req.params;

    try {
      const anime = await Animes.findByPk(id);
      if (!anime) {
        return res.status(404).json({ error: "Anime não encontrado" });
      }

      anime.dislikes++; // Incrementa o contador de "não gostei"
      await anime.save();

      res.json({ dislikes: anime.dislikes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  create: async (req, res) => {
    return res.render("anime-create", { title: "Cadastrar Anime" });
  },
  store: async (req, res) => {
    const {
      nome,
      tipo,
      genero,
      autor,
      estudio,
      status,
      sinopse,
      likes,
      dislikes,
      capa,
    } = req.body;

    try {
      const novaAnimes = await Animes.create({
        nome,
        tipo,
        genero,
        autor,
        estudio,
        status,
        sinopse,
        likes,
        dislikes,
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

  storeComment: async (req, res) => {
    const { usuario, email, comentario } = req.body;
    const animeId = req.params.id; // Obtém o ID do anime a partir dos parâmetros da rota

    try {
      await Comentariosanimes.create({
        usuario,
        email,
        comentario,
        animes_id: animeId, // Associa o comentário ao anime
      });

      const comentarios = await Comentariosanimes.findAll({
        where: { animes_id: animeId },
      });

      // Envie os comentários atualizados como resposta JSON
      res.redirect(`/anime/${animeId}`);
    } catch (error) {
      console.error(error);
      // Lida com erros aqui, como enviar uma resposta de erro
    }
  },

  // Controlador para exclusão de comentários
  deleteComment: async (req, res) => {
    const commentId = req.params.commentId; // Obtém o ID do comentário a partir dos parâmetros da rota

    try {
      // Aqui, você deve adicionar a lógica para excluir o comentário com base no commentId
      await Comentariosanimes.destroy({
        where: { id: commentId },
      });

      // Redireciona de volta à página do anime ou envia uma resposta JSON de sucesso
      const animeId = req.params.id; // Obtém o ID do anime a partir dos parâmetros da rota

      // Supondo que você esteja usando o Sequelize, você pode obter os comentários atualizados assim:
      const comentarios = await Comentariosanimes.findAll({
        where: { animes_id: animeId },
      });

      res.json({ success: true, comentarios });
    } catch (error) {
      console.error(error);
      // Lida com erros aqui, como enviar uma resposta de erro
      res.status(500).json({ error: "Erro ao excluir comentário" });
    }
  },

  // Mostra a tela
  edit: async (req, res) => {
    const { id } = req.params;

    try {
      // Busque os detalhes da notícia no banco de dados pelo ID
      const anime = await Animes.findByPk(id);

      const episodios = await Episodios.findAll({
        where: { animes_id: anime.id }, // Filtrar por ID do anime
        order: [["numero_episodio", "ASC"]], // Ordenar por número de episódio, se necessário
      });

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
        animeId: anime.id, // Adicione o ID do anime como uma variável local
        animeNome: anime.nome, // Adicione o nome do anime como uma variável local
      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar os detalhes do Anime para edição",
      });
    }
  },

  // Executa a atualização
  update: async (req, res) => {
    const { id } = req.params;
    const { nome, tipo, genero, autor, estudio, status, sinopse, capa } =
      req.body;

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
