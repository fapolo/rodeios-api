const mongoose = require("mongoose");

const entidadeSchema = new mongoose.Schema({
  nome: String,
  cidade: String,
  rt: Number,
  rodeios: [
    {
      _id: false,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rodeio"
      },
      nome: String
    },
  ],
  resultados: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resultado"
    }
  ]
});

module.exports = mongoose.model("Entidade", entidadeSchema);
