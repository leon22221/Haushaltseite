let rezepte = [];
let einkaufsliste = JSON.parse(localStorage.getItem("einkaufsliste")) || [];

function zeigeSeite(id){
  document.querySelectorAll("main section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  if(id==="rezepte") renderRezepte();
  if(id==="liste") renderListe();
}

async function ladeRezepte(){
  try{
    const res = await fetch("/api/rezepte");
    const data = await res.json();
    rezepte = data.map(r => ({...r, zutaten: JSON.parse(r.zutaten)}));
    renderRezepte();
    zeigeZufallsrezept();
  }catch(err){ console.error("Fehler:", err);}
}

function zeigeZufallsrezept(){
  if(rezepte.length===0) return;
  const zufall = Math.floor(Math.random()*rezepte.length);
  const r = rezepte[zufall];
  const container = document.getElementById("zufallsrezept");
  container.innerHTML = `
    <h3>${r.name}</h3>
    <p>Kategorie: ${r.kategorie}</p>
    <ul>${r.zutaten.map(z=>`<li>${z}</li>`).join("")}</ul>
    <button onclick="addToList(${zufall})" class="btn-red">Zur Einkaufsliste hinzufügen</button>
    <button class="${r.link?'btn-green':'btn-grey'}" ${r.link?`onclick="window.open('${r.link}','_blank')"`:'disabled'}>Rezept ansehen</button>
  `;
}

function addToList(index){
  einkaufsliste.push(...rezepte[index].zutaten);
  speicherListe();
  renderListe();
  zeigeSeite("liste");
}

function addManuell(){
  const input = document.getElementById("manuelleZutat");
  const wert = input.value.trim();
  if(wert!==""){
    einkaufsliste.push(wert);
    input.value="";
    speicherListe();
    renderListe();
  }
}

function removeFromList(index){
  einkaufsliste.splice(index,1);
  speicherListe();
  renderListe();
}

function renderListe(){
  const div = document.getElementById("einkaufsliste");
  div.innerHTML="<h3>Einkaufsliste</h3>";
  einkaufsliste.forEach((z,i)=>{
    const item=document.createElement("div");
    item.className="zutaten-item";
    item.innerHTML=`<span>${z}</span><button class="btn-red" onclick="removeFromList(${i})">Entfernen</button>`;
    div.appendChild(item);
  });
}

function speicherListe(){ localStorage.setItem("einkaufsliste", JSON.stringify(einkaufsliste)); }

function renderRezepte(filter=""){
  const liste=document.getElementById("rezepteListe");
  liste.innerHTML="";
  rezepte.filter(r=>r.name.toLowerCase().includes(filter.toLowerCase())).forEach((r,idx)=>{
    const div=document.createElement("div");
    div.className="card";
    div.innerHTML=`
      <h3>${r.name}</h3>
      <p>Kategorie: ${r.kategorie}</p>
      <ul>${r.zutaten.map(z=>`<li>${z}</li>`).join("")}</ul>
      <button onclick="addToList(${idx})" class="btn-red">Zur Einkaufsliste hinzufügen</button>
      <button class="${r.link?'btn-green':'btn-grey'}" ${r.link?`onclick="window.open('${r.link}','_blank')"`:'disabled'}>Rezept ansehen</button>
    `;
    liste.appendChild(div);
  });
}

function sucheRezepte(){
  const wert=document.getElementById("rezepteSuche").value;
  renderRezepte(wert);
}

document.getElementById("mobileBtn").onclick=function(){
  document.body.classList.toggle("mobile-mode");
}

// Initialisierung
zeigeSeite("zufall");
ladeRezepte();
