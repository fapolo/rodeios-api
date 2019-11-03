const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  rodeios: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rodeio"
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

module.exports = mongoose.model("Usuario", usuarioSchema);
