const mongoose = require("mongoose");

const entidadeSchema = new mongoose.Schema({
  nome: String,
  cidade: String,
  rt: Number,
  eventos: [
    {
      rodeio_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rodeio"
      },
      rodeio_nome: String
    }
  ],
  conquistas: [
    {
      resultado_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resultado"
      },
      rodeio_nome: String
    }
  ]
});

module.exports = mongoose.model("Entidade", entidadeSchema);
