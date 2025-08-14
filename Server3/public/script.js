const chatForm = document.getElementById('chat-form');
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

const trainingData = [
  { input: 'hello', output: 'greeting' },
  { input: 'hi', output: 'greeting' },
  { input: 'hey', output: 'greeting' },
  { input: 'how are you', output: 'status' },
  { input: 'what is your name', output: 'identity' },
  { input: 'tell me a joke', output: 'joke' },
  { input: 'bye', output: 'farewell' },
  { input: 'goodbye', output: 'farewell' }
];

const responses = {
  greeting: 'Hey there! 👋',
  status: "I'm doing great, thanks for asking!",
  identity: "I'm your local AI chatbot powered by TensorFlow.js.",
  joke: "Why did the developer go broke? Because he used up all his cache!",
  farewell: "Goodbye! Have a great day!"
};

let model;
let wordIndex = {};

async function trainModel() {
  const vocab = [...new Set(trainingData.flatMap(d => d.input.split(' ')))];
  vocab.forEach((word, i) => wordIndex[word] = i + 1);

  const xs = tf.tensor2d(trainingData.map(d => encode(d.input)), [trainingData.length, vocab.length]);
  const ys = tf.tensor2d(trainingData.map(d => oneHot(d.output)), [trainingData.length, Object.keys(responses).length]);

  model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [vocab.length], units: 16, activation: 'relu' }));
  model.add(tf.layers.dense({ units: Object.keys(responses).length, activation: 'softmax' }));
  model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

  await model.fit(xs, ys, { epochs: 100 });
}

function encode(text) {
  const vec = Array(Object.keys(wordIndex).length).fill(0);
  text.split(' ').forEach(word => {
    const idx = wordIndex[word];
    if (idx) vec[idx - 1] = 1;
  });
  return vec;
}

function oneHot(label) {
  const labels = Object.keys(responses);
  return labels.map(l => l === label ? 1 : 0);
}

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage('user', message);
  userInput.value = '';

  const inputVec = tf.tensor2d([encode(message)], [1, Object.keys(wordIndex).length]);
  const prediction = model.predict(inputVec);
  const labelIndex = prediction.argMax(1).dataSync()[0];
  const label = Object.keys(responses)[labelIndex];

  appendMessage('bot', responses[label] || "I'm not sure how to respond to that.");
});

trainModel();
