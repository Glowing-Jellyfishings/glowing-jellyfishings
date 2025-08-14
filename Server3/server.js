const express = require('express');
const path = require('path');
const { getReply } = require('./brain');

const app = express();
const PORT = process.env.PORT || 9993;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message;
  const botReply = getReply(userMessage);
  res.json({ reply: botReply });
});

app.listen(PORT, () => {
  console.log(`Local AI chatbot running at http://localhost:${PORT}`);
});
