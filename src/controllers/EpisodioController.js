const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload");
// Lista dos episodios
const episodios = [
  {
    id: 1,
    nome: "Nanatsu",
    data: "08/08",
    imagem: "nanatsu.jpg",
  },

  {
    id: 2,
    nome: "Tokyo Ghoul",
    data: "08/08",
    imagem: "tokyo-ghoul.jpg",
  },

  {
    id: 3,
    nome: "Bleach",
    data: "08/08",
    imagem: "bleach.png",
  },
];

const episodioController = {
  // index - controlador da aba que visualiza a lista dos usuario /
  // esse codigo renderiza a tabela 'users' dos usuarios
  // /Pode retornar uma página ou não
  index: (req, res) => {
    const episodiosWithBase64Imagem = episodios.map((episodio) => ({
      ...episodio,
      imagem: files.base64Encode(upload.path + episodio.imagem),
    }));

    return res.render("episodios", {
      title: "Lista de Episodios",
      episodios,
      episodios: episodiosWithBase64Imagem,
    });
  },

  // show - controlador que ira visualizar os detalhas de cada usuario da lista 'users'
  show: (req, res) => {
    const { id } = req.params;

    // Esse codigo abaixo ira fazer uma listagem dos id que tem na lista e fazer uma busca pelo usuario
    // apresentando uma mensagem caso encontrado ou não
    const episodioResult = episodios.find(
      (episodio) => episodio.id === parseInt(id),
    );
    if (!episodioResult) {
      return res.render("error", {
        title: "Ops!",
        message: "Episodio não encontrado",
      });
    }

    const episodio = {
      ...episodioResult,
      imagem: files.base64Encode(upload.path + episodioResult.imagem),
    };
    return res.render("episodio", {
      title: "Visualizar Episodio",
      episodio,
    });
  },

  create: (req, res) => {
    return res.render("episodio-create", { title: "Cadastrar Episodio" });
  },
  store: (req, res) => {
    const { nome, data } = req.body;
    let filename = "user-default.jpeg";
    if (req.file) {
      filename = req.file.filename;
    }
    const newEpisodio = {
      id: episodios.length + 1,
      nome,
      data,
      imagem: filename,
    };
    episodios.push(newEpisodio);
    return res.render("success", {
      title: "Sucesso!",
      message: "Episodio cadastrado com sucesso",
    });
  },

  episodiosAdicionados: (req, res) => {
    const episodiosWithBase64Imagem = episodios.map((episodio) => ({
      ...episodio,
      imagem: files.base64Encode(upload.path + episodio.imagem),
    }));

    return res.render("episodiosAdicionados", {
      title: "Pagina dos Episodios Adiconados",
      episodios,
      episodios: episodiosWithBase64Imagem,
    });
  },
};

module.exports = episodioController;
