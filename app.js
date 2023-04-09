const express = require("express");
const app = express();
const port = 3005;
const methodOverride = require('method-override');
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const indexRoute = require('./src/routes/indexRoute');
const listaDosAnimesRoute = require('./src/routes/listaDosAnimesRoute');
const paginaDoAnimeRoute = require('./src/routes/paginaDoAnimeRoute');
const pedidosDeAnimesRoute = require('./src/routes/pedidosDeAnimesRoute');
const melhoriasRoute = require('./src/routes/melhoriasRoute');
const generosRoute = require('./src/routes/generosRoute');
const episodiosAdicionadosRoute = require('./src/routes/episodiosAdicionadosRoute');
const filmesAdicionadosRoute = require('./src/routes/filmesAdicionadosRoute');
const contatoRoute = require('./src/routes/contatoRoute');
const paginaDoEpisodioSelecionadoRoute = require('./src/routes/paginaDoEpisodioSelecionadoRoute');




// Configura o methodOverride no express
// methodOverride = Pacote que transforma um método http em outro
// Ex: POST => PUT
app.use(methodOverride("_method"));
// Converter corpo da requisição (body) em objeto literal
app.use(express.json());


app.use(cookieParser());
app.use(session({
  secret: "senha",
  resave: true,
  saveUninitialized: true,
}));


// Configura pasta estática para acesso externo
app.use(express.static(path.join(__dirname, "public")));
// Configura o template engine, troca do padrão (jade) para ejs
app.set("view engine", "ejs");
// Configura o caminho para os views, troca o padrão que é no raiz para o src
app.set("views", path.join(__dirname, "src", "views"));


// Inicia o servidor
app.listen(port, () => {
  console.log("Estamos rodando em: http://localhost:" + port);
});

app.use('/index', indexRoute);
app.use('/listaDosAnimes', listaDosAnimesRoute);
app.use('/paginaDoAnime', paginaDoAnimeRoute);
app.use('/pedidosDeAnimes', pedidosDeAnimesRoute);
app.use('/melhorias', melhoriasRoute);
app.use('/generos', generosRoute);
app.use('/episodiosAdicionados', episodiosAdicionadosRoute);
app.use('/filmesAdicionados', filmesAdicionadosRoute);
app.use('/contato', contatoRoute);
app.use('/paginaDoEpisodioSelecionado', paginaDoEpisodioSelecionadoRoute);


