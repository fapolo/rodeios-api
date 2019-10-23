const mongoose = require("mongoose");

const resultadoSchema = new mongoose.Schema({
  rodeio: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rodeio"
    },
    nome: String
  },
  modalidade: String,
  dados: [
    {
      entidade: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Entidade"
        },
        nome: String
      },
      correcao: Number,
      harmonia: Number,
      interpretacao: Number,
      musica: Number,
      desconto: Number,
      final: Number
    }
  ]
});

module.exports = mongoose.model("Resultado", resultadoSchema);
