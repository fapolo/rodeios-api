const Rodeio = require("../models/Rodeio");

module.exports = {
  async index(req, res) {
    try {
      const response = await Rodeio.find({}).populate("organizador");
      return res.json(response);
    } catch (error) {
      console.log("---> ERRO ao recuperar rodeios:");
      console.log(error);
      console.log("-----------------------");
      return res.status(500).json({ message: "Erro ao recuperar rodeios." });
    }
  },

  async store(req, res) {
    try {
      const { nome, data, organizador } = req.body;

      let response = await Rodeio.findOne({ nome });

      if (response) {
        return res.json({ message: "Rodeio já existe." });
      }

      response = await Rodeio.create({
        nome,
        data,
        organizador
      });

      await response.save();

      return res.json(response);
    } catch (error) {
      console.log("---> ERRO ao criar novo rodeio:");
      console.log(error);
      console.log("-----------------------");
      return res.status(500).json({ message: "Erro ao criar novo rodeio." });
    }
  },

  async update(req, res) {
    try {
      const rodeio = await Rodeio.findById(req.params.rodeio_id);
      if (!rodeio) {
        return res.status(400).json({ message: "Rodeio não localizado." });
      }

      let dados = {};
      if (req.body.nome) dados.nome = req.body.nome;
      if (req.body.data) dados.cidade = req.body.data;
      if (req.body.organizador) dados.rt = req.body.organizador;

      const response = await Rodeio.findByIdAndUpdate(
        req.params.rodeio_id,
        dados,
        { new: true }
      );

      return res.json(response);
    } catch (error) {
      console.log("---> ERRO ao atualizar entidade:");
      console.log(error);
      console.log("-----------------------");
      return res.status(500).json({ message: "Erro ao atualizar entidade." });
    }
  }
};
