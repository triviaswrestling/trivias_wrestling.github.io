/* =========================================
   MI WRESTLING
   EVENT PAGE
   ========================================= */

const eventTitle=document.getElementById("event-title");
const eventDate=document.getElementById("event-date");
const eventBrand=document.getElementById("event-brand");
const eventResults=document.getElementById("event-results");
const params=new URLSearchParams(window.location.search);
const eventId=params.get("id");
const event=eventData[eventId];

/* =========================================
   EVENT
   ========================================= */

if(!event){
eventTitle.textContent="EVENT NOT FOUND";
eventDate.textContent="";
eventBrand.textContent="";
eventResults.innerHTML="<p>THE REQUESTED EVENT COULD NOT BE FOUND.</p>";
}else{
eventTitle.textContent=event.title||"EVENT";
eventDate.textContent=event.date||"";
eventBrand.textContent=event.brand||"";
const eventType=document.querySelector(".event-header .event-type");
if(eventType)eventType.textContent=event.type==="PLE"?"SPECIAL EVENT":event.type||"EVENT";
renderResults(event.results||[]);
}

/* =========================================
   RENDER RESULTS
   ========================================= */

function renderResults(results){
eventResults.innerHTML="";
if(!results.length){
eventResults.innerHTML=`<div class="result-card"><div class="match-winner">NO RESULTS AVAILABLE.</div></div>`;
return;
}
results.forEach(result=>{
const card=document.createElement("div");
const brand=result.brand||event.brand||"PLE";
card.className=`result-card brand-${brand.toLowerCase().replace(/\s+/g,"-")}`;
let html="";
if(result.position)html+=`<div class="match-name">${result.position}</div>`;
if(result.championship)html+=`<div class="championship-name">${result.championship}</div>`;

/* =====================================
   MULTI PARTICIPANT
   ===================================== */

if(["TRIPLE THREAT","FATAL 4-WAY","5-WAY","6-WAY","8-WAY","LADDER","ELIMINATION CHAMBER"].includes(result.type)){
html+=`<div class="match-name">${result.match||result.type}</div><div class="match"><div class="team">${(result.participants||[]).map(name=>createWrestler(name)).join("")}</div>${result.score!==undefined?`<div class="vs"><span>FINAL</span>${createSingleScore(result.score)}</div>`:""}</div>`;
}

/* =====================================
   TAG TEAM
   ===================================== */

else if(result.type==="TAG TEAM"){
html+=`<div class="match-name">TAG TEAM</div><div class="match"><div class="team">${(result.team1||[]).map(name=>createWrestler(name)).join("")}</div><div class="vs"><span>VS</span>${createScore(result.score1,result.score2)}</div><div class="team">${(result.team2||[]).map(name=>createWrestler(name)).join("")}</div></div>`;
}

/* =====================================
   MULTI TEAM
   ===================================== */

else if(["3 VS 3","4 VS 4","5 VS 5","6 VS 6","7 VS 7","8 VS 8","WARGAMES","SURVIVOR SERIES"].includes(result.type)){
html+=`<div class="match-name">${result.match||result.type}</div><div class="match"><div class="team">${(result.team1||[]).flat().map(name=>createWrestler(name)).join("")}</div><div class="vs"><span>VS</span>${result.score1!==undefined?createScore(result.score1,result.score2):""}</div><div class="team">${(result.team2||[]).flat().map(name=>createWrestler(name)).join("")}</div></div>`;
}

/* =====================================
   ELIMINATION CHAMBER TAG TEAM
   ===================================== */

else if(result.type==="ELIMINATION CHAMBER TAG TEAM"){
html+=`<div class="match-name">ELIMINATION CHAMBER TAG TEAM</div><div class="match"><div class="team">${(result.team1||[]).flat().map(name=>createWrestler(name)).join("")}</div><div class="vs"><span>FINAL</span>${result.score!==undefined?createSingleScore(result.score):""}</div><div class="team">${(result.team2||[]).flat().map(name=>createWrestler(name)).join("")}</div></div>`;
}

/* =====================================
   LADDER TAG
   ===================================== */

else if(result.type==="LADDER TAG"){
html+=`<div class="match-name">LADDER TAG</div><div class="match"><div class="team">${(result.team1||[]).flat().map(name=>createWrestler(name)).join("")}</div><div class="vs"><span>FINAL</span>${result.score!==undefined?createSingleScore(result.score):""}</div><div class="team">${(result.team2||[]).flat().map(name=>createWrestler(name)).join("")}</div></div>`;
}

/* =====================================
   BATTLE ROYALE
   ===================================== */

else if(result.type==="BATTLE ROYALE"){
html+=`<div class="match-name">BATTLE ROYALE</div><div class="match"><div class="team">${(result.participants||[]).map(name=>createWrestler(name)).join("")}</div></div>`;
}

/* =====================================
   ROYAL RUMBLE
   ===================================== */

else if(result.type==="ROYAL RUMBLE"){
html+=`<div class="match-name">ROYAL RUMBLE</div><div class="match"><div class="team">${(result.participants||[]).map(name=>createWrestler(name)).join("")}</div></div>`;
}

/* =====================================
   NORMAL MATCH
   ===================================== */

else{
html+=`<div class="match"><div class="team">${createWrestler(result.wrestler1)}</div><div class="vs"><span>VS</span>${createScore(result.score1,result.score2)}</div><div class="team">${createWrestler(result.wrestler2)}</div></div>`;
}

/* =====================================
   WINNER
   ===================================== */

if(result.winner){
html+=`<div class="match-winner">WINNER:<strong>${result.winner}</strong></div>`;
}else{
const score1=Number(result.score1),score2=Number(result.score2);
if(!isNaN(score1)&&!isNaN(score2)){
let winner="DRAW";
if(score1>score2)winner=result.type==="TAG TEAM"||(result.team1&&result.team2)?(result.team1||[]).join(" + "):result.wrestler1;
if(score2>score1)winner=result.type==="TAG TEAM"||(result.team1&&result.team2)?(result.team2||[]).join(" + "):result.wrestler2;
html+=`<div class="match-winner">WINNER:<strong>${winner}</strong></div>`;
}
}
card.innerHTML=html;
eventResults.appendChild(card);
});
}

/* =========================================
   CREATE WRESTLER
   ========================================= */

function createWrestler(name){
if(!name)return"";
const encoded=encodeURIComponent(name);
const image=typeof wrestlerData!=="undefined"&&wrestlerData[name]?.image?wrestlerData[name].image:"images/Vacante.jpg";
return`<a href="records.html?id=${encoded}" class="wrestler-link"><div class="wrestler" tabindex="0"><img src="${image}" alt="${name}" loading="lazy"><span>${name}</span></div></a>`;
}

/* =========================================
   CREATE SCORE
   ========================================= */

function createScore(score1,score2){
return`<div class="match-score"><span>${score1??""}</span><span>-</span><span>${score2??""}</span></div>`;
}

/* =========================================
   CREATE SINGLE SCORE
   ========================================= */

function createSingleScore(score){
if(score===undefined||score===null||score==="")return"";
return`<div class="match-score"><span>${score}</span></div>`;
}
