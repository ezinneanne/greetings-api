const express = require("express");
const { translateGreeting, getSupportedLanguages } = require("../utils/translate");
const router = express.Router();

// GET /v1/hello
router.get("/hello", async (req, res) => {
  const { name = "Guest", lang = "en" } = { ...req.query, ...req.body };
  const message = await translateGreeting(name, lang);
  res.json({ message });
});

// GET /v1/languages
router.get("/languages", (req, res) => {
  res.json({ supported_languages: getSupportedLanguages() });
});

module.exports = router;
