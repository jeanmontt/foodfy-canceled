const express = require('express');                             //importando a biblioteca do express
const nunjucks = require('nunjucks');                           //importando a biblioteca do nunjucks
const routes = require('./routes');
const methodOverride = require('method-override');

const server = express();                                       //a const server instancia o express

server.use(express.urlencoded({ extended: true }));             //Config recebimento de dados no body
server.use(express.static('public'));                           //o express irá observar a pasta public para servir os arq. estáticos
server.use(methodOverride('_method'));                          //Config method-override
server.use(routes);                                             //Config routes

server.set('view engine', 'njk');                               //setar qual é o motor de views da app, qual é a extensão dos arquivos para abrir

nunjucks.configure("./src/views", {
    express: server,                                            //indica ao nunjucks que vamos usar o Express com a var server
    noCache: true,                                              //bloqueando o cache do nunjucks 
    autoescape: false                                           //impede que o nunjucks mostre o codigo html em variaveis
});

server.listen(5000, function() {
    console.log("Server is running!");
});