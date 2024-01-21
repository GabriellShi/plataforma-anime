const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
const path = require("path");

const db = require("../config/sequelize");
const Animes = require("../models/Animes");
const Episodios = require("../models/Episodios");
const Filmes = require("../models/Filmes");
const { Op } = require("sequelize");
const { Sequelize } = require("../config/sequelize")

const indexController = {
    index: async (req, res) => {
      try {



        // const filmes = await Filmes.findAll({
        //   order: [['created_at', 'DESC']]
        // });
        const categoriaSelecionada = req.query.categoria || "recentes";

        let filmes;
        let animes;
        let episodios;
    
        if (categoriaSelecionada === "all") {
          filmes = await Filmes.findAll({
            order: [['created_at', 'DESC']]
          });

          animes = await Animes.findAll({
            order: [['created_at', 'DESC']]
          });

          episodios = await Episodios.findAll({
            order: [['created_at', 'DESC']]
          });
        } else if (categoriaSelecionada === "recentes") {
          filmes = await Filmes.findAll({
            where: {
              created_at: {
                [Op.gte]: new Date(new Date().getFullYear(), 0, 1),
              },
            },
            order: [['created_at', 'DESC']]
          });

          animes = await Animes.findAll({
            where: {
              created_at: {
                [Op.gte]: new Date(new Date().getFullYear(), 0, 1),
              },
            },
            order: [['created_at', 'DESC']]
          });

          episodios = await Episodios.findAll({
            where: {
              created_at: {
                [Op.gte]: new Date(new Date().getFullYear(), 0, 1),
              },
            },
            order: [['created_at', 'DESC']]
          });
        }
    

        
        const listaAnimeAdmin = await Animes.findAll({
          order: [['created_at', 'DESC']]
        });

        // const episodios = await Episodios.findAll({
        //   order: [['created_at', 'DESC']]
        // });



        const animesPopulares = await Animes.findAll({
          order: [
            ['likes', 'DESC'], // Ordenar por likes em ordem decrescente
          ],
          limit: 4, // Limitar a 4 resultados
        });

        // Ira ajustar a ordem que não está funcionando no DESC 
        animesPopulares.sort((a, b) => b.likes - a.likes);

        const gruposAnimes = chunkArray(animes, 5);
        
        // Função para calcular a porcentagem com base nos votos
        function calculatePercentage(anime) {
          const totalLikes = animesPopulares[0].likes; // Suponha que o anime mais votado esteja no topo
          const percentage = (anime.likes / totalLikes) * 100;
          return percentage.toFixed(1); // Arredonde para uma casa decimal
        }

        // Função para dividir um array em grupos de tamanho especificado
        function chunkArray(array, chunkSize) {
          const chunks = [];
          for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
          }
          return chunks; // Adicione esta linha para retornar o array de grupos
        }

        return res.render("index", {
          title: "plataforma de animes",
          listaAnimeAdmin,
          episodios,
          filmes,
          animes,
          chunkArray,
          categoriaSelecionada,
          gruposAnimes: gruposAnimes,
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
          message: "Ocorreu um erro ao carregar a lista de Animes",
        });
      }
    },
  };

module.exports = indexController;
