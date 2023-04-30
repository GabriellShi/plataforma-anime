const fs = require("fs")
const files = require ("../helpers/files")
const upload = require("../config/upload")
// Lista dos usuarios 
const users = [
    {
        id: 1,
        nome: "Gabriel",
        nomedeuser: "Oliveira",
        email: "gabriel@gmail.com",
        senha: 23,
        image: "luffy.jpg",
    },

    {
        id: 2,
        nome: "Rafael",
        nomedeuser: "Ferreira",
        email: "bruno@gmail.com",
        senha: 19,
        image: "zoro.jpg",
    },

    {
        id: 3,
        nome: "Beatriz",
        nomedeuser: "Costa",
        email: "beah@gmail.com",
        senha: 21,
        image: "nami.jpg",
    },

    {
        id: 4,
        nome: "joana",
        nomedeuser: "oliveira",
        email: "joana196@gmail.com",
        senha: 43,
        image: "sanji.jpeg",
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

        const user = {
            ...userResult,
            image: files.base64Encode (upload.path + userResult.image),
        }
        return res.render("user", {
            title: "Visualizar usuario",
            user,
        });

    },



    create: (req, res) => {
        return res.render("user-create", {title: "Cadastrar Usuario"});
    },
    store: (req, res) => {
        const { nome, nomedeuser, senha, email } = req.body;
        let filename = "user-default.jpeg";
        if(req.file){
            filename = req.file.filename;
        }
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
            image: filename,
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

                
        const user = {
            ...userResult,
            image: files.base64Encode (upload.path + userResult.image),
        }
                return res.render("user-edit", {
                    title: "Editar Usuário",
                    user,
                })
                
    },

// Executa a atualização 
    update: (req, res) => {
        const { id } = req.params;
        const { nome, nomedeuser, senha, email } = req.body;

        // Esse codigo abaixo ira fazer uma listagem dos id que tem na lista e fazer uma busca pelo usuario
        // apresentando uma mensagem caso encontrado ou não 
                const userResult = users.find((user) => user.id === parseInt(id));
                let filename;
                if(req.file){
                    filename = req.file.filename;
                }
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
                if(filename) {
                    let imageTmp = updateUser.image;
                    fs.unlinkSync(upload.path + imageTmp);
                    updateUser.image = filename;
                }
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
                const user = {
                    ...userResult,
                    image: files.base64Encode (upload.path + userResult.image),
                };
                return res.render("user-delete", {
                    title: "Deletar Usuario",
                    user,
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

                fs.unlinkSync(upload.path + users[result].image);

                users.splice(result, 1)
                return res.render("success", {
                    title: "Usuario Deletado",
                    message: "Usuário deletado com sucesso!"
                })
    },
};

module.exports = userController;

