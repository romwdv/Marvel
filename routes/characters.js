const express = require("express");
const router = express.Router();
const he = require("he");

const axios = require("axios");

// 1 - Route for all characters

router.get("/characters", async (req, res) => {
  try {
    let limit = 100;
    let filters = "";

    if (req.query.name) {
      filters += `&name=${req.query.name}`;
    }
    if (req.query.page) {
      filters += `&skip=${(req.query.page - 1) * limit}`;
    }
    const response = await axios.get(
      `${process.env.API_URL}/characters?apiKey=${process.env.API_KEY}${filters}`,
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// 2 - Route for one character

router.get("/character/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;
    const response = await axios.get(
      `${process.env.API_URL}/character/${characterId}?apiKey=${process.env.API_KEY}`,
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
