const mongoose = require("mongoose");

const rodeioSchema = new mongoose.Schema({
  nome: String,
  data: Date,
  organizador: {
    rodeio_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entidade"
    },
    nome: String
  },
  resultado: [
    {
      resultado_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resultado"
      },
      modalidade: String
    }
  ]
});

module.exports = mongoose.model("Rodeio", rodeioSchema);
