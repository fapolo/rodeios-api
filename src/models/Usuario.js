const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  rodeios: [
    {
      _id: false,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rodeio"
      }
    }
  ]
});

module.exports = mongoose.model("Usuario", usuarioSchema);
