const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
const path = require("path");


const db = require("../config/sequelize");
const Filmes = require("../models/Filmes");
const Episodios = require("../models/Episodios");
const Doramas = require("../models/Doramas");
const Favoritos = require("../models/Favoritos");
const Animes = require("../models/Animes");
const Comentariosdoramas = require("../models/Comentariosdoramas");

const { Op } = require("sequelize");
const { Sequelize } = require("../config/sequelize")



const detailsDoramaController = {
  // index - controlador da aba que visualiza a lista dos usuario /
  // esse codigo renderiza a tabela 'users' dos usuarios
  // /Pode retornar uma página ou não
  index: async (req, res) => {

      try {
        // Busque todas as notícias do banco de dados
        const doramas = await Doramas.findAll({
        });
  
        return res.render("dorama", {
          title: "Lista de Doramas",
          doramas,
          user: req.cookies.user,

        
        });
      } catch (error) {
        console.error(error);
        return res.status(500).render("error", {
          title: "Erro",
          message: "Ocorreu um erro ao carregar a lista de Doramas",
        });
      }
    },


  // show - controlador que ira visualizar os detalhas de cada usuario da lista 'users'
  show: async (req, res) => {

    // Pega o parametro que vem da url, ou seja, na url a baixo, pegaria o valor 4
    // localhost:3000/user/4
    // id = 4
    const { id } = req.params;

    const detailsDorama = await Doramas.findByPk(
      id,
      )

    if (!detailsDorama) {
      return res.render("error", {
        title: "Ops!",
        message: "doramas não encontrado",
      });
    }

    const episodios = await Episodios.findAll({
      where: { doramas_id: detailsDorama.id }, // Filtrar por ID do anime
      order: [['numero_episodio', 'ASC']], // Ordenar por número de episódio, se necessário
  });


  const comentarios = await Comentariosdoramas.findAll({
    where: { doramas_id: detailsDorama.id },
  });


  const doramasPopulares = await Doramas.findAll({
    order: [
        ['likes', 'DESC'], // Ordenar por likes em ordem decrescente
    ],
    limit: 4, // Limitar a 4 resultados
});

doramasPopulares.sort((a, b) => b.likes - a.likes);

function calculatePercentage(dorama) {
  const totalLikes = doramasPopulares[0].likes; // Suponha que o anime mais votado esteja no topo
  const percentage = (dorama.likes / totalLikes) * 100;
  return percentage.toFixed(1); // Arredonde para uma casa decimal
}

    return res.render("detailsDorama", {
      title: "Visualizar dorama",
      detailsDorama,
      episodios,
      comentarios,
      doramasPopulares,
      doramasPopulares: doramasPopulares.map((dorama, index) => ({
        ...dorama.get({ plain: true }),
        percentage: calculatePercentage(dorama), // Adicione a porcentagem
      })),
      user: req.cookies.user,

    });
  },

  adicionarFavorito: async (req, res) => {
    try {
      const userId = req.cookies.user.id;
      const { id } = req.params;
      const detailsDoramaId = req.params.id;

      // Verifique se o anime já está nos favoritos do usuário
      const favorite = await Favoritos.findOne({
        where: {
          doramas_id: detailsDoramaId,
          users_id: userId,
        },
      });

      if (favorite) {
        console.log("Dorama já está nos favoritos do usuário");
        res
          .status(400)
          .json({ message: "Dorama já está nos favoritos do usuário" });
      } else {
        // O anime ainda não está nos favoritos do usuário, adicione-o
        await Favoritos.create({
          doramas_id: id,
          users_id: userId,
        });

        console.log("Dorama adicionado aos favoritos com sucesso");
        res
          .status(200)
          .json({ message: "Dorama adicionado aos favoritos com sucesso" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },

  adicionarFavorito: async (req, res) => {

    try {
        const userId = req.cookies.user.id;
        const detailsDoramaId = req.params.id; 

        // Verifique se o anime já está nos favoritos do usuário
        const favorite = await Favoritos.findOne({
            where: {
                doramas_id: detailsDoramaId,
                users_id: userId,
            },
        });

        if (favorite) {
            console.log("Dorama já está nos favoritos do usuário");
            res.status(400).json({ message: "Dorama já está nos favoritos do usuário" });
        } else {
            // O anime ainda não está nos favoritos do usuário, adicione-o
            await Favoritos.create({
                doramas_id: detailsDoramaId,
                users_id: userId,
            });

            console.log("Dorama adicionado aos favoritos com sucesso");
            res.status(200).json({ message: "Dorama adicionado aos favoritos com sucesso" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
},


  like: async (req, res) => {
    const { id } = req.params;

    try {
        const detailsDorama = await Doramas.findByPk(id);
        if (!detailsDorama) {
            return res.status(404).json({ error: "Anime não encontrado" });
        }

        detailsDorama.likes++; // Incrementa o contador de "gostei"
        await detailsDorama.save();

        res.json({ likes: detailsDorama.likes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
},

dislike: async (req, res) => {
    const { id } = req.params;

    try {
        const detailsDorama = await Doramas.findByPk(id);
        if (!detailsDorama) {
            return res.status(404).json({ error: "Anime não encontrado" });
        }

        detailsDorama.dislikes++; // Incrementa o contador de "não gostei"
        await detailsDorama.save();

        res.json({ dislikes: detailsDorama.dislikes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
},

  create: async (req, res) => {
    return res.render("dorama-create", { title: "Cadastrar Dorama" });
  },
  store: async (req, res) => {
    const { nome, tipo, genero, autor, estudio, sinopse, capa } = req.body;

    try {

    const novaDorama = await Doramas.create({
      nome,
      tipo,
      genero,
      autor,
      estudio,
      sinopse,
      capa: capa,
    });


    res.redirect("/dorama");
  } catch (error) {
    console.error(error); // Adicione essa linha para registrar o erro no console
    res.render("dorama-create", {
      title: "Erro",
      message: "Erro ao Cadastrar Dorama!",
    });
  }
  },

  storeComment: async (req, res) => {
    const { usuario, email, comentario } = req.body;
    const detailsDoramaId = req.params.id; // Obtém o ID do anime a partir dos parâmetros da rota
  
    try {
      await Comentariosdoramas.create({
        usuario,
        email,
        comentario,
        doramas_id: detailsDoramaId, // Associa o comentário ao anime
      });
  
      const comentarios = await Comentariosdoramas.findAll({
        where: { doramas_id: detailsDoramaId },
      });
  
      // Envie os comentários atualizados como resposta JSON
      res.redirect(`/dorama/${detailsDoramaId}`);
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
    await Comentariosdoramas.destroy({
      where: { id: commentId },
    });

    // Redireciona de volta à página do anime ou envia uma resposta JSON de sucesso
    const detailsDoramaId = req.params.id; // Obtém o ID do anime a partir dos parâmetros da rota

    // Supondo que você esteja usando o Sequelize, você pode obter os comentários atualizados assim:
    const comentarios = await Comentariosdoramas.findAll({
      where: { doramas_id: detailsDoramaId },
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
      const detailsDorama = await Doramas.findByPk(id);

    if (!detailsDorama) {
      return res.render("error", {
        title: "Ops!",
        message: "Dorama não encontrado",
      });
    }

    const episodios = await Episodios.findAll({
      where: { doramas_id: detailsDorama.id }, // Filtrar por ID do anime
      order: [['numero_episodio', 'ASC']], // Ordenar por número de episódio, se necessário
  });

    return res.render("dorama-edit", {
      title: "Editar Dorama",
      detailsDorama,
      episodios,
      doramaId: detailsDorama.id, // Adicione o ID do filme como uma variável local
      doramaNome: detailsDorama.nome, // Adicione o nome do filme como uma variável local
    });
  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      title: "Erro",
      message:
        "Ocorreu um erro ao carregar os detalhes do dorama para edição",
    });
  }
  },

  // Executa a atualização
  update: async (req, res) => {
    const { id } = req.params;
    const { nome, tipo, genero, autor, estudio, sinopse, capa } = req.body;

    try {
      const doramaToUpdate = await Doramas.findByPk(id);
  
      await doramaToUpdate.update({
        nome,
        tipo,
        genero,
        autor,
        estudio,
        sinopse,
        capa: capa,
      });

    return res.render("success", {
      title: "Dorama Atualizado",
      message: `Dorama ${doramaToUpdate.nome} foi atualizado`,
    });
  } catch (error) {
    console.error(error);
    return res.render("error", {
      title: "Erro",
      message: "Erro ao atualizar dorama",
    });
  }
  },

  delete: async (req, res) => {
    const { id } = req.params;

    try {
      // Busque os detalhes da notícia no banco de dados pelo ID
      const detailsDorama = await Doramas.findByPk(id);

    if (!detailsDorama) {
      return res.render("error", {
        title: "Ops!",
        message: "dorama não encontrado",
      });
    }

    return res.render("dorama-delete", {
      title: "Deletar dorama",
      detailsDorama,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).render("error", {
      title: "Erro",
      message:
        "Ocorreu um erro ao carregar os detalhes do doramas para exclusão",
    });
  }
  },

  destroy: async (req, res) => {
    const { id } = req.params;

   try {
      const doramaToDelete = await Doramas.findByPk(id);

      if (!doramaToDelete) {
        return res.render("error", {
          title: "Ops!",
          message: "dorama não encontrada",
        });
      }

      await doramaToDelete.destroy();

    return res.render("success", {
      title: "dorama Deletado",
      message: "dorama deletado com sucesso!",
    });
  } catch (error) {
    console.error(error);
    return res.render("error", {
      title: "Erro",
      message: "Erro ao deletar dorama",
    });
  }
  },


};

module.exports = detailsDoramaController;
