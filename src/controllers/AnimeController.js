const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload")

// Lista dos usuarios 
const listaAnimeAdmin = [
    {
        id: 1,
        nome: "One Piece",
        capa: "one-piece.jpg",
        tipo: "Legendado",
        generos: "Ação, Aventura, Fantasia, Super Poder",
        autor: "Eiichiro Oda",
        estudio: "Toei Animation",
        episodios: 1056,
        ovas: 2,
        filmes: 5,
        status: "Lançamento",
        sinopse: "Houve um homem que conquistou tudo aquilo que o mundo tinha a oferecer, o lendário Rei dos Piratas, Gold Roger. Capturado e condenado à execução pelo Governo Mundial, suas últimas palavras lançaram legiões aos mares. “Meu tesouro? Se quiserem, podem pegá-lo. Procurem-no! Ele contém tudo que este mundo pode oferecer!”. Foi a revelação do maior tesouro, o One Piece, cobiçado por homens de todo o mundo, sonhando com fama e riqueza imensuráveis… Assim começou a Grande Era dos Piratas! Monkey D. Luffy de 17 anos, desafia a definição de pirata. Sem a típica personalidade vil e cruel, suas motivações são simples: a aventura e as possibilidades de conhecer novos amigos. Luffy e seus companheiros partem em direção à Grand Line, a mais perigosa das rotas do mundo, em incríveis aventuras, revelando mistérios e enfrentando poderosos oponentes em busca do One Piece.",

    },

    {
        id: 2,
        nome: "Noragami",
        capa: "noragami.jpg",
        tipo: "Legendado",
        generos: "Ação, Aventura, Fantasia, Super Poder",
        autor: "Masashi Kishimoto",
        estudio: "Tv Tokyo",
        episodios: 506,
        ovas: 4,
        filmes: 8,
        status: "Comcluido",
        sinopse: "Houve um adolescente que conquistou tudo aquilo que o mundo tinha a oferecer, o lendário Rei dos Piratas, Gold Roger. Capturado e condenado à execução pelo Governo Mundial, suas últimas palavras lançaram legiões aos mares. “Meu tesouro? Se quiserem, podem pegá-lo. Procurem-no! Ele contém tudo que este mundo pode oferecer!”. Foi a revelação do maior tesouro, o One Piece, cobiçado por homens de todo o mundo, sonhando com fama e riqueza imensuráveis… Assim começou a Grande Era dos Piratas! Monkey D. Luffy de 17 anos, desafia a definição de pirata. Sem a típica personalidade vil e cruel, suas motivações são simples: a aventura e as possibilidades de conhecer novos amigos. Luffy e seus companheiros partem em direção à Grand Line, a mais perigosa das rotas do mundo, em incríveis aventuras, revelando mistérios e enfrentando poderosos oponentes em busca do One Piece.",

    },

    {
        id: 3,
        nome: "Bleach",
        capa: "bleach.jpg",
        tipo: "Legendado",
        generos: "Ação, Aventura, Fantasia, Super Poder",
        autor: "Tv Tokyo",
        estudio: "Toei Animation",
        episodios: 300,
        ovas: 2,
        filmes: 4,
        status: "Lançamento",
        sinopse: "Houve um adolescente que conquistou tudo aquilo que o mundo tinha a oferecer, o lendário Rei dos Piratas, Gold Roger. Capturado e condenado à execução pelo Governo Mundial, suas últimas palavras lançaram legiões aos mares. “Meu tesouro? Se quiserem, podem pegá-lo. Procurem-no! Ele contém tudo que este mundo pode oferecer!”. Foi a revelação do maior tesouro, o One Piece, cobiçado por homens de todo o mundo, sonhando com fama e riqueza imensuráveis… Assim começou a Grande Era dos Piratas! Monkey D. Luffy de 17 anos, desafia a definição de pirata. Sem a típica personalidade vil e cruel, suas motivações são simples: a aventura e as possibilidades de conhecer novos amigos. Luffy e seus companheiros partem em direção à Grand Line, a mais perigosa das rotas do mundo, em incríveis aventuras, revelando mistérios e enfrentando poderosos oponentes em busca do One Piece.",

    },

    {
        id: 4,
        nome: "Daymon Slayer",
        capa: "daymon-slayer.jpg",
        tipo: "Legendado",
        generos: "Ação, Aventura, Fantasia, Super Poder",
        autor: "kite tubo",
        estudio: "mappa",
        episodios: 80,
        ovas: 2,
        filmes: 1,
        status: "Lançamento",
        sinopse: "Houve um caçador de demonio que conquistou tudo aquilo que o mundo tinha a oferecer, o lendário Rei dos Piratas, Gold Roger. Capturado e condenado à execução pelo Governo Mundial, suas últimas palavras lançaram legiões aos mares. “Meu tesouro? Se quiserem, podem pegá-lo. Procurem-no! Ele contém tudo que este mundo pode oferecer!”. Foi a revelação do maior tesouro, o One Piece, cobiçado por homens de todo o mundo, sonhando com fama e riqueza imensuráveis… Assim começou a Grande Era dos Piratas! Monkey D. Luffy de 17 anos, desafia a definição de pirata. Sem a típica personalidade vil e cruel, suas motivações são simples: a aventura e as possibilidades de conhecer novos amigos. Luffy e seus companheiros partem em direção à Grand Line, a mais perigosa das rotas do mundo, em incríveis aventuras, revelando mistérios e enfrentando poderosos oponentes em busca do One Piece.",

    },

    {
        id: 5,
        nome: "Dororo",
        capa: "dororo.jpg",
        tipo: "Legendado",
        generos: "Ação, Aventura, Fantasia, Super Poder",
        autor: "Eiichiro Oda",
        estudio: "Toei Animation",
        episodios: 1056,
        ovas: 2,
        filmes: 5,
        status: "Lançamento",
        sinopse: "Houve um homem que conquistou tudo aquilo que o mundo tinha a oferecer, o lendário Rei dos Piratas, Gold Roger. Capturado e condenado à execução pelo Governo Mundial, suas últimas palavras lançaram legiões aos mares. “Meu tesouro? Se quiserem, podem pegá-lo. Procurem-no! Ele contém tudo que este mundo pode oferecer!”. Foi a revelação do maior tesouro, o One Piece, cobiçado por homens de todo o mundo, sonhando com fama e riqueza imensuráveis… Assim começou a Grande Era dos Piratas! Monkey D. Luffy de 17 anos, desafia a definição de pirata. Sem a típica personalidade vil e cruel, suas motivações são simples: a aventura e as possibilidades de conhecer novos amigos. Luffy e seus companheiros partem em direção à Grand Line, a mais perigosa das rotas do mundo, em incríveis aventuras, revelando mistérios e enfrentando poderosos oponentes em busca do One Piece.",

    },

    {
        id: 6,
        nome: "Dragon Ball",
        capa: "dragon-ball.jpg",
        tipo: "Concluido",
        generos: "Ação, Aventura, Fantasia, Super Poder",
        autor: "Masashi Kishimoto",
        estudio: "Tv Tokyo",
        episodios: 506,
        ovas: 4,
        filmes: 8,
        status: "Comcluido",
        sinopse: "Houve um menino que conquistou tudo aquilo que o mundo tinha a oferecer, o lendário Rei dos Piratas, Gold Roger. Capturado e condenado à execução pelo Governo Mundial, suas últimas palavras lançaram legiões aos mares. “Meu tesouro? Se quiserem, podem pegá-lo. Procurem-no! Ele contém tudo que este mundo pode oferecer!”. Foi a revelação do maior tesouro, o One Piece, cobiçado por homens de todo o mundo, sonhando com fama e riqueza imensuráveis… Assim começou a Grande Era dos Piratas! Monkey D. Luffy de 17 anos, desafia a definição de pirata. Sem a típica personalidade vil e cruel, suas motivações são simples: a aventura e as possibilidades de conhecer novos amigos. Luffy e seus companheiros partem em direção à Grand Line, a mais perigosa das rotas do mundo, em incríveis aventuras, revelando mistérios e enfrentando poderosos oponentes em busca do One Piece.",

    },

]

const episodios = [
    {

        id: 1,
        nome: "One Piece - está em animeController",
        data: "/08/08",
        imagem: "/img/episodios-adicionados-onepiece.jpg",
    },
    
    {
        id: 2,
        nome: "Tokyo Ghoul - está em animeController",
        data: "/08/08",
        imagem: "/img/episodios-adicionados-onepiece.jpg",
    },
]


module.exports = { listaAnimeAdmin};




const animeController = {

// index - controlador da aba que visualiza a lista dos usuario /
// esse codigo renderiza a tabela 'users' dos usuarios
// /Pode retornar uma página ou não
    index: (req, res) => {
        const listaAnimeAdminWithBase64Capa = listaAnimeAdmin.map((anime) => ({
            ...anime,
            capa: files.base64Encode(upload.path + anime.capa),
          }));
          
          return res.render("listaAnimeAdmin", {
            title: "Lista de Anime",  listaAnimeAdmin, episodios,
            listaAnimeAdmin: listaAnimeAdminWithBase64Capa,
          });
          
        },


// show - controlador que ira visualizar os detalhas de cada usuario da lista 'users' 
show: (req, res) => {
    // Pega o parametro que vem da url, ou seja, na url a baixo, pegaria o valor 4
    // localhost:3000/user/4
    // id = 4
    const { id } = req.params;
    const animeResult = listaAnimeAdmin.find((anime) => anime.id === parseInt(id));
    if (!animeResult) {
      return res.render("error", {
        title: "Ops!",
        message: "Usuário não encontrado",
      });
    }
    const anime = {
      ...animeResult,
      capa: files.base64Encode(
        upload.path + animeResult.capa
      ),
    };
    return res.render("anime", {
      title: "Visualizar usuário",
      anime, episodios,
    });
  },

    create: (req, res) => {
        return res.render("anime-create", {title: "Cadastrar Anime"});
    },
    store: (req, res) => {
        const { nome, tipo, generos, autor, estudio, status, sinopse, } = req.body;
        let filename = "user-default.jpeg";
        if(req.file){
            filename = req.file.filename;
        }
        const newAnime = {
            id: listaAnimeAdmin.length + 1,
            nome, 
            tipo, 
            generos, 
            autor, 
            estudio, 
            status, 
            sinopse, 
            capa: filename,
        };
        listaAnimeAdmin.push(newAnime)
        return res.render("success", {
            title: "Sucesso!",
            message: "Anime cadastrado com sucesso",

            
        });
    },

       // Mostra a tela 
       edit: (req, res) => {
        const { id } = req.params;

        // Esse codigo abaixo ira fazer uma listagem dos id que tem na lista e fazer uma busca pelo usuario
        // apresentando uma mensagem caso encontrado ou não 
                const animeResult = listaAnimeAdmin.find((anime) => anime.id === parseInt(id));
                if(!animeResult){
                    return res.render("error", {
                        title: "Ops!",  
                        message: "Anime não encontrado",
                    });
                }

                const anime = {
                    ...animeResult,
                    capa: files.base64Encode (upload.path + animeResult.capa),
                }
                return res.render("anime-edit", {
                    title: "Editar Anime", listaAnimeAdmin, episodios,
                    anime,
                })
                
    },

// Executa a atualização 
    update: (req, res) => {
        const { id } = req.params;
        const { nome, nomedeuser, senha, email, tipo, generos, autor, estudio, status, sinopse} = req.body;
      
        // Esse codigo abaixo ira fazer uma listagem dos id que tem na lista e fazer uma busca pelo usuario
        // apresentando uma mensagem caso encontrado ou não 
                const animeResult = listaAnimeAdmin.find((anime) => anime.id === parseInt(id));
                let filename;
                if(req.file){
                    filename = req.file.filename;
                }
                if(!animeResult){
                    return res.render("error", {
                        title: "Ops!", 
                        message: "Anime não encontrado",
                    });
                }

                const updateAnime = animeResult
                if(nome) updateAnime.nome = nome
                if(nomedeuser) updateAnime.nomedeuser = nomedeuser
                if(senha) updateAnime.senha = senha
                if(email) updateAnime.email = email
                if(tipo) updateAnime.tipo = tipo
                if(generos) updateAnime.generos = generos
                if(autor) updateAnime.autor = autor
                if(estudio) updateAnime.estudio = estudio
                if(status) updateAnime.status = status
                if(sinopse) updateAnime.sinopse = sinopse
                if(filename) {
                    let capaTmp = updateAnime.capa;
                    fs.unlinkSync(upload.path + capaTmp);
                    updateAnime.capa = filename;
                }
                return res.render("success", {
                    title: "Anime Atualizado",
                    message: `Anime ${updateAnime.nome} foi atualizado`,
                })
    },

    delete: (req, res) =>{
        const { id } = req.params;

        // Esse codigo abaixo ira fazer uma listagem dos id que tem na lista e fazer uma busca pelo usuario
        // apresentando uma mensagem caso encontrado ou não 
                const animeResult = listaAnimeAdmin.find((anime) => anime.id === parseInt(id));
                if(!animeResult){
                    return res.render("error", {
                        title: "Ops!", 
                        message: "Anime não encontrado",
                    });
                }

                const anime = {
                    ...animeResult,
                    capa: files.base64Encode (upload.path + animeResult.capa),
                };
                return res.render("anime-edit", {
                    title: "Deletar Anime",
                    anime,
                })
    }, 

    destroy: (req, res) =>{
        const { id } = req.params;

        // Esse codigo abaixo ira fazer uma listagem dos id que tem na lista e fazer uma busca pelo usuario
        // apresentando uma mensagem caso encontrado ou não 
                const result = listaAnimeAdmin.findIndex((anime) => anime.id === parseInt(id));
                if(!result === -1   ){
                    return res.render("error", {
                        title: "Ops!", 
                        message: "Anime não encontrado",
                    });
                }

                fs.unlinkSync(upload.path + listaAnimeAdmin[result].capa);

                listaAnimeAdmin.splice(result, 1)
                return res.render("success", {
                    title: "Anime Deletado",
                    message: "Anime deletado com sucesso!"
                })
    },




    listaAnimeUsuario:  (req, res) => {
        const listaAnimeAdminWithBase64Capa = listaAnimeAdmin.map((anime) => ({
            ...anime,
            capa: files.base64Encode(upload.path + anime.capa),
          }));
          
          return res.render("listaAnimeUsuario", {
            title: "Lista de Anime",  listaAnimeAdmin, episodios,
            listaAnimeAdmin: listaAnimeAdminWithBase64Capa,
          });
      
},








};

module.exports = animeController;

