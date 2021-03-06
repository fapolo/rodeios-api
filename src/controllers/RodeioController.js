const Rodeio = require("../models/Rodeio");
const Entidade = require("../models/Entidade");
const Resultado = require("../models/Resultado");
const Usuario = require("../models/Usuario");

module.exports = {
  async index(req, res) {
    try {
      const response = await Rodeio.paginate(
        {},
        {
          limit: 8,
          sort: { data: -1 },
          populate: "resultado"
        }
      );

      return res.json(response);
    } catch (error) {
      console.log("---> ERRO ao recuperar rodeios:");
      console.log(error);
      console.log("-----------------------");
      return res.status(500).json({ message: "Erro ao recuperar rodeios." });
    }
  },

  async store(req, res) {
    const { nome, data, organizador } = req.body;
    const authUser = req.userId; //ID passado no middleware de validação

    if (!nome || !data || !organizador)
      return res.status(400).json({ message: "Dados não autorizados." });

    try {
      let rodeio = await Rodeio.findOne({ nome });
      if (rodeio) return res.status(400).json({ message: "Rodeio já existe." });

      //procurar usuário logado
      let user = await Usuario.findById(authUser);
      if (!user)
        return res.status(401).json({ message: "Usuário não localizado." });

      //cria o novo rodeio
      rodeio = await Rodeio.create({
        nome,
        data,
        organizador,
        usuario: authUser
      });
      await rodeio.save();

      //salva ID do rodeio no usuário
      user.rodeios.push(rodeio._id);
      await user.save();

      return res.json(rodeio);
    } catch (error) {
      console.log("---> ERRO ao criar novo rodeio:");
      console.log(error);
      console.log("-----------------------");
      return res.status(500).json({ message: "Erro ao criar novo rodeio." });
    }
  },

  async show(req, res) {
    try {
      const rodeio = await Rodeio.findById(req.params.rodeio_id).populate(
        "resultado"
      );

      if (!rodeio) {
        return res.status(400).json({ message: "Rodeio não localizado." });
      }

      return res.json(rodeio);
    } catch (error) {
      console.log("---> ERRO ao localizar rodeio:");
      console.log(error);
      console.log("-----------------------");
      return res.status(500).json({ message: "Erro ao localizar rodeio." });
    }
  },

  async update(req, res) {
    const authUser = req.userId; //ID passado no middleware de validação

    try {
      const rodeio = await Rodeio.findById(req.params.rodeio_id);
      if (!rodeio) {
        return res.status(400).json({ message: "Rodeio não localizado." });
      }

      if (rodeio.usuario.toString() !== authUser.toString())
        return res.status(400).json({ message: "Acesso negado." });

      let dados = {};
      dados.updatedAt = Date.now();
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
  },

  async delete(req, res) {
    const authUser = req.userId; //ID passado no middleware de validação

    try {
      //procura pelo rodeio passado
      const rodeio = await Rodeio.findById(req.params.rodeio_id).populate(
        "resultado"
      );
      if (!rodeio) {
        return res.status(400).json({ message: "Rodeio não localizado." });
      }

      //verifica que o usuário logado é o dono do rodeio
      if (rodeio.usuario.toString() !== authUser.toString())
        return res.status(401).json({ message: "Sem autorização." });

      //remover a entrada de resultado das entidades que participaram do rodeio
      const { resultado } = rodeio;
      resultado.map(async modalidade => {
        modalidade.dados.map(async entrada => {
          const entidade = await Entidade.findById(entrada.entidade.id);
          entidade.resultados = entidade.resultados.filter(
            result => result.toString() !== modalidade._id.toString()
          );
          await entidade.save();
        });

        //remover o resultado do rodeio
        await Resultado.findByIdAndDelete(modalidade._id);
      });

      //remover o rodeio
      await Rodeio.findByIdAndDelete(req.params.rodeio_id);

      return res.status(200).json({ message: "Rodeio removido." });
    } catch (error) {
      console.log("---> ERRO ao remover rodeio:");
      console.log(error);
      console.log("-----------------------");
      return res.status(500).json({ message: "Erro ao remover rodeio." });
    }
  }
};
