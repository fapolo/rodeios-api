const express = require("express");
const entidadeController = require("./controllers/EntidadeController");
const rodeioController = require("./controllers/RodeioController");
const resultadoController = require("./controllers/ResultadoController");
const regiaoController = require("./controllers/RegiaoController");
const usuarioController = require("./controllers/usuarioController");
const authController = require("./controllers/AuthController");

const authMiddleware = require("./middlewares/auth");

const routes = express.Router();

routes.get("/entidades", entidadeController.index);
routes.post("/entidades", authMiddleware.validate, entidadeController.store);
routes.get("/entidades/:entidade_id", entidadeController.show);
routes.put("/entidades/:entidade_id", authMiddleware.validate, entidadeController.update);
//delete entidade não deve ser permitido. Entidade é um elemento dos rodeios e dos resultados,
//só existem no database por causa das participações nos rodeios

routes.get("/rodeios", rodeioController.index);
routes.post("/rodeios", authMiddleware.validate, rodeioController.store);
routes.get("/rodeios/:rodeio_id", rodeioController.show);
routes.put("/rodeios/:rodeio_id", authMiddleware.validate, rodeioController.update);
routes.delete("/rodeios/:rodeio_id", authMiddleware.validate, rodeioController.delete);

routes.post("/resultados/", authMiddleware.validate, resultadoController.store);
//estudar update resultado ao liberar o update de rodeio no frontend, talvez endpoint dividido
//para dados do rodeio em si (put rodeio) e aí criar (put resultado) para atualizar dados do resultado

routes.get("/regioes", regiaoController.index);
//somente para recuperar a lista de todas as cidades divididas por regiões,
//afim de utilizar para automatização ao cadastrar uma entidade no frontend

routes.post("/usuarios", usuarioController.store);

routes.post("/auth", authController.create);

module.exports = routes;
