const express = require("express");
const mongoose = require("mongoose");

const server = express();
require("dotenv/config");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

server.listen(process.env.PORT, () =>
  console.log("--- Servidor Site dos Rodeios iniciado ---")
);
