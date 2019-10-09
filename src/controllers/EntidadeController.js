const Entidade = require("../models/Entidade");

module.exports = {
  async store(req, res) {
    try {
      const { nome, cidade, rt } = req.body;

      let response = await Entidade.findOne({ nome });

      if (response) {
        return res.json({ message: "Entidade já existe." });
      }

      response = await Entidade.create({
        nome,
        cidade,
        rt
      });

      await response.save();

      return res.json(response);
    } catch (error) {
      console.log("---> ERRO ao criar nova entidade:");
      console.log(error);
      console.log("-----------------------");
      return res.status(500).json({ message: "Erro ao criar nova entidade." });
    }
  },

  async update(req, res) {
    try {
      const entidade = await Entidade.findById(req.params.entidade_id);
      if (!entidade) {
        return res.status(400).json({ message: "Entidade não localizada." });
      }

      let dados = {};
      if (req.body.nome) dados.nome = req.body.nome;
      if (req.body.cidade) dados.cidade = req.body.cidade;
      if (req.body.rt) dados.rt = req.body.rt;

      const response = await Entidade.findByIdAndUpdate(
        req.params.entidade_id,
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
