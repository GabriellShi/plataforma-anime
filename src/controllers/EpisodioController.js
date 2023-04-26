
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
        data: "/08/08",
        imagem: "/img/episodios-adicionados-onepiece.jpg",

    },

]

const episodioController = {

// index - controlador da aba que visualiza a lista dos usuario /
// esse codigo renderiza a tabela 'users' dos usuarios
// /Pode retornar uma página ou não
    index: (req, res) => {
        return res.render("episodios", {title: "Lista de Usuarios", episodios }) 
        // users: users
    },


// show - controlador que ira visualizar os detalhas de cada usuario da lista 'users' 
    show: (req, res) => {
        const { id } = req.params;

// Esse codigo abaixo ira fazer uma listagem dos id que tem na lista e fazer uma busca pelo usuario
// apresentando uma mensagem caso encontrado ou não 
        const userResult = episodios.find((user) => user.id === parseInt(id));
        if(!userResult){
            return res.render("error", {
                title: "Ops!", 
                message: "Usuario não encontrado",
            });
        }
        return res.render("episodio", {
            title: "Visualizar usuario",
            episodio: userResult,
        });
    },

    create: (req, res) => {
        return res.render("episodio-create", {title: "Cadastrar Usuario"});
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
            message: "Usuario cadastrado com sucesso",

            
        });
    },
 };

module.exports = episodioController;

