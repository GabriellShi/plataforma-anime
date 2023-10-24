const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
const path = require("path");


const db = require("../config/sequelize");
const Filmes = require("../models/Filmes");
const Episodios = require("../models/Episodios");
const Animes = require("../models/Animes");
const Comentariosfilmes = require("../models/Comentariosfilmes");

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
          user: req.cookies.user,

        
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

    const detailsFilme = await Filmes.findByPk(
      id,
      )

    if (!detailsFilme) {
      return res.render("error", {
        title: "Ops!",
        message: "Filme não encontrado",
      });
    }

    const episodios = await Episodios.findAll({
      where: { filmes_id: detailsFilme.id }, // Filtrar por ID do anime
      order: [['numero_episodio', 'ASC']], // Ordenar por número de episódio, se necessário
  });


  const comentarios = await Comentariosfilmes.findAll({
    where: { filmes_id: detailsFilme.id },
  });


  const filmesPopulares = await Filmes.findAll({
    order: [
        ['likes', 'DESC'], // Ordenar por likes em ordem decrescente
    ],
    limit: 4, // Limitar a 4 resultados
});

filmesPopulares.sort((a, b) => b.likes - a.likes);

function calculatePercentage(filme) {
  const totalLikes = filmesPopulares[0].likes; // Suponha que o anime mais votado esteja no topo
  const percentage = (filme.likes / totalLikes) * 100;
  return percentage.toFixed(1); // Arredonde para uma casa decimal
}

    return res.render("detailsFilme", {
      title: "Visualizar Filme",
      detailsFilme,
      episodios,
      comentarios,
      filmesPopulares,
      filmesPopulares: filmesPopulares.map((filme, index) => ({
        ...filme.get({ plain: true }),
        percentage: calculatePercentage(filme), // Adicione a porcentagem
      })),
      user: req.cookies.user,

    });
  },


  like: async (req, res) => {
    const { id } = req.params;

    try {
        const detailsFilme = await Filmes.findByPk(id);
        if (!detailsFilme) {
            return res.status(404).json({ error: "Anime não encontrado" });
        }

        detailsFilme.likes++; // Incrementa o contador de "gostei"
        await detailsFilme.save();

        res.json({ likes: detailsFilme.likes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
},

dislike: async (req, res) => {
    const { id } = req.params;

    try {
        const detailsFilme = await Filmes.findByPk(id);
        if (!detailsFilme) {
            return res.status(404).json({ error: "Anime não encontrado" });
        }

        detailsFilme.dislikes++; // Incrementa o contador de "não gostei"
        await detailsFilme.save();

        res.json({ dislikes: detailsFilme.dislikes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
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

  storeComment: async (req, res) => {
    const { usuario, email, comentario } = req.body;
    const detailsFilmeId = req.params.id; // Obtém o ID do anime a partir dos parâmetros da rota
  
    try {
      await Comentariosfilmes.create({
        usuario,
        email,
        comentario,
        filmes_id: detailsFilmeId, // Associa o comentário ao anime
      });
  
      const comentarios = await Comentariosfilmes.findAll({
        where: { filmes_id: detailsFilmeId },
      });
  
      // Envie os comentários atualizados como resposta JSON
      res.redirect(`/filme/${detailsFilmeId}`);
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
    await Comentariosfilmes.destroy({
      where: { id: commentId },
    });

    // Redireciona de volta à página do anime ou envia uma resposta JSON de sucesso
    const detailsFilmeId = req.params.id; // Obtém o ID do anime a partir dos parâmetros da rota

    // Supondo que você esteja usando o Sequelize, você pode obter os comentários atualizados assim:
    const comentarios = await Comentariosfilmes.findAll({
      where: { filmes_id: detailsFilmeId },
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
      const detailsFilme = await Filmes.findByPk(id);

    if (!detailsFilme) {
      return res.render("error", {
        title: "Ops!",
        message: "Filme não encontrado",
      });
    }

    const episodios = await Episodios.findAll({
      where: { filmes_id: detailsFilme.id }, // Filtrar por ID do anime
      order: [['numero_episodio', 'ASC']], // Ordenar por número de episódio, se necessário
  });

    return res.render("filme-edit", {
      title: "Editar Filme",
      detailsFilme,
      episodios,
      filmeId: detailsFilme.id, // Adicione o ID do filme como uma variável local
      filmeNome: detailsFilme.nome, // Adicione o nome do filme como uma variável local
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
