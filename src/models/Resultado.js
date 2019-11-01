const mongoose = require("mongoose");

const resultadoSchema = new mongoose.Schema({
  rodeio: {
    _id: false,
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rodeio"
    },
    nome: String
  },
  modalidade: String,
  dados: [
    {
      _id: false,
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
  ],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Resultado", resultadoSchema);
