const natural = require('natural');
const fs = require('fs-extra');
const path = require('path');

const DATA_PATH = path.join(__dirname, 'data.json');
let classifier = new natural.BayesClassifier();

function loadTrainingData() {
  const data = fs.readJsonSync(DATA_PATH);
  classifier = new natural.BayesClassifier();
  data.forEach(({ input, label }) => {
    classifier.addDocument(input, label);
  });
  classifier.train();
}

function getReply(message) {
  const label = classifier.classify(message);
  const responses = {
    greeting: 'Hey there! 👋',
    status: "I'm doing great, thanks for asking!",
    identity: "I'm your local AI chatbot powered by Natural.",
    joke: "Why did the developer go broke? Because he used up all his cache!",
    farewell: "Goodbye! Have a great day!"
  };
  return responses[label] || `I'm not sure how to respond to "${message}", but I'm learning!`;
}

function addTrainingSample(input, label) {
  const data = fs.readJsonSync(DATA_PATH);
  data.push({ input, label });
  fs.writeJsonSync(DATA_PATH, data, { spaces: 2 });
  loadTrainingData();
}

loadTrainingData();

module.exports = { getReply, addTrainingSample };
