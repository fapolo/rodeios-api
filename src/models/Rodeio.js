const mongoose = require("mongoose");

const rodeioSchema = new mongoose.Schema({
  nome: String,
  data: Date,
  entidade: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entidade"
    },
    nome: String
  },
  resultado: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resultado"
    }
  ]
});

module.exports = mongoose.model("Rodeio", rodeioSchema);
