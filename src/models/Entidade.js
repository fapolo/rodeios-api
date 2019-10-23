const mongoose = require("mongoose");

const entidadeSchema = new mongoose.Schema({
  nome: String,
  cidade: String,
  rt: Number,
  rodeios: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rodeio"
      },
      nome: String
    }
  ],
  resultados: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resultado"
      },
      rodeio_nome: String
    }
  ]
});

module.exports = mongoose.model("Entidade", entidadeSchema);
