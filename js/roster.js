console.log("ROSTER.JS CARGADO");
const rosterContainer=document.getElementById("roster");
const nxtRosterContainer=document.getElementById("nxt-roster");

function slug(name){
return String(name).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
}

function getRecord(name,fromYear=null){
let w=0,d=0,l=0;
const id=slug(name);

Object.values(eventData||{}).forEach(event=>{
const year=Number(String(event.date||"").split("/")[2]);

if(fromYear!==null&&(!year||year<fromYear))return;

(event.results||[]).forEach(result=>{
let people=[];

if(result.wrestler1)people.push(result.wrestler1);
if(result.wrestler2)people.push(result.wrestler2);
if(Array.isArray(result.team1))people.push(...result.team1.flat());
if(Array.isArray(result.team2))people.push(...result.team2.flat());
if(Array.isArray(result.participants))people.push(...result.participants);

if(!people.some(n=>slug(n)===id))return;

let outcome=null;

if(result.winner){
outcome=slug(result.winner)===id?"WIN":"LOSS";
}

else if(Array.isArray(result.participants)&&Array.isArray(result.scores)&&result.participants.length===result.scores.length){
const scores=result.scores.map(Number);
const high=Math.max(...scores);
const winners=scores.map((s,i)=>s===high?i:-1).filter(i=>i>=0);
const index=result.participants.findIndex(n=>slug(n)===id);

if(winners.length===1)
outcome=index===winners[0]?"WIN":"LOSS";
else
outcome=winners.includes(index)?"WIN":"DRAW";
}

else if(result.score1!==undefined&&result.score2!==undefined){
const a=Number(result.score1),b=Number(result.score2);

if(result.wrestler1&&slug(result.wrestler1)===id)
outcome=a>b?"WIN":a<b?"LOSS":"DRAW";

else if(result.wrestler2&&slug(result.wrestler2)===id)
outcome=b>a?"WIN":b<a?"LOSS":"DRAW";

else if(Array.isArray(result.team1)&&result.team1.flat().some(n=>slug(n)===id))
outcome=a>b?"WIN":a<b?"LOSS":"DRAW";

else if(Array.isArray(result.team2)&&result.team2.flat().some(n=>slug(n)===id))
outcome=b>a?"WIN":b<a?"LOSS":"DRAW";
}

if(outcome==="WIN")w++;
if(outcome==="DRAW")d++;
if(outcome==="LOSS")l++;
});
});

return`${w} - ${d} - ${l}`;
}

function createWrestlerCard(wrestler,index){
const card=document.createElement("div");
card.className="wrestler";

if(wrestler.brand){
card.classList.add(wrestler.brand.toLowerCase().replace(" ","-"));
}

card.onclick=function(){openModal(index);};

const image=document.createElement("img");
image.src=wrestler.image;
image.alt=wrestler.name;
image.loading="lazy";

const nickname=document.createElement("p");
nickname.textContent=wrestler.nickname||"";

const name=document.createElement("h2");
name.textContent=wrestler.name;

const stable=document.createElement("p");
stable.textContent=wrestler.stable||"";

const record2026=document.createElement("div");
record2026.className="record";
record2026.innerHTML="<span>2026 Overall</span><strong>"+getRecord(wrestler.name,2026)+"</strong>";

const careerRecord=document.createElement("div");
careerRecord.className="record";
careerRecord.innerHTML="<span>Career Overall</span><strong>"+getRecord(wrestler.name)+"</strong>";

card.appendChild(image);
card.appendChild(nickname);
card.appendChild(name);
card.appendChild(stable);
card.appendChild(record2026);
card.appendChild(careerRecord);

return card;
}

function loadMainRoster(status){
if(!rosterContainer)return;
rosterContainer.innerHTML="";

wrestlers.forEach(function(wrestler,index){
if(wrestler.status===status&&wrestler.division!=="NXT"){
rosterContainer.appendChild(createWrestlerCard(wrestler,index));
}
});
}

function loadNXTRoster(status){
if(!nxtRosterContainer)return;
nxtRosterContainer.innerHTML="";

wrestlers.forEach(function(wrestler,index){
if(wrestler.status===status&&wrestler.division==="NXT"){
nxtRosterContainer.appendChild(createWrestlerCard(wrestler,index));
}
});
}

const main=document.querySelector("main");

if(main){
const status=main.dataset.rosterStatus;
loadMainRoster(status);
loadNXTRoster(status);
}
