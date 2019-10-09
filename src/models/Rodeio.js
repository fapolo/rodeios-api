const mongoose = require("mongoose");

const rodeioSchema = new mongoose.Schema({
  nome: String,
  data: Date,
  organizador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entidade"
  },
  resultado: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resultado"
  }
]
});

module.exports = mongoose.model("Rodeio", rodeioSchema);
