const data = require("../database/data-recipes")

exports.index = function(req, res) {                            //request(req) é o que o usuário escreve e response(res) é a resposta da app
    return res.render("admin/index");                      //render indica qual é a view que será renderizada e enviando os dados da receita para a page
}

exports.show = function(req, res) {
    const { id } = req.params;  //desestruturando o id do params

    const foundRecipe = data.find(function(recipe) {    //procurando instrutor dentro do BD
        return recipe.id == id;     // se o id do instrutor for igual ao id do params retorna true
    })

    if (! foundRecipe) {    //se não encontrou o instrutor
        return res.send("Recipe not found!");   //retorna a menssagem
    }

    //tratando os dados
    const recipe = {
        ...foundRecipe,     //espalhando (spread operator = coloca dentro do objeto recipe todo o que ha dentro do objeto foundRecipe) os dados dentro da variável
        // ingredients: foundRecipe.ingredients.split(","),  //.spli() transforma uma string em um array, dentro do parênteses é informado onde é a quebra, neste caso, na vírgula
        // preparation: foundRecipe.preparation.split(","),  //.spli() transforma uma string em um array, dentro do parênteses é informado onde é a quebra, neste caso, na vírgula
        
    }

    return res.render("admin/details", {recipe})
}