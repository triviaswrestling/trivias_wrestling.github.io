/* =========================================
   MI WRESTLING
   SUPERSTAR PAGE
   ========================================= */

const urlParams=new URLSearchParams(window.location.search);
const wrestlerId=urlParams.get("id");
const imageElement=document.getElementById("superstar-image");
const nameElement=document.getElementById("superstar-name");
const nicknameElement=document.getElementById("superstar-nickname");
const brandElement=document.getElementById("superstar-brand");
const winsElement=document.getElementById("wins");
const lossesElement=document.getElementById("losses");
const drawsElement=document.getElementById("draws");
const singlesRecordElement=document.getElementById("singles-record");
const tagRecordElement=document.getElementById("tag-record");
const sixManRecordElement=document.getElementById("six-man-record");
const championshipsElement=document.getElementById("championships");
const matchHistoryElement=document.getElementById("match-history");

/* =========================================
   HELPERS
   ========================================= */

function createWrestlerId(name){
return name.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
}

function normalizeName(name){
return String(name||"").toLowerCase().trim();
}

function parseDate(date){
if(!date)return 0;
const parts=date.split("/");
if(parts.length!==3)return 0;
return new Date(`${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`).getTime();
}

function addDays(date,days){
const result=new Date(date);
result.setDate(result.getDate()+days);
return result;
}

function formatDate(date){
return`${String(date.getDate()).padStart(2,"0")}/${String(date.getMonth()+1).padStart(2,"0")}/${date.getFullYear()}`;
}

function arrayNames(value){
if(!value)return[];
if(Array.isArray(value))return value.flat(Infinity).filter(Boolean);
return[value];
}

function containsName(value,name){
return arrayNames(value).some(n=>normalizeName(n)===name);
}

/* =========================================
   FIND SUPERSTAR
   ========================================= */

const superstar=typeof wrestlers!=="undefined"
?wrestlers.find(w=>createWrestlerId(w.name)===wrestlerId||w.id===wrestlerId)
:null;

if(!superstar){

nameElement.textContent="SUPERSTAR NOT FOUND";
nicknameElement.textContent="";
brandElement.textContent="";
matchHistoryElement.innerHTML=`<p>This superstar does not exist.</p>`;

}else{

/* =========================================
   BASIC INFORMATION
   ========================================= */

imageElement.src=superstar.image||"images/Vacante.jpg";
imageElement.alt=superstar.name;
nameElement.textContent=superstar.name;
nicknameElement.textContent=superstar.nickname||"";
brandElement.textContent=superstar.brand||"NO BRAND";
championshipsElement.innerHTML="";

if(superstar.achievements&&superstar.achievements.length){

superstar.achievements.forEach(achievement=>{
const item=document.createElement("p");
item.textContent=achievement;
championshipsElement.appendChild(item);
});

}else championshipsElement.innerHTML=`<p>NO CHAMPIONSHIPS</p>`;

/* =========================================
   MATCH HISTORY
   ========================================= */

const matchHistory=[];
const wrestlerName=normalizeName(superstar.name);

function addMatch(match){
matchHistory.push(match);
}

/* =========================================
   EVENT CATEGORY
   ========================================= */

function getEventCategory(eventId,event){

const id=normalizeName(eventId);
const title=normalizeName(event.title||"");

if(event.type==="WEEKLY"||id.startsWith("weekly-"))return"WEEKLY";
if(event.type==="NXT"||id.startsWith("nxt-"))return"NXT";
if(event.type==="PLE")return"PLE";

const pleNames=[
"wrestlemania","summer slam","summerslam","royal rumble",
"night of champions","money in the bank","survivor series",
"backlash","crown jewel","king of the ring","queen of the ring"
];

if(pleNames.some(name=>title.includes(name)))return"PLE";

return"SPECIAL";
}

/* =========================================
   EVENT RESULTS
   ========================================= */

if(typeof eventData!=="undefined"){

Object.entries(eventData).forEach(([eventId,event])=>{

if(!event.results)return;

const category=getEventCategory(eventId,event);
const weeklyMatch=eventId.toLowerCase().match(/^weekly-(\d+)$/);
const weeklyNumber=weeklyMatch?Number(weeklyMatch[1]):null;

event.results.forEach(result=>{

let participants=[];
let opponents=[];

if(result.type==="TAG TEAM"||
result.type==="6-MAN TAG TEAM"||
result.type==="3 VS 3"||
result.type==="4 VS 4"||
result.type==="5 VS 5"||
result.type==="6 VS 6"||
result.type==="7 VS 7"||
result.type==="8 VS 8"||
result.type==="WARGAMES"||
result.type==="SURVIVOR SERIES"||
result.type==="ELIMINATION CHAMBER TAG TEAM"||
result.type==="LADDER TAG"){

const team1=arrayNames(result.team1);
const team2=arrayNames(result.team2);

if(containsName(team1,wrestlerName)){
participants=team1;
opponents=team2;
}else if(containsName(team2,wrestlerName)){
participants=team2;
opponents=team1;
}else return;

}else if(result.participants){

const all=arrayNames(result.participants);

if(!containsName(all,wrestlerName))return;

participants=[superstar.name];
opponents=all.filter(name=>normalizeName(name)!==wrestlerName);

}else{

const wrestler1=result.wrestler1;
const wrestler2=result.wrestler2;

if(containsName(wrestler1,wrestlerName)){
participants=[superstar.name];
opponents=arrayNames(wrestler2);
}else if(containsName(wrestler2,wrestlerName)){
participants=[superstar.name];
opponents=arrayNames(wrestler1);
}else return;

}

/* =====================================
   RESULT STATUS
   ===================================== */

let resultStatus="DRAW";

if(result.winner){

const winner=normalizeName(result.winner);

if(winner==="draw"){
resultStatus="DRAW";

}else if(winner==="team 1"&&containsName(result.team1,wrestlerName)){
resultStatus="WIN";

}else if(winner==="team 2"&&containsName(result.team2,wrestlerName)){
resultStatus="WIN";

}else if(winner===wrestlerName){
resultStatus="WIN";

}else if(
containsName(result.team1,wrestlerName)||
containsName(result.team2,wrestlerName)
){
resultStatus="LOSS";
}

}else if(result.score1!==undefined&&result.score2!==undefined){

const score1=Number(result.score1);
const score2=Number(result.score2);

if(!isNaN(score1)&&!isNaN(score2)){

if(result.type==="TAG TEAM"||
result.type==="6-MAN TAG TEAM"||
result.type==="3 VS 3"||
result.type==="4 VS 4"||
result.type==="5 VS 5"||
result.type==="6 VS 6"||
result.type==="7 VS 7"||
result.type==="8 VS 8"||
result.type==="WARGAMES"||
result.type==="SURVIVOR SERIES"||
result.type==="ELIMINATION CHAMBER TAG TEAM"||
result.type==="LADDER TAG"){

const inTeam1=containsName(result.team1,wrestlerName);

if(score1===score2)resultStatus="DRAW";
else if(inTeam1)resultStatus=score1>score2?"WIN":"LOSS";
else resultStatus=score2>score1?"WIN":"LOSS";

}else{

const inFirst=containsName(result.wrestler1,wrestlerName);

if(score1===score2)resultStatus="DRAW";
else if(inFirst)resultStatus=score1>score2?"WIN":"LOSS";
else resultStatus=score2>score1?"WIN":"LOSS";

}

}

}

/* =====================================
   ADD MATCH
   ===================================== */

addMatch({
source:"EVENT",
category,
weeklyNumber,
title:event.title,
date:event.date,
sortDate:parseDate(event.date),
round:null,
type:result.type||"SINGLES",
match:result.match||result.type||"MATCH",
opponents,
status:resultStatus,
url:`event.html?id=${eventId}`
});

});

});

}

/* =========================================
   SORT HISTORY
   ========================================= */

const categoryOrder={WEEKLY:1,NXT:2,PLE:3,SPECIAL:4};

matchHistory.sort((a,b)=>{

if(a.category!==b.category)
return categoryOrder[a.category]-categoryOrder[b.category];

if(a.category==="WEEKLY"){

if(a.weeklyNumber!==b.weeklyNumber)
return(b.weeklyNumber||0)-(a.weeklyNumber||0);

}

return b.sortDate-a.sortDate;

});

/* =========================================
   OVERALL RECORD
   ========================================= */

let totalWins=0,totalLosses=0,totalDraws=0;

matchHistory.forEach(match=>{

if(match.status==="WIN")totalWins++;
else if(match.status==="LOSS")totalLosses++;
else totalDraws++;

});

winsElement.textContent=totalWins;
lossesElement.textContent=totalLosses;
drawsElement.textContent=totalDraws;

/* =========================================
   DIVISION RECORDS
   ========================================= */

let singlesWins=0,singlesLosses=0,singlesDraws=0;
let tagWins=0,tagLosses=0,tagDraws=0;
let sixManWins=0,sixManLosses=0,sixManDraws=0;

matchHistory.forEach(match=>{

if(match.type==="SINGLES"){

if(match.status==="WIN")singlesWins++;
else if(match.status==="LOSS")singlesLosses++;
else singlesDraws++;

}else if(
match.type==="TAG TEAM"||
match.type==="LADDER TAG"||
match.type==="ELIMINATION CHAMBER TAG TEAM"
){

if(match.status==="WIN")tagWins++;
else if(match.status==="LOSS")tagLosses++;
else tagDraws++;

}else if(
["6-MAN TAG TEAM","6 VS 6","WARGAMES"].includes(match.type)
){

if(match.status==="WIN")sixManWins++;
else if(match.status==="LOSS")sixManLosses++;
else sixManDraws++;

}

});

singlesRecordElement.textContent=`${singlesWins} - ${singlesLosses} - ${singlesDraws}`;
tagRecordElement.textContent=`${tagWins} - ${tagLosses} - ${tagDraws}`;
sixManRecordElement.textContent=`${sixManWins} - ${sixManLosses} - ${sixManDraws}`;

/* =========================================
   RENDER MATCH HISTORY
   ========================================= */

function renderMatch(match){

const row=document.createElement("div");
row.className="match-history-row";

row.addEventListener("click",()=>{
if(match.url)window.location.href=match.url;
});

row.innerHTML=`
<div class="match-history-info">
<div class="match-history-source">${match.source}</div>
<div class="match-history-title">${match.title}</div>
<div class="match-history-match">${match.match}</div>
<div class="match-history-opponent">VS ${match.opponents.join(" & ")||"N/A"}</div>
<div class="match-history-date">${match.date} · ${match.type}</div>
</div>
<div class="match-history-result ${match.status.toLowerCase()}">${match.status}</div>
`;

matchHistoryElement.appendChild(row);

}

/* =========================================
   HISTORY
   ========================================= */

if(matchHistory.length===0){

matchHistoryElement.innerHTML=`<p>NO MATCHES</p>`;

}else{

matchHistoryElement.innerHTML="";

const categories=["WEEKLY","NXT","PLE","SPECIAL"];

categories.forEach(category=>{

const categoryMatches=matchHistory.filter(match=>match.category===category);

if(!categoryMatches.length)return;

const categoryTitle=document.createElement("div");
categoryTitle.className="match-history-category";
categoryTitle.textContent=category;
matchHistoryElement.appendChild(categoryTitle);

if(category==="WEEKLY"){

const weeklyGroups={};

categoryMatches.forEach(match=>{

const number=match.weeklyNumber||1;

if(!weeklyGroups[number])
weeklyGroups[number]=[];

weeklyGroups[number].push(match);

});

Object.keys(weeklyGroups)
.map(Number)
.sort((a,b)=>b-a)
.forEach(weeklyNumber=>{

const weeklyTitle=document.createElement("div");
weeklyTitle.className="match-history-category";
weeklyTitle.textContent=`WEEKLY #${weeklyNumber}`;
matchHistoryElement.appendChild(weeklyTitle);

weeklyGroups[weeklyNumber]
.sort((a,b)=>b.sortDate-a.sortDate)
.forEach(renderMatch);

});

}else{

categoryMatches.forEach(renderMatch);

}

});

}

    }
