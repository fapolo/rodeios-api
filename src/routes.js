const express = require("express");
const entidadeController = require("./controllers/EntidadeController");
const rodeioController = require("./controllers/RodeioController");

const routes = express.Router();

routes.get("/entidades", entidadeController.index);
routes.post("/entidades", entidadeController.store);
routes.put("/entidades/:entidade_id", entidadeController.update);

routes.get("/rodeios", rodeioController.index);
routes.post("/rodeios", rodeioController.store);
routes.put("/rodeios/:rodeio_id", rodeioController.update);

module.exports = routes;
