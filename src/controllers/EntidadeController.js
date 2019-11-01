const Entidade = require("../models/Entidade");

module.exports = {
  async index(req, res) {
    try {
      const response = await Entidade.find({});

      return res.json(response);
    } catch (error) {
      console.log("---> ERRO ao recuperar entidades:");
      console.log(error);
      console.log("-----------------------");
      return res.status(500).json({ message: "Erro ao recuperar entidades." });
    }
  },

  async store(req, res) {
    const { nome, cidade, rt } = req.body;
    const authUser = req.userId; //ID passado no middleware de validação

    if (!nome || !cidade || !rt)
      return res.status(400).json({ message: "Dados não autorizados." });
    
    try {

      let response = await Entidade.findOne({ nome });

      if (response) {
        return res.json({ message: "Entidade já existe." });
      }

      response = await Entidade.create({
        nome,
        cidade,
        rt
      });
      response.createdAt.usuario = authUser;
      response.updatedAt.usuario = authUser;
      await response.save();

      return res.json(response);
    } catch (error) {
      console.log("---> ERRO ao criar nova entidade:");
      console.log(error);
      console.log("-----------------------");
      return res.status(500).json({ message: "Erro ao criar nova entidade." });
    }
  },

  async show(req, res) {
    try {
      const entidade = await Entidade.findById(req.params.entidade_id);
      if (!entidade) {
        return res.status(400).json({ message: "Entidade não localizada." });
      }

      return res.json(entidade);
    } catch (error) {
      console.log("---> ERRO ao localizar entidade:");
      console.log(error);
      console.log("-----------------------");
      return res.status(500).json({ message: "Erro ao localizar entidade." });
    }
  },

  async update(req, res) {
    const authUser = req.userId; //ID passado no middleware de validação

    try {
      const entidade = await Entidade.findById(req.params.entidade_id);
      if (!entidade)
        return res.status(400).json({ message: "Entidade não localizada." });

      let dados = {};
      dados.updatedAt = {date: Date.now(), usuario: authUser };
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
