const data = require("../database/data")
const fs = require("fs");

exports.index = function (req, res) {
    return res.render("admin/index", {
        recipes: data.recipes
    });
}

exports.create = function (req, res) {
    return res.render("admin/create");
}

exports.show = function (req, res) {
    const {
        id
    } = req.params; //desestruturando o id do params

    const foundRecipe = data.recipes.find(function (recipe) { //procurando instrutor dentro do BD
        return recipe.id == id; // se o id do instrutor for igual ao id do params retorna true
    })

    if (!foundRecipe) { //se não encontrou o instrutor
        return res.send("Recipe not found!"); //retorna a menssagem
    }

    //tratando os dados
    const recipe = {
        ...foundRecipe, //espalhando (spread operator = coloca dentro do objeto recipe todo o que ha dentro do objeto foundRecipe) os dados dentro da variável
        // ingredients: foundRecipe.ingredients.split(","),  //.spli() transforma uma string em um array, dentro do parênteses é informado onde é a quebra, neste caso, na vírgula
        // preparation: foundRecipe.preparation.split(","),  //.spli() transforma uma string em um array, dentro do parênteses é informado onde é a quebra, neste caso, na vírgula

    }

    return res.render("admin/details", {
        recipe
    })
}

exports.edit = function (req, res) {
    const {
        id
    } = req.params;

    const foundRecipe = data.recipes.find(function (recipe) {
        return recipe.id == id;
    })

    if (!foundRecipe) {
        return res.send("Recipe not found!");
    }

    recipe = {
        ...foundRecipe,
    }

    return res.render("admin/edit", {
        recipe
    });
}

exports.post = function (req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill all fields!");
        }
    }

    let id = 1;
    const lastRecipe = data.recipes[data.recipes.length - 1];
    if (lastRecipe) {
        id = lastRecipe.id + 1;
    }

    data.recipes.push({
        ...req.body,
        id,
    });

    fs.writeFile('src/database/data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) {
            return res.send("Write file error!");
        }

        return res.redirect("/admin/receitas");
    });
}

exports.put = function (req, res) {
    const {
        id
    } = req.body;
    let index = 0;

    const foundRecipe = data.recipes.find(function (recipe, foundIndex) {
        if (id == recipe.id) {
            index = foundIndex;
            return true
        }
    });

    if (!foundRecipe) {
        return res.send("Recipe not found!");
    }

    const recipe = {
        ...foundRecipe,
        ...req.body,
        id: Number(req.body.id)
    }

    data.recipes[index] = recipe;

    fs.writeFile("src/database/data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("Write error!");

        return res.redirect(`/admin/receitas/${id}`);
    })
}