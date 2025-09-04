// zutatenpreise.js
// Preisangaben pro 100g/ml oder pro Stück (Basispreise)
// Diese Datei kann beliebig erweitert werden
const zutatPreise = {
  "Mehl": { menge: 100, einheit: "g", preis: 0.20, gruppe: "Getreide" },
  "Dinkelmehl": { menge: 100, einheit: "g", preis: 0.25, gruppe: "Getreide" },
  "Milch": { menge: 1000, einheit: "ml", preis: 0.90, gruppe: "Milchprodukte" },
  "Butter": { menge: 100, einheit: "g", preis: 1.50, gruppe: "Fette & Öle" },
  "Zucker": { menge: 100, einheit: "g", preis: 0.30, gruppe: "Zucker" },
  "Ei": { menge: 1, einheit: "x", preis: 0.35, gruppe: "Eier" },
  "Tomate": { menge: 100, einheit: "g", preis: 0.60, gruppe: "Gemüse" },
  "Kartoffel": { menge: 100, einheit: "g", preis: 0.25, gruppe: "Gemüse" },
  "Apfel": { menge: 100, einheit: "g", preis: 0.40, gruppe: "Obst" },
  "Karotte": { menge: 100, einheit: "g", preis: 0.35, gruppe: "Gemüse" },
  "Zwiebel": { menge: 100, einheit: "g", preis: 0.20, gruppe: "Gemüse" },
  "Knoblauch": { menge: 10, einheit: "g", preis: 0.15, gruppe: "Gewürze" },
  "Olivenöl": { menge: 100, einheit: "ml", preis: 1.00, gruppe: "Fette & Öle" },
  "Salz": { menge: 100, einheit: "g", preis: 0.10, gruppe: "Gewürze" },
  "Pfeffer": { menge: 10, einheit: "g", preis: 0.50, gruppe: "Gewürze" },
  "Reis": { menge: 100, einheit: "g", preis: 0.40, gruppe: "Getreide" },
  "Haferflocken": { menge: 100, einheit: "g", preis: 0.35, gruppe: "Getreide" },
  "Joghurt": { menge: 100, einheit: "g", preis: 0.25, gruppe: "Milchprodukte" },
  "Käse": { menge: 100, einheit: "g", preis: 1.50, gruppe: "Milchprodukte" },
  "Schinken": { menge: 100, einheit: "g", preis: 1.80, gruppe: "Fleisch" },
  "Hähnchenbrust": { menge: 100, einheit: "g", preis: 1.70, gruppe: "Fleisch" },
  "Thunfisch": { menge: 100, einheit: "g", preis: 1.20, gruppe: "Fisch" },
  "Bananen": { menge: 100, einheit: "g", preis: 0.35, gruppe: "Obst" },
  "Zitrone": { menge: 100, einheit: "g", preis: 0.50, gruppe: "Obst" },
  "Honig": { menge: 100, einheit: "g", preis: 1.20, gruppe: "Zucker" }
  // weitere Zutaten können hier hinzugefügt werden
};
