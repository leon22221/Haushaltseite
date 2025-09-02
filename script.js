let rezepte = []; // wird vom Server geladen
let einkaufsliste = JSON.parse(localStorage.getItem("einkaufsliste") || "[]");
const passwort = "leon2005";

// =======================
// Navigation & Seitenwechsel
// =======================
function zeigeSeite(id) {
  document.querySelectorAll("main section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");

  if (id === "rezepte") ladeRezepte();
  if (id === "liste") renderListe();
}

// =======================
// Rezepte vom Server laden
// =======================
async function ladeRezepte() {
  try {
    const res = await fetch("/api/rezepte");
    rezepte = await res.json();
    renderRezepte();
  } catch (err) {
    console.error("Fehler beim Laden der Rezepte:", err);
  }
}

// =======================
// Rezepte anzeigen
// =======================
function renderRezepte(filter="") {
  const liste = document.getElementById("rezepteListe");
  liste.innerHTML = "";
  rezepte
    .filter(r => r.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach((r, idx) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h3>${r.name}</h3>
        <p>Kategorie: ${r.kategorie}</p>
        <ul>${JSON.parse(r.zutaten).map(z => `<li>${z}</li>`).join("")}</ul>
        <button onclick="addToList(${idx})">Zur Einkaufsliste hinzufügen</button>
        <button ${r.link ? `onclick="window.open('${r.link}','_blank')" style="background-color:#4CAF50;"` : "disabled style='background-color:grey;'"}>Zum Rezept</button>
      `;
      liste.appendChild(div);
    });
}

function sucheRezepte() {
  const wert = document.getElementById("rezepteSuche").value;
  renderRezepte(wert);
}

// =======================
// Zufallsrezept
// =======================
function zeigeZufallsrezept() {
  if (rezepte.length === 0) return;
  const zufall = Math.floor(Math.random() * rezepte.length);
  const r = rezepte[zufall];
  const container = document.getElementById("zufallsrezept");
  container.innerHTML = `
    <h3>${r.name}</h3>
    <p>Kategorie: ${r.kategorie}</p>
    <ul>${JSON.parse(r.zutaten).map(z => `<li>${z}</li>`).join("")}</ul>
    <button onclick="addToList(${zufall})">Zur Einkaufsliste hinzufügen</button>
    <button ${r.link ? `onclick="window.open('${r.link}','_blank')" style="background-color:#4CAF50;"` : "disabled style='background-color:grey;'"}>Zum Rezept</button>
  `;
}

// =======================
// Einkaufsliste
// =======================
function addToList(index) {
  einkaufsliste.push(...JSON.parse(rezepte[index].zutaten));
  renderListe();
  localStorage.setItem("einkaufsliste", JSON.stringify(einkaufsliste));
  zeigeSeite("liste");
}

function addManuell() {
  const input = document.getElementById("manuelleZutat");
  const wert = input.value.trim();
  if (wert !== "") {
    einkaufsliste.push(wert);
    input.value = "";
    renderListe();
    localStorage.setItem("einkaufsliste", JSON.stringify(einkaufsliste));
  }
}

function removeFromList(index) {
  einkaufsliste.splice(index, 1);
  renderListe();
  localStorage.setItem("einkaufsliste", JSON.stringify(einkaufsliste));
}

function renderListe() {
  const div = document.getElementById("einkaufsliste");
  div.innerHTML = "<h3>Einkaufsliste</h3>";
  einkaufsliste.forEach((z, i) => {
    const item = document.createElement("div");
    item.className = "zutaten-item";
    item.innerHTML = `
      <span>${z}</span>
      <button onclick="removeFromList(${i})" style="background-color:red;">Entfernen</button>
    `;
    div.appendChild(item);
  });
}

// =======================
// Neues Rezept hinzufügen (mit Passwort)
–=======================
function addRezept() {
  const eingegebenesPasswort = prompt("Bitte Passwort eingeben, um ein neues Rezept hinzuzufügen:");
  if (eingegebenesPasswort !== passwort) {
    alert("Falsches Passwort!");
    return;
  }

  const name = document.getElementById("neuName").value.trim();
  const kat = document.getElementById("neuKategorie").value.trim();
  const zutaten = document.getElementById("neuZutaten").value.split(",").map(z => z.trim());
  const link = document.getElementById("neuLink").value.trim();

  if (!name || !kat || zutaten.length === 0) {
    alert("Bitte alle Felder ausfüllen!");
    return;
  }

  // An Server senden
  fetch("/api/rezepte", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, kategorie: kat, zutaten, link })
  })
    .then(res => res.json())
    .then(data => {
      alert("Rezept gespeichert!");
      document.getElementById("neuName").value = "";
      document.getElementById("neuKategorie").value = "";
      document.getElementById("neuZutaten").value = "";
      document.getElementById("neuLink").value = "";
      ladeRezepte();
      zeigeSeite("rezepte");
    })
    .catch(err => console.error(err));
}

// =======================
// Standard beim Laden
// =======================
ladeRezepte();
zeigeSeite("zufall");
zeigeZufallsrezept();
