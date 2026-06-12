const express = require("express");
const router = express.Router();
const he = require("he");

const axios = require("axios");

// 1 - Route for all characters

router.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/characters?apiKey=${process.env.API_KEY}`,
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
    console.log("id from front => ", characterId);
    const response = await axios.get(
      `${process.env.API_URL}/character/${characterId}?apiKey=${process.env.API_KEY}`,
    );
    console.log("new =>", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
