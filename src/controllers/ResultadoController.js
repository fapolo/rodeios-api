const Resultado = require("../models/Resultado");
const Entidade = require("../models/Entidade");
const Rodeio = require('../models/Rodeio');

module.exports = {
  async store(req, res) {
    const { rodeio, modalidade, dados } = req.body;

    if (!rodeio || !modalidade || !dados)
      return res.status(400).json({ message: "Dados não autorizados." });

    try {
      // //verifica se rodeio existe
      const foundRodeio = await Rodeio.findById(rodeio);
      if (!foundRodeio) return res.json({message: "Rodeio não localizado"});

      //calcular a nota final
      dados.map((pos, i) => {
        const {correcao, harmonia, interpretacao, musica, descontos} = pos;
        return dados[i].final = correcao + harmonia + interpretacao + musica - descontos;
      });

      //salvar o resultado no DB
      const response = await Resultado.create({
        rodeio,
        modalidade,
        dados
      });

      await response.save();

      //salvar ID do rodeio na entidade
      dados.map(async ({entidade}) => {
        const foundEntidade = await Entidade.findById(entidade);
        foundEntidade.conquistas.push(response._id);
        await foundEntidade.save();
      });

      foundRodeio.resultado = response._id;
      await foundRodeio.save();
      return res.json(response);

    } catch (error) {
      console.log("---> ERRO ao adicionar resultado:");
      console.log(error);
      console.log("-----------------------");
      return res.status(500).json({ message: "Erro ao adicionar resultado." });
    }
  }
};
