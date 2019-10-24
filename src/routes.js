const express = require("express");
const entidadeController = require("./controllers/EntidadeController");
const rodeioController = require("./controllers/RodeioController");
const resultadoController = require("./controllers/ResultadoController");

const routes = express.Router();

routes.get("/entidades", entidadeController.index);
routes.post("/entidades", entidadeController.store);
routes.get("/entidades/:entidade_id", entidadeController.show);
routes.put("/entidades/:entidade_id", entidadeController.update);
//delete entidade não deve ser permitido. Entidade é um elemento dos rodeios e dos resultados,
//só existem no database por causa das participações nos rodeios

routes.get("/rodeios", rodeioController.index);
routes.post("/rodeios", rodeioController.store);
routes.get("/rodeios/:rodeio_id", rodeioController.show);
routes.put("/rodeios/:rodeio_id", rodeioController.update);
routes.delete("/rodeios/:rodeio_id", rodeioController.delete);

routes.post("/resultados/", resultadoController.store);
//estudar update resultado ao liberar o update de rodeio no frontend, talvez endpoint dividido
//para dados do rodeio em si (put rodeio) e aí criar (put resultado) para atualizar dados do resultado

module.exports = routes;
