// Dictionary of greetings in 10 languages
const greetingsMap = {
  en: "Hello",      // English
  fr: "Bonjour",    // French
  es: "Hola",       // Spanish
  de: "Hallo",      // German
  it: "Ciao",       // Italian
  pt: "Olá",        // Portuguese
  zh: "你好",       // Chinese (Mandarin)
  ja: "こんにちは", // Japanese
  ar: "مرحبا",     // Arabic
  ig: "Ndeewo"     // Igbo
};

async function translateGreeting(name, lang) {
  const baseGreeting = greetingsMap[lang];
  if (!baseGreeting) {
    return `This language is not available. Hello, ${name}!`;
  }
  return `${baseGreeting}, ${name}!`;
}

// Return list of supported languages
function getSupportedLanguages() {
  return Object.keys(greetingsMap);
}

module.exports = { translateGreeting, getSupportedLanguages };
