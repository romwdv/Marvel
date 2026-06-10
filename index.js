const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Welcome in the Multiverse !" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.all(/.*/, (req, res) => {
  return res.status(404).json({ message: "Not Found" });
});

app.listen(3000, () => {
  console.log("Serveur On 🦸‍♂️");
});
