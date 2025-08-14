const natural = require('natural');
const Fuse = require('fuse.js');

const intents = [
  { tag: 'greeting', patterns: ['hello', 'hi', 'hey'], response: 'Hey there! How can I help you today?' },
  { tag: 'status', patterns: ['how are you', 'how do you feel'], response: "I'm just code, but I'm running smoothly!" },
  { tag: 'name', patterns: ['your name', 'who are you'], response: "I'm your local AI companion. No cloud needed!" },
  { tag: 'joke', patterns: ['tell me a joke', 'make me laugh'], response: "Why do JavaScript devs wear glasses? Because they don’t C#." },
  { tag: 'bye', patterns: ['bye', 'goodbye'], response: "Catch you later! Stay curious." }
];

const fuse = new Fuse(intents, {
  keys: ['patterns'],
  threshold: 0.4
});

function getReply(message) {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(message.toLowerCase());

  const result = fuse.search(tokens.join(' '));
  if (result.length > 0) {
    return result[0].item.response;
  }

  return `Hmm... I’m not sure how to respond to "${message}", but I'm learning!`;
}

module.exports = { getReply };
