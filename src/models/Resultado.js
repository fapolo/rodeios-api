const mongoose = require("mongoose");

const resultadoSchema = new mongoose.Schema({
  rodeio: {
    rodeio_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rodeio"
    },
    rodeio_nome: String
  },
  modalidade: String,
  dados: [
    {
      entidade: {
        entidade_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Entidade"
        },
        nome: String
      },
      correcao: Number,
      harmonia: Number,
      interpretacao: Number,
      musica: Number,
      descontos: Number,
      final: Number
    }
  ]
});

module.exports = mongoose.model("Resultado", resultadoSchema);
