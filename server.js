const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("../public")); // Website ausliefern

// Datenbank öffnen (erstellt Datei, falls nicht vorhanden)
const db = new sqlite3.Database("rezepte.db");

// Tabelle erstellen, falls sie nicht existiert
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS rezepte (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    kategorie TEXT NOT NULL,
    zutaten TEXT NOT NULL,
    link TEXT
  )`);
});

// Rezepte abrufen
app.get("/api/rezepte", (req, res) => {
  db.all("SELECT * FROM rezepte", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Neues Rezept speichern
app.post("/api/rezepte", (req, res) => {
  const { name, kategorie, zutaten, link } = req.body;
  const zutatenStr = JSON.stringify(zutaten); // Array als JSON speichern
  db.run(
    "INSERT INTO rezepte (name,kategorie,zutaten,link) VALUES (?,?,?,?)",
    [name, kategorie, zutatenStr, link],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Server starten
app.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));
