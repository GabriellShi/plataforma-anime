const express = require("express");
const app = express();
const port = 3010;
const methodOverride = require('method-override');


const indexRoute = require('./src/routes/indexRoute');
const listaDosAnimesRoute = require('./src/routes/listaDosAnimesRoute');
const pedidosDeAnimesRoute = require('./src/routes/pedidosDeAnimesRoute');
const melhoriasRoute = require('./src/routes/melhoriasRoute');
const generosRoute = require('./src/routes/generosRoute');
const episodiosAdicionadosRoute = require('./src/routes/episodiosAdicionadosRoute');
const filmesAdicionadosRoute = require('./src/routes/filmesAdicionadosRoute');
const contatoRoute = require('./src/routes/contatoRoute');
const paginaDoEpisodioSelecionadoRoute = require('./src/routes/paginaDoEpisodioSelecionadoRoute');
const loginRoute = require('./src/routes/loginRoute');
const areaClienteRoute = require('./src/routes/areaClienteRoute');
const recuperarSenhaRoute = require('./src/routes/recuperarSenhaRoute');

const indexAdminRoute = require("./src/routes/indexAdminRoute")   
const userRoute = require("./src/routes/userRoute") 
const animeRoute = require("./src/routes/animeRoute") 
const episodioRoute = require("./src/routes/episodioRoute") 





// Configura o methodOverride no express
// methodOverride = Pacote que transforma um método http em outro
// Ex: POST => PUT
app.use(methodOverride("_method"));
// Converter corpo da requisição (body) em objeto literal
app.use(express.json());

app.use(express.urlencoded({ extended: false }))

//   
// Configura pasta estática para acesso externo
app.use(express.static(__dirname + "/public"));

// Configura o template engine, troca do padrão (jade) para ejs
app.set("view engine", "ejs");
// Configura o caminho para os views, troca o padrão que é no raiz para o src
app.set("views", __dirname + "/src/views");


// Inicia o servidor
app.listen(port, () => {
  console.log("Estamos rodando na porta" + " " + port);
});

app.use('/', indexRoute);
app.use('/listaDosAnimes', listaDosAnimesRoute);
app.use('/pedidosDeAnimes', pedidosDeAnimesRoute);
app.use('/melhorias', melhoriasRoute);
app.use('/generos', generosRoute);
app.use('/episodiosAdicionados', episodiosAdicionadosRoute);
app.use('/paginaDoEpisodioSelecionado', paginaDoEpisodioSelecionadoRoute);
app.use('/filmesAdicionados', filmesAdicionadosRoute);
app.use('/contato', contatoRoute);
app.use('/login', loginRoute);
app.use('/areaCliente', areaClienteRoute);
app.use('/recuperarSenha', recuperarSenhaRoute);


app.use("/indexAdmin", indexAdminRoute) 
app.use("/user", userRoute) 
app.use("/anime", animeRoute) 
app.use("/episodio", episodioRoute) 
