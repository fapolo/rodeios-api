const mongoose = require("mongoose");

const resultadoSchema = new mongoose.Schema({
  rodeio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rodeio"
  },
  modalidade: String,
  dados: [
    {
      entidade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Entidade"
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

module.exports = mongoose.model("Rodeio", resultadoSchema);
