const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
require("dotenv/config");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () =>
  console.log("--- Servidor Site dos Rodeios iniciado ---")
);
