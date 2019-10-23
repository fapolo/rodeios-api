const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const { seedDB } = require("../seedDB");

const app = express();
require("dotenv/config");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

seedDB();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () =>
  console.log("--- Servidor Site dos Rodeios iniciado ---")
);
