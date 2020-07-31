const recipes = require("../database/data-recipes");                 //importando o arquivo com os dados das receitas

exports.index = function(req, res) {                            //request(req) é o que o usuário escreve e response(res) é a resposta da app
    return res.render("main/index", {recipes});                      //render indica qual é a view que será renderizada e enviando os dados da receita para a page
}

exports.about = function(req, res) {
    return res.render("main/about");
}

exports.recipes = function(req, res) {
    return res.render("main/recipes", {recipes})
}

exports.recipe = function(req, res) {
    const index = req.params.index;
    const recipe = recipes[index];

    return res.render("main/recipe", {recipe});
}
