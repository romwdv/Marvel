const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email et password obligatoires" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Données invalides" });
    }

    const salt = uid2(16);
    const hash = CryptoJS.SHA256(password + salt).toString();
    const token = uid2(64);

    const newUser = new User({ email, password: hash, salt, token });
    await newUser.save();
    res
      .status(201)
      .json({ token, email: newUser.email, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email et password obligatoires" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Données invalides" });
    }

    const hash = CryptoJS.SHA256(password + user.salt).toString();
    if (hash !== user.password) {
      return res.status(401).json({ message: "Données invalides" });
    }

    const newToken = uid2(64);
    user.token = newToken;
    await user.save();

    res
      .status(200)
      .json({ token: newToken, email: user.email, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/favorites", isAuthenticated, async (req, res) => {
  try {
    const { marvelId, type, name, thumbnailPath, thumbnailExt } = req.body;

    const alreadyFavorite = req.user.favorites.some(
      (fav) => fav.marvelId === marvelId,
    );
    if (alreadyFavorite) {
      return res.status(409).json({ message: "Déjà dans les favoris" });
    }

    req.user.favorites.push({
      marvelId,
      type,
      name,
      thumbnailPath,
      thumbnailExt,
    });
    await req.user.save();

    res.status(200).json({ favorites: req.user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/favorites/:marvelId", isAuthenticated, async (req, res) => {
  try {
    const { marvelId } = req.params;

    req.user.favorites = req.user.favorites.filter(
      (fav) => fav.marvelId !== marvelId,
    );
    await req.user.save();

    res.status(200).json({ favorites: req.user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
