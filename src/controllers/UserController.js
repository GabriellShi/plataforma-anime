
// Lista dos usuarios 
const users = [
    {
        id: 1,
        nome: "Gabriel",
        nomedeuser: "Oliveira",
        email: "gabriel@gmail.com",
        senha: 23,
    },

    {
        id: 2,
        nome: "Rafael",
        nomedeuser: "Ferreira",
        email: "bruno@gmail.com",
        senha: 19,
    },

    {
        id: 3,
        nome: "Beatriz",
        nomedeuser: "Costa",
        email: "beah@gmail.com",
        senha: 21,
    },

    {
        id: 4,
        nome: "joana",
        nomedeuser: "oliveira",
        email: "joana196@gmail.com",
        senha: 43,
    },
]

const userController = {

// index - controlador da aba que visualiza a lista dos usuario /
// esse codigo renderiza a tabela 'users' dos usuarios
// /Pode retornar uma página ou não
    index: (req, res) => {
        return res.render("users", {title: "Lista de Usuarios", users }) 
        // users: users
    },

// show - controlador que ira visualizar os detalhas de cada usuario da lista 'users' 
    show: (req, res) => {
        const { id } = req.params;

// Esse codigo abaixo ira fazer uma listagem dos id que tem na lista e fazer uma busca pelo usuario
// apresentando uma mensagem caso encontrado ou não 
        const userResult = users.find((user) => user.id === parseInt(id));
        if(!userResult){
            return res.render("error", {
                title: "Ops!", 
                message: "Usuario não encontrado",
            });
        }
        return res.render("user", {
            title: "Visualizar usuario",
            user: userResult,
        });

    },



    create: (req, res) => {
        return res.render("user-create", {title: "Cadastrar Usuario"});
    },
    store: (req, res) => {
        const { nome, nomedeuser, senha, email } = req.body;
        if (!nome || !nomedeuser || !senha || !email ) {
            return res.render("user-create", {
                title: "Cadastrar Usuario",
                error: {
                    message: "Preencha todos os campos",
                }
                
            });
        }
        const newUser = {
            id: users.length + 1,
            nome,
            nomedeuser,
            email,
            senha,
        };
        users.push(newUser)
        return res.render("areaCliente", {
            title: "Sucesso!",
            success: {
                message: "Cadastro Criado com sucesso",
            }

            
        });
    },

    // Mostra a tela 
    edit: (req, res) => {
        const { id } = req.params;

        // Esse codigo abaixo ira fazer uma listagem dos id que tem na lista e fazer uma busca pelo usuario
        // apresentando uma mensagem caso encontrado ou não 
                const userResult = users.find((user) => user.id === parseInt(id));
                if(!userResult){
                    return res.render("error", {
                        title: "Ops!", 
                        message: "Usuario não encontrado",
                    });
                }
                return res.render("user-edit", {
                    title: "Editar Usuário",
                    user: userResult
                })
                
    },

// Executa a atualização 
    update: (req, res) => {
        const { id } = req.params;
        const { nome, nomedeuser, senha, email } = req.body;

        // Esse codigo abaixo ira fazer uma listagem dos id que tem na lista e fazer uma busca pelo usuario
        // apresentando uma mensagem caso encontrado ou não 
                const userResult = users.find((user) => user.id === parseInt(id));
                if(!userResult){
                    return res.render("error", {
                        title: "Ops!", 
                        message: "Usuario não encontrado",
                    });
                }

                const updateUser = userResult
                if(nome) updateUser.nome = nome
                if(nomedeuser) updateUser.nomedeuser = nomedeuser
                if(senha) updateUser.senha = senha
                if(email) updateUser.email = email
                return res.render("success", {
                    title: "Usuário Atualizado",
                    message: `Usuário ${updateUser.nome} foi atualizado`,
                })
    },

    delete: (req, res) =>{
        const { id } = req.params;

        // Esse codigo abaixo ira fazer uma listagem dos id que tem na lista e fazer uma busca pelo usuario
        // apresentando uma mensagem caso encontrado ou não 
                const userResult = users.find((user) => user.id === parseInt(id));
                if(!userResult){
                    return res.render("error", {
                        title: "Ops!", 
                        message: "Usuario não encontrado",
                    });
                }
                return res.render("user-delete", {
                    title: "Deletar Usuario",
                    user: userResult,
                })
    }, 

    destroy: (req, res) =>{
        const { id } = req.params;

        // Esse codigo abaixo ira fazer uma listagem dos id que tem na lista e fazer uma busca pelo usuario
        // apresentando uma mensagem caso encontrado ou não 
                const result = users.findIndex((user) => user.id === parseInt(id));
                if(!result === -1   ){
                    return res.render("error", {
                        title: "Ops!", 
                        message: "Usuario não encontrado",
                    });
                }
                users.splice(result, 1)
                return res.render("success", {
                    title: "Usuario Deletado",
                    message: "Usuário deletado com sucesso!"
                })
    },
};

module.exports = userController;

