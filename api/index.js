const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const filePath = path.join(__dirname, '../site/index.html');
  fs.readFile(filePath, 'utf8', (err, html) => {
    if (err) {
      res.status(500).send('Error loading page');
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.status(200).send(html);
    }
  });
};
