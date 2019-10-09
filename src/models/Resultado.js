const mongoose = require("mongoose");

const resultadoSchema = new mongoose.Schema({
  rodeio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rodeio"
  },
  modalidade: String

  //   estrutura para dados:

  //   dados: {
  //       id_entidade: {
  //           correcao,
  //           harmonia,
  //           interpretacao,
  //           musica,
  //           descontos,
  //           final
  //       }
  //   }
});

module.exports = mongoose.model("Rodeio", resultadoSchema);
