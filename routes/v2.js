const express = require("express");
const { translateGreeting, getSupportedLanguages } = require("../utils/translate");
const router = express.Router();

let greetings = [];

// GET /v2/hello
router.get("/hello", async (req, res) => {
  const { name = "Guest", lang = "en" } = { ...req.query, ...req.body };
  const message = await translateGreeting(name, lang);
  res.json({ message });
});

// POST /v2/hello
router.post("/hello", async (req, res) => {
  const { name, lang = "en" } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  const message = await translateGreeting(name, lang);
  const newGreeting = {
    id: (greetings.length + 1).toString(),
    message,
  };

  greetings.push(newGreeting);
  res.status(201).json(newGreeting);
});

// GET /v2/hello/:id
router.get("/hello/:id", (req, res) => {
  const greeting = greetings.find((g) => g.id === req.params.id);
  if (!greeting) return res.status(404).json({ error: "Greeting not found" });
  res.json(greeting);
});

// GET /v2/languages
router.get("/languages", (req, res) => {
  res.json({ supported_languages: getSupportedLanguages() });
});

module.exports = router;
