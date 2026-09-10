/* =========================================
   MI WRESTLING
   SUPERSTAR PAGE
   ========================================= */

const params=new URLSearchParams(window.location.search);
const superstarId=params.get("id");

const superstarName=document.getElementById("superstar-name");
const superstarImage=document.getElementById("superstar-image");
const superstarNickname=document.getElementById("superstar-nickname");
const superstarBrand=document.getElementById("superstar-brand");
const superstarChampionships=document.getElementById("superstar-championships");
const recordElement=document.getElementById("superstar-record");
const historyElement=document.getElementById("match-history");

/* =========================================
   FIND SUPERSTAR
   ========================================= */

function createWrestlerId(name){
return name.toLowerCase()
.replace(/[^a-z0-9]+/g,"-")
.replace(/^-|-$/g,"");
}

const superstar=typeof wrestlers!=="undefined"
?wrestlers.find(w=>createWrestlerId(w.name)===superstarId)
:null;

/* =========================================
   PAGE
   ========================================= */

if(!superstar){
if(superstarName)superstarName.textContent="SUPERSTAR NOT FOUND";
}else{
renderSuperstar();
renderRecords();
}

/* =========================================
   SUPERSTAR
   ========================================= */

function renderSuperstar(){
if(superstarName)superstarName.textContent=superstar.name||"";
if(superstarImage)superstarImage.src=superstar.image||"images/Vacante.jpg";
if(superstarImage)superstarImage.alt=superstar.name||"";
if(superstarNickname)superstarNickname.textContent=superstar.nickname||"";
if(superstarBrand)superstarBrand.textContent=superstar.brand||"";
if(superstarChampionships)superstarChampionships.textContent=(superstar.championships||[]).join(" • ");
}

/* =========================================
   RECORDS
   ========================================= */

function renderRecords(){
let wins=0;
let losses=0;
let draws=0;
let history=[];

if(typeof eventData==="undefined"){
showRecord(0,0,0);
return;
}

Object.values(eventData).forEach(event=>{
(event.results||[]).forEach(result=>{
const matches=getMatchParticipants(result);
if(!matches.some(name=>isSameSuperstar(name,superstar.name)))return;

const outcome=getOutcome(result,superstar.name);
if(!outcome)return;

if(outcome==="WIN")wins++;
if(outcome==="LOSS")losses++;
if(outcome==="DRAW")draws++;

history.push({
event:event.title||"EVENT",
date:event.date||"",
type:event.type||"",
result:outcome,
match:getMatchLabel(result)
});
});
});

history.sort((a,b)=>dateValue(b.date)-dateValue(a.date));
showRecord(wins,losses,draws);
renderHistory(history);
}

/* =========================================
   PARTICIPANTS
   ========================================= */

function getMatchParticipants(result){
let names=[];

if(result.wrestler1)names.push(result.wrestler1);
if(result.wrestler2)names.push(result.wrestler2);

if(Array.isArray(result.team1))names.push(...result.team1.flat(Infinity));
if(Array.isArray(result.team2))names.push(...result.team2.flat(Infinity));

if(Array.isArray(result.participants))names.push(...result.participants.flat(Infinity));

return names.filter(Boolean);
}

/* =========================================
   OUTCOME
   ========================================= */

function getOutcome(result,name){
const participants=getMatchParticipants(result);
if(!participants.some(x=>isSameSuperstar(x,name)))return null;

if(result.winner){
return isSameSuperstar(result.winner,name)?"WIN":"LOSS";
}

if(result.score1===undefined||result.score2===undefined)return null;

const s1=Number(result.score1);
const s2=Number(result.score2);

if(isNaN(s1)||isNaN(s2))return null;

const team1=result.team1||[];
const team2=result.team2||[];

if(team1.length||team2.length){
const inTeam1=team1.some(x=>isSameSuperstar(x,name));
const inTeam2=team2.some(x=>isSameSuperstar(x,name));

if(s1>s2)return inTeam1?"WIN":inTeam2?"LOSS":null;
if(s2>s1)return inTeam2?"WIN":inTeam1?"LOSS":null;
return inTeam1||inTeam2?"DRAW":null;
}

if(s1>s2)return isSameSuperstar(result.wrestler1,name)?"WIN":"LOSS";
if(s2>s1)return isSameSuperstar(result.wrestler2,name)?"WIN":"LOSS";
return" DRAW ".trim();
}

/* =========================================
   SAME SUPERSTAR
   ========================================= */

function isSameSuperstar(a,b){
return createWrestlerId(a||"")===createWrestlerId(b||"");
}

/* =========================================
   MATCH LABEL
   ========================================= */

function getMatchLabel(result){
if(result.championship)return result.championship;
if(result.match)return result.match;
if(result.type)return result.type;
return"SINGLES";
}

/* =========================================
   RECORD DISPLAY
   ========================================= */

function showRecord(wins,losses,draws){
const text=`${wins}-${losses}-${draws}`;
if(recordElement)recordElement.textContent=text;
}

/* =========================================
   HISTORY
   ========================================= */

function renderHistory(history){
if(!historyElement)return;

historyElement.innerHTML="";

if(!history.length){
historyElement.innerHTML="<p>NO MATCHES FOUND.</p>";
return;
}

history.forEach(match=>{
const item=document.createElement("div");
item.className=`match-history-item ${match.result.toLowerCase()}`;

item.innerHTML=`
<div class="match-history-event">${match.event}</div>
<div class="match-history-date">${match.date}</div>
<div class="match-history-type">${match.type}</div>
<div class="match-history-match">${match.match}</div>
<div class="match-history-result">${match.result}</div>`;

historyElement.appendChild(item);
});
}

/* =========================================
   DATE
   ========================================= */

function dateValue(date){
if(!date)return 0;
const [d,m,y]=date.split("/").map(Number);
return new Date(y,m-1,d).getTime();
}
