const express = require('express');                             //importando a biblioteca do express
const nunjucks = require('nunjucks');                           //importando a biblioteca do nunjucks

const server = express();                                       //a const server instancia o express
const recipes = require("./src/database/data-recipes");                 //importando o arquivo com os dados das receitas

server.use(express.static('public'));                           //o express irá observar a pasta public para servir os arq. estáticos

server.set('view engine', 'njk');                               //setar qual é o motor de views da app, qual é a extensão dos arquivos para abrir

nunjucks.configure("./src/views", {
    express: server,                                            //indica ao nunjucks que vamos usar o Express com a var server
    noCache: true,                                              //bloqueando o cache do nunjucks 
    autoescape: false                                           //impede que o nunjucks mostre o codigo html em variaveis
});

server.get("/", function(req, res) {                            //request(req) é o que o usuário escreve e response(res) é a resposta da app
    return res.render("index", {recipes});                      //render indica qual é a view que será renderizada e enviando os dados da receita para a page
});

server.get("/sobre", function(req, res) {
    return res.render("about");
});

server.get("/receitas", function(req, res) {
    return res.render("recipes", {recipes})
});

server.get("/receitas/:index", function(req, res) {
    const index = req.params.index;
    const recipe = recipes[index];

    return res.render("recipe", {recipe});
});

server.listen(5000, function() {
    console.log("Server is running!");
});