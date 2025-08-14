const express = require('express');
const path = require('path');
const app = express();
const PORT = 9994;

const videos = [
  { title: "Sample 1", src: "/videos/sample1.mp4", thumb: "/thumbs/thumb1.jpg" },
  { title: "Sample 2", src: "/videos/sample2.mp4", thumb: "/thumbs/thumb2.jpg" }
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/videos', (req, res) => {
  res.json(videos);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
