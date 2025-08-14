const express = require('express');
const path = require('path');
const { getReply, addTrainingSample } = require('./brain');

const app = express();
const PORT = process.env.PORT || 9993;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  const reply = getReply(message);
  res.json({ reply });
});

app.post('/api/train', (req, res) => {
  const { input, label } = req.body;
  addTrainingSample(input, label);
  res.json({ status: 'Training updated' });
});

app.listen(PORT, () => {
  console.log(`AI chatbot running at http://localhost:${PORT}`);
});
