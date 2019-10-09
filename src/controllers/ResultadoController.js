const Resultado = require("../models/Resultado");
const Entidade = require("../models/Entidade");

module.exports = {
  async store(req, res) {
    try {
      console.log("aqui vai o processamento de salvar novo resultado");
    } catch (error) {
      console.log("---> ERRO ao adicionar resultado:");
      console.log(error);
      console.log("-----------------------");
      return res.status(500).json({ message: "Erro ao adicionar resultado." });
    }
  }
};
