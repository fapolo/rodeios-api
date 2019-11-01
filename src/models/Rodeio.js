const mongoose = require("mongoose");

const rodeioSchema = new mongoose.Schema({
  nome: String,
  data: Date,
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  },
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

module.exports = mongoose.model("Rodeio", rodeioSchema);
