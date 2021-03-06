const express = require('express');
const routes = express.Router();
const main = require('./controllers/main');
const admin = require('./controllers/admin')

//============ MAIN ============
routes.get("/", main.index);
routes.get("/sobre", main.about);
routes.get("/receitas", main.recipes);
routes.get("/receitas/:index", main.recipe);

//============ ADMIN ============
routes.get("/admin", admin.index);
routes.get("/admin/receitas/nova", admin.create)
routes.get("/admin/receitas/:id", admin.show);
routes.get("/admin/receitas/:id/edit", admin.edit);

routes.post("/admin/receitas", admin.post);
routes.put("/admin/receitas", admin.put);

module.exports = routes;