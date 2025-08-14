// db.js
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("search.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT UNIQUE,
    title TEXT,
    text TEXT
  )`);
});

function savePage({ url, title, text }) {
  const stmt = db.prepare("INSERT OR IGNORE INTO pages (url, title, text) VALUES (?, ?, ?)");
  stmt.run(url, title, text);
  stmt.finalize();
}

function getAllPages(callback) {
  db.all("SELECT * FROM pages", (err, rows) => {
    if (err) throw err;
    callback(rows);
  });
}

module.exports = { savePage, getAllPages };
