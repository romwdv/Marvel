const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    marvelId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["character", "comic"],
      required: true,
    },
    name: {
      type: String,
    },
    thumbnailPath: {
      type: String,
    },
    thumbnailExt: {
      type: String,
    },
  },
  { _id: false }, // pas d'_id généré pour chaque sous-document
);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // bcrypt hash uniquement — jamais le mot de passe en clair
  },
  token: {
    type: String,
  },
  favorites: {
    type: [favoriteSchema],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
