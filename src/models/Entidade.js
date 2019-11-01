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
  ],
  createdAt: {
    date: {
      type: Date,
      default: Date.now()
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario"
    }
  },
  updatedAt: {
    date: {
      type: Date,
      default: Date.now()
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario"
    }
  }
});

module.exports = mongoose.model("Entidade", entidadeSchema);
