
// Lista dos episodios
const episodios = [
    {
        id: 1,
        nome: "Nanatsu",
        data: "08/08",
        imagem: "/img/episodios-adicionados-onepiece.jpg",

    },

    {
        id: 2,
        nome: "Tokyo Ghoul",
        data: "08/08",
        imagem: "/img/episodios-adicionados-onepiece.jpg",

    },

    {
        id: 3,
        nome: "Bleach",
        data: "08/08",
        imagem: "/img/episodios-adicionados-onepiece.jpg",

    },

    {
        id: 4,
        nome: "One Piece",
        data: "08/08",
        imagem: "/img/episodios-adicionados-onepiece.jpg",

    },

    {
        id: 5,
        nome: "Dororo",
        data: "08/08",
        imagem: "/img/episodios-adicionados-onepiece.jpg",

    },

]

const episodioController = {

// index - controlador da aba que visualiza a lista dos usuario /
// esse codigo renderiza a tabela 'users' dos usuarios
// /Pode retornar uma página ou não
    index: (req, res) => {
        return res.render("episodios", {title: "Lista de Episodios", episodios }) 
        // users: users
    },


// show - controlador que ira visualizar os detalhas de cada usuario da lista 'users' 
    show: (req, res) => {
        const { id } = req.params;

// Esse codigo abaixo ira fazer uma listagem dos id que tem na lista e fazer uma busca pelo usuario
// apresentando uma mensagem caso encontrado ou não 
        const episodioResult = episodios.find((user) => user.id === parseInt(id));
        if(!episodioResult){
            return res.render("error", {
                title: "Ops!", 
                message: "Episodio não encontrado",
            });
        }
        return res.render("episodio", {
            title: "Visualizar Episodio",
            episodio: episodioResult,
        });
    },

    create: (req, res) => {
        return res.render("episodio-create", {title: "Cadastrar Episodio"});
    },
    store: (req, res) => {
        const { nome, data, imagem } = req.body;

        const newUser = {
            id: episodios.length + 1,
            nome,
            data,
            imagem,
  
        };
        episodios.push(newUser)
        return res.render("success", {
            title: "Sucesso!",
            message: "Episodio cadastrado com sucesso",

            
        });
    },

  episodiosAdicionados: (req, res) => {
        return res.render("episodiosAdicionados", {title: "Pagina dos Episodios Adiconados", episodios,});
    },
 };

 index: (req, res) => {
    return res.render("index", {title: "Pagina dos Episodios Adiconados", episodios, listaAnimeAdmin});
},

module.exports = episodioController;

