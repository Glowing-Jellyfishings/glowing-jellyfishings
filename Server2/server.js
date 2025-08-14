// server.js
const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = 9992;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
