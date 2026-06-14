const express = require("express");
const router = express.Router();
const he = require("he");
const axios = require("axios");

const sanitizeDescription = (desc) =>
  desc ? he.decode(desc).replace(/<[^>]*>/g, "") : "";

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
    const response = await axios.get(
      `${process.env.API_URL}/comics?apiKey=${process.env.API_KEY}${filters}`,
    );
    const cleanResults = response.data.results.map((item) => ({
      ...item,
      description: sanitizeDescription(item.description),
    }));
    res.status(200).json({ ...response.data, results: cleanResults });
  } catch (error) {
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
    const results = response.data.results ?? [];
    const cleanResults = results.map((item) => ({
      ...item,
      description: sanitizeDescription(item.description),
    }));
    res.status(200).json({ ...response.data, results: cleanResults });
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
    res.status(200).json({
      ...response.data,
      description: sanitizeDescription(response.data.description),
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
