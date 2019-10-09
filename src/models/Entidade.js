const mongoose = require("mongoose");

const entidadeSchema = new mongoose.Schema({
  nome: String,
  cidade: String,
  eventos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rodeio"
  },
  conquistas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resultado"
  }
});

module.exports = mongoose.model("Entidade", entidadeSchema);
