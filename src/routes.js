const express = require("express");
const entidadeController = require("./controllers/EntidadeController");

const routes = express.Router();

routes.post("/entidades", entidadeController.store);
routes.put("/entidades/:entidade_id", entidadeController.update);

module.exports = routes;
