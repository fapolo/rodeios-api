const Usuario = require("../models/Usuario");
const bcrytpt = require("bcrypt");

module.exports = {
  async store(req, res) {
    const { senha } = req.body;

    try {
      const hash = await bcrytpt.hash(senha, 10);
      if (!hash)
        return res.status(500).json({ message: "Erro ao criar usuário." });

      const response = await Usuario.create(req.body);

      response.senha = hash;

      await response.save();

      response.senha = undefined;

      return res.json(response);
    } catch (error) {
      console.log("---> ERRO ao criar usuário:");
      console.log(error);
      console.log("-----------------------");
      return res.status(500).json({ message: "Erro ao criar usuário." });
    }
  }
};
