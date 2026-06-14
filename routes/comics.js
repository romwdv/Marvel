const express = require("express");
const router = express.Router();
const he = require("he");
const axios = require("axios");

// 1 - Route for all comics

router.get("/comics", async (req, res) => {
  try {
    let limit = 100;
    let filters = "";

    if (req.query.title) {
      filters += `&title=${req.query.title}`;
    }
    if (req.query.page) {
      filters += `&skip=${(req.query.page - 1) * limit}`;
    }
    console.log(req.query.title);
    const response = await axios.get(
      `${process.env.API_URL}/comics?apiKey=${process.env.API_KEY}${filters}`,
    );
    const cleanDescription = response.data.results.map((item) => ({
      ...item,
      description: item.description ? he.decode(item.description) : "",
    }));
    res.status(200).json({ ...response.data, results: cleanDescription });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

// 2 - route comics for special character

router.get("/comics/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;
    const response = await axios.get(
      `${process.env.API_URL}/comics/${characterId}?apiKey=${process.env.API_KEY}`,
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// 3 - route for one comic

router.get("/comic/:comicId", async (req, res) => {
  try {
    const comicId = req.params.comicId;
    const response = await axios.get(
      `${process.env.API_URL}/comic/${comicId}?apiKey=${process.env.API_KEY}`,
    );
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
