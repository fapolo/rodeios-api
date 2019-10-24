const mongoose = require("mongoose");

const regiaoSchema = new mongoose.Schema({
  numero: Number,
  cidades: [{ type: String} ]
});

module.exports = mongoose.model("Regiao", regiaoSchema);
