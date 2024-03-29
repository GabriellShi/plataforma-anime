const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
const path = require("path");

const db = require("../config/sequelize");
const Animes = require("../models/Animes");
const Episodios = require("../models/Episodios");
const Filmes = require("../models/Filmes");
const Doramas = require("../models/Doramas");
const Comentariosepisodios = require("../models/Comentariosepisodios");
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
      user: req.cookies.user,

      
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
      const episodio = await Episodios.findByPk(
        id,
        );
  
      if (!episodio) {
        return res.render("error", {
          title: "Ops!",
          message: "Episódio não encontrado",
        });
      }
  
      // Em seguida, obtenha o ID do anime relacionado a esse episódio
      const animeId = episodio.animes_id;

      const filmeId = episodio.filmes_id;

      const doramaId = episodio.doramas_id;

      // Agora, busque o anime com base no animeId
      const anime = await Animes.findByPk(animeId);

      const detailsFilme = await Filmes.findByPk(filmeId);

      const detailsDorama = await Doramas.findByPk(doramaId);


      // Em seguida, busque todos os episódios relacionados a esse anime
      const episodios = await Episodios.findAll({
        where: {
          animes_id: animeId,
          filmes_id: filmeId,
          doramas_id: doramaId
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

          const comentarios = await Comentariosepisodios.findAll({
            where: { episodios_id: episodio.id },
          });

         const quantidadeComentarios = comentarios.length;


          const animesPopulares = await Animes.findAll({
            order: [
                ['likes', 'DESC'], // Ordenar por likes em ordem decrescente
            ],
            limit: 4, // Limitar a 4 resultados
        });
      
        animesPopulares.sort((a, b) => b.likes - a.likes);

              // Função para calcular a porcentagem com base nos votos
      function calculatePercentage(anime) {
        const totalLikes = animesPopulares[0].likes; // Suponha que o anime mais votado esteja no topo
        const percentage = (anime.likes / totalLikes) * 100;
        return percentage.toFixed(1); // Arredonde para uma casa decimal
      }
  
      return res.render("episodio", {
        title: "Visualizar Episódio",
        episodio,
        anime,
        detailsFilme,
        detailsDorama,
        episodios,
        previousEpisode,
        nextEpisode,
        comentarios,
        quantidadeComentarios,
        animesPopulares: animesPopulares.map((anime, index) => ({
          ...anime.get({ plain: true }),
          percentage: calculatePercentage(anime), // Adicione a porcentagem
        })),
      user: req.cookies.user,


      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar os detalhes do episódio",
      });
    }
  },
  
  likeComment: async (req, res) => {
    const { id, commentId } = req.params;
  
    try {
      const comentario = await Comentariosepisodios.findByPk(commentId);
      if (!comentario) {
        return res.status(404).json({ error: "Comentário não encontrado" });
      }
  
      comentario.likescomentarios++; // Incrementa o contador de "gostei" no comentário
      await comentario.save();
  
      res.json({ likes: comentario.likescomentarios });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  
  dislikeComment: async (req, res) => {
    const { id, commentId } = req.params;
  
    try {
      const comentario = await Comentariosepisodios.findByPk(commentId);
      if (!comentario) {
        return res.status(404).json({ error: "Comentário não encontrado" });
      }
  
      comentario.dislikescomentarios++; // Incrementa o contador de "não gostei" no comentário
      await comentario.save();
  
      res.json({ dislikes: comentario.dislikescomentarios });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  
  showAntigo: async (req, res) => {
   
    try {
      const { id } = req.params;
  
      // Primeiro, encontre o episódio pelo ID
      const episodio = await Episodios.findByPk(
        id,
        );
  
      if (!episodio) {
        return res.render("error", {
          title: "Ops!",
          message: "Episódio não encontrado",
        });
      }
  
      // Em seguida, obtenha o ID do anime relacionado a esse episódio
      const animeId = episodio.animes_id;

      const filmeId = episodio.filmes_id;

      const doramaId = episodio.doramas_id;

      // Agora, busque o anime com base no animeId
      const anime = await Animes.findByPk(animeId);

      const detailsFilme = await Filmes.findByPk(filmeId);

      const detailsDorama = await Doramas.findByPk(doramaId);


      // Em seguida, busque todos os episódios relacionados a esse anime
      const episodios = await Episodios.findAll({
        where: {
          animes_id: animeId,
          filmes_id: filmeId,
          doramas_id: doramaId
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

          const comentarios = await Comentariosepisodios.findAll({
            where: { episodios_id: episodio.id },
            order: [['created_at', 'ASC']], // Filtrar os comentários mais antigos primeiro
          });

          const quantidadeComentarios = comentarios.length;

      
          const animesPopulares = await Animes.findAll({
            order: [
                ['likes', 'DESC'], // Ordenar por likes em ordem decrescente
            ],
            limit: 4, // Limitar a 4 resultados
        });
      
        animesPopulares.sort((a, b) => b.likes - a.likes);

              // Função para calcular a porcentagem com base nos votos
      function calculatePercentage(anime) {
        const totalLikes = animesPopulares[0].likes; // Suponha que o anime mais votado esteja no topo
        const percentage = (anime.likes / totalLikes) * 100;
        return percentage.toFixed(1); // Arredonde para uma casa decimal
      }
  
      return res.render("episodio", {
        title: "Visualizar Episódio",
        episodio,
        anime,
        detailsFilme,
        detailsDorama,
        episodios,
        previousEpisode,
        nextEpisode,
        comentarios,
        quantidadeComentarios,
        animesPopulares: animesPopulares.map((anime, index) => ({
          ...anime.get({ plain: true }),
          percentage: calculatePercentage(anime), // Adicione a porcentagem
        })),
      user: req.cookies.user,


      });
    } catch (error) {
      console.error(error);
      return res.status(500).render("error", {
        title: "Erro",
        message: "Ocorreu um erro ao carregar os detalhes do episódio",
      });
    }

},

showRecente: async (req, res) => {
  try {
    const { id } = req.params;

    // Primeiro, encontre o episódio pelo ID
    const episodio = await Episodios.findByPk(
      id,
      );

    if (!episodio) {
      return res.render("error", {
        title: "Ops!",
        message: "Episódio não encontrado",
      });
    }

    // Em seguida, obtenha o ID do anime relacionado a esse episódio
    const animeId = episodio.animes_id;

    const filmeId = episodio.filmes_id;

    const doramaId = episodio.doramas_id;

    // Agora, busque o anime com base no animeId
    const anime = await Animes.findByPk(animeId);

    const detailsFilme = await Filmes.findByPk(filmeId);

    const detailsDorama = await Doramas.findByPk(doramaId);


    // Em seguida, busque todos os episódios relacionados a esse anime
    const episodios = await Episodios.findAll({
      where: {
        animes_id: animeId,
        filmes_id: filmeId,
        doramas_id: doramaId
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

        const comentarios = await Comentariosepisodios.findAll({
          where: { episodios_id: episodio.id },
          order: [['created_at', 'DESC']], // Filtrar os comentários mais antigos primeiro
        });

        const quantidadeComentarios = comentarios.length;
    
        const animesPopulares = await Animes.findAll({
          order: [
              ['likes', 'DESC'], // Ordenar por likes em ordem decrescente
          ],
          limit: 4, // Limitar a 4 resultados
      });
    
      animesPopulares.sort((a, b) => b.likes - a.likes);

            // Função para calcular a porcentagem com base nos votos
    function calculatePercentage(anime) {
      const totalLikes = animesPopulares[0].likes; // Suponha que o anime mais votado esteja no topo
      const percentage = (anime.likes / totalLikes) * 100;
      return percentage.toFixed(1); // Arredonde para uma casa decimal
    }

    return res.render("episodio", {
      title: "Visualizar Episódio",
      episodio,
      anime,
      detailsFilme,
      detailsDorama,
      episodios,
      previousEpisode,
      nextEpisode,
      comentarios,
      quantidadeComentarios,
      animesPopulares: animesPopulares.map((anime, index) => ({
        ...anime.get({ plain: true }),
        percentage: calculatePercentage(anime), // Adicione a porcentagem
      })),
    user: req.cookies.user,


    });
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      title: "Erro",
      message: "Ocorreu um erro ao carregar os detalhes do episódio",
    });
  }

},

storeComment: async (req, res) => {
  const { usuario, email, comentario } = req.body;
  const episodioId = req.params.id; // Obtém o ID do anime a partir dos parâmetros da rota

  try {
    await Comentariosepisodios.create({
      usuario,
      email,
      comentario,
      episodios_id: episodioId, // Associa o comentário ao anime
    });

    const comentarios = await Comentariosepisodios.findAll({
      where: { episodios_id: episodioId },
    });

    // Envie os comentários atualizados como resposta JSON
    res.redirect(`/episodio/${episodioId}`);
  } catch (error) {
    console.error(error);
    // Lida com erros aqui, como enviar uma resposta de erro
  }
},

  create: async (req, res) => {

    return res.render("episodio-create", {
      title: "Cadastrar Episodio"
     });
  },
  
  store: async (req, res) => {
    const { nome, data, image, animes_id, filmes_id, doramas_id, numero_episodio, video_url, categoria } = req.body;

    try {
        const novosEpisodios = await Episodios.create({
            nome,
            data,
            image,
            animes_id,
            filmes_id,
            doramas_id,
            numero_episodio,
            video_url,
            categoria,
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

storeComment: async (req, res) => {
  const { usuario, email, comentario } = req.body;
  const episodioId = req.params.id; // Obtém o ID do anime a partir dos parâmetros da rota

  try {
    await Comentariosepisodios.create({
      usuario,
      email,
      comentario,
      episodios_id: episodioId, // Associa o comentário ao anime
    });

    const comentarios = await Comentariosepisodios.findAll({
      where: { episodios_id: episodioId },
    });

    // Envie os comentários atualizados como resposta JSON
    res.redirect(`/episodio/${episodioId}`);
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
  await Comentariosepisodios.destroy({
    where: { id: commentId },
  });

  // Redireciona de volta à página do anime ou envia uma resposta JSON de sucesso
  const episodioId = req.params.id; // Obtém o ID do anime a partir dos parâmetros da rota

  // Supondo que você esteja usando o Sequelize, você pode obter os comentários atualizados assim:
  const comentarios = await Comentariosepisodios.findAll({
    where: { episodios_id: episodioId },
  });

  res.json({ success: true, comentarios });
} catch (error) {
  console.error(error);
  // Lida com erros aqui, como enviar uma resposta de erro
  res.status(500).json({ error: "Erro ao excluir comentário" });
}
},

  edit: async (req, res) => {
    const { id } = req.params;

    try {

      const anime = await Animes.findByPk(id);

      // Busque os detalhes da notícia no banco de dados pelo ID

      const episodio = await Episodios.findByPk(id);

      const detailsFilme = await Filmes.findByPk(id);

      const detailsDorama = await Doramas.findByPk(id);


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
      detailsDorama,

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
    const { nome, data, image, animes_id, filmes_id, doramas_id, numero_episodio, video_url, categoria} = req.body;


    try {
      const episodioToUpdate = await Episodios.findByPk(id);
  
      await episodioToUpdate.update({
        nome,
        data,
        image,
        animes_id,
        filmes_id,
        doramas_id,
        numero_episodio,
        video_url,
        categoria,
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
