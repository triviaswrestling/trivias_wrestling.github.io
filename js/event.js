/* =========================================
   MI WRESTLING
   EVENT PAGE
   ========================================= */

const eventTitle=document.getElementById("event-title");
const eventDate=document.getElementById("event-date");
const eventBrand=document.getElementById("event-brand");
const eventResults=document.getElementById("event-results");
const eventChronology=document.getElementById("event-chronology");

const params=new URLSearchParams(window.location.search);
const eventId=params.get("id");


/* =========================================
   SHOW BRAND
   ========================================= */

function getShowBrand(id){

const show=String(id||"").split("-")[0].toLowerCase();

const brands={
raw:"RAW",
smackdown:"SMACKDOWN",
nxt:"NXT",
speed:"SPEED",
aaa:"AAA",
aew:"AEW",
tna:"TNA",
cmll:"CMLL"
};

return brands[show]||"";

}


/* =========================================
   GET TOURNAMENT EVENT
   ========================================= */

function getTournamentEvent(id){

if(typeof tournamentData==="undefined")return null;


/* =====================================
   WEEKLY
   RAW + SMACKDOWN
   ===================================== */

const weeklyMatch=id.match(/^weekly-(\d+)$/);

if(weeklyMatch){

const number=Number(weeklyMatch[1]);

if(number<1||number>1000)return null;

const showIds=[
"raw-"+number,
"smackdown-"+number
];

const results=[];
const dates=[];

for(const tournamentId in tournamentData){

const data=tournamentData[tournamentId];

if(!data)continue;

for(const showId of showIds){

let show=null;


/* NEW SHOWS */

if(data.shows&&data.shows[showId]){
show=data.shows[showId];
}


/* OLD WEEKLY */

if(!show&&data.weekly&&data.weekly[showId]){
show=data.weekly[showId];
}


/* OLD MATCHES */

if(
!show&&
data.matches&&
!Array.isArray(data.matches)&&
data.matches[showId]
){
show=data.matches[showId];
}

if(!show)continue;

if(show.date)dates.push(show.date);

const matches=
show.matches||
show.results||
[];

results.push(
...convertTournamentResults(
matches,
showId
)
);

}

}

if(!results.length)return null;

let date="";

if(dates.length){

dates.sort((a,b)=>
parseDate(a)-parseDate(b)
);

date=dates[0];

}

return{
id:id,
title:"WEEKLY #"+number,
date:date,
brand:"",
type:"WEEKLY",
source:"tournamentData",
results:results
};

}


/* =====================================
   INDIVIDUAL SHOW
   RAW / SMACKDOWN / NXT / SPEED /
   AAA / AEW / TNA
   ===================================== */

const showMatch=
id.match(/^(raw|smackdown|nxt|speed|aaa|aew|tna|cmll)-(\d+)$/i);

if(showMatch){

const showId=id.toLowerCase();
const number=Number(showMatch[2]);
const brand=getShowBrand(showId);

if(number<1||number>10000)return null;


/* =================================
   SEARCH ONLY THIS SHOW
   ================================= */

for(const tournamentId in tournamentData){

const data=tournamentData[tournamentId];

if(!data)continue;

let show=null;


/* NEW SHOWS */

if(data.shows&&data.shows[showId]){
show=data.shows[showId];
}


/* OLD WEEKLY */

if(!show&&data.weekly&&data.weekly[showId]){
show=data.weekly[showId];
}


/* OLD MATCHES */

if(
!show&&
data.matches&&
!Array.isArray(data.matches)&&
data.matches[showId]
){
show=data.matches[showId];
}

if(!show)continue;

const matches=
show.matches||
show.results||
[];

return{
id:id,
title:brand+" #"+number,
date:show.date||"",
brand:brand,
type:brand==="NXT"?"NXT":"WEEKLY",
source:"tournamentData",
results:convertTournamentResults(
matches,
showId
)
};

}

return null;

}

return null;

}


/* =========================================
   TOURNAMENT RESULT ADAPTER
   ========================================= */

function convertTournamentResults(
results,
showId=""
){

if(!Array.isArray(results))return[];

const brand=getShowBrand(showId);

return results.map(match=>{

const wrestler1=
Array.isArray(match)
?match[0]
:match.wrestler1||
match.a||
match.player1||
match.p1||
"";

const wrestler2=
Array.isArray(match)
?match[1]
:match.wrestler2||
match.b||
match.player2||
match.p2||
"";

const score1=
Array.isArray(match)
?match[2]
:match.score1!==undefined
?match.score1
:match.scoreA!==undefined
?match.scoreA
:"";

const score2=
Array.isArray(match)
?match[3]
:match.score2!==undefined
?match.score2
:match.scoreB!==undefined
?match.scoreB
:"";

let winner=
!Array.isArray(match)
?match.winner||null
:null;

if(!winner){

const s1=Number(score1);
const s2=Number(score2);

if(!isNaN(s1)&&!isNaN(s2)){

if(s1>s2)winner=wrestler1;
else if(s2>s1)winner=wrestler2;

}

}

return{
type:"NORMAL",
wrestler1:wrestler1,
wrestler2:wrestler2,
score1:score1,
score2:score2,
winner:winner,
source:"tournamentData",
brand:brand
};

});

}


/* =========================================
   GET OUTSIDER EVENT
   SPEED / AEW / TNA / AAA / CMLL
   ========================================= */

function getOutsiderEvent(id){

if(typeof outsiderData==="undefined")return null;

for(const tournamentId in outsiderData){

const data=outsiderData[tournamentId];

if(!data||!data.shows)continue;

const show=data.shows[id];

if(!show)continue;

const brand=data.brand||getShowBrand(id);

const matches=
show.matches||
show.results||
[];

return{

id:id,

title:
show.title||
brand+" #"+id.split("-").pop(),

date:
show.date||"",

brand:brand,

type:brand,

source:"outsiderData",

results:
convertOutsiderResults(
matches,
id,
brand
)

};

}

return null;

}


/* =========================================
   OUTSIDER RESULT ADAPTER
   ========================================= */

function convertOutsiderResults(
results,
showId="",
brand=""
){

if(!Array.isArray(results))return[];

return results.map(match=>{

const wrestler1=
Array.isArray(match)
?match[0]
:"";

const wrestler2=
Array.isArray(match)
?match[1]
:"";

const score1=
Array.isArray(match)
?match[2]
:"";

const score2=
Array.isArray(match)
?match[3]
:"";

let winner=null;

const s1=Number(score1);
const s2=Number(score2);

if(!isNaN(s1)&&!isNaN(s2)){

if(s1>s2){

winner=wrestler1;

}else if(s2>s1){

winner=wrestler2;

}

}

return{

type:"NORMAL",

wrestler1:wrestler1,

wrestler2:wrestler2,

score1:score1,

score2:score2,

winner:winner,

source:"outsiderData",

brand:brand

};

});

}


/* =========================================
   DATE HELPER
   ========================================= */

function parseDate(date){

if(!date)return 0;

const parts=String(date).split("/");

if(parts.length!==3)return 0;

const day=Number(parts[0]);
const month=Number(parts[1]);
const year=Number(parts[2]);

return new Date(
year,
month-1,
day
).getTime();

}


/* =========================================
   GET EVENT
   ========================================= */

let event=null;


/* =========================================
   1. EVENT DATA
   ========================================= */

if(
typeof eventData!=="undefined"&&
eventData[eventId]
){

event=eventData[eventId];

}


/* =========================================
   2. TOURNAMENT DATA
   ========================================= */

if(!event){

event=getTournamentEvent(eventId);

}


/* =========================================
   3. OUTSIDER DATA
   ========================================= */

if(!event){

event=getOutsiderEvent(eventId);

}


/* =========================================
   EVENT
   ========================================= */

if(!event){

eventTitle.textContent="EVENT NOT FOUND";
eventDate.textContent="";
eventBrand.textContent="";

eventResults.innerHTML=
"<p>THE REQUESTED EVENT COULD NOT BE FOUND.</p>";

}else{

eventTitle.textContent=
event.title||"EVENT";

eventDate.textContent=
event.date||"";

eventBrand.textContent=
event.brand||"";

const type=
document.querySelector(
".event-header .event-type"
);

if(type){

type.textContent=
event.type==="PLE"
?"SPECIAL EVENT"
:event.type||"EVENT";

}

renderResults(event.results||[]);
renderChronology(event);

}


/* =========================================
   RENDER RESULTS
   ========================================= */

function renderResults(results){

eventResults.innerHTML="";

if(!results.length){

eventResults.innerHTML=`
<div class="result-card">
<div class="match-winner">
NO RESULTS AVAILABLE.
</div>
</div>`;

return;

}

results.forEach(result=>{

const card=document.createElement("div");

const source=
result.source||
event.source||
"eventData";

const brand=
result.brand||
event.brand||
"";

card.className=
`result-card source-${source.toLowerCase()} brand-${brand
.toLowerCase()
.replace(/\s+/g,"-")}`;

let html="";


/* =====================================
   POSITION
   ===================================== */

if(result.position){

html+=`
<div class="match-name">
${result.position}
</div>`;

}


/* =====================================
   CHAMPIONSHIP
   ===================================== */

if(result.championship){

html+=`
<div class="match-championship">
${formatChampionshipName(result.championship)}
${result.type&&result.type!=="SINGLES"&&result.type!=="TAG TEAM"
?`<small>${result.type} MATCH</small>`
:""}
</div>`;

}


/* =====================================
   MULTI PARTICIPANT
   ===================================== */

if([
"TRIPLE THREAT",
"FATAL 4-WAY",
"5-WAY",
"6-WAY",
"8-WAY",
"LADDER",
].includes(result.type)){

const participants=result.participants||[
result.wrestler1,
result.wrestler2,
result.wrestler3,
result.wrestler4,
result.wrestler5,
result.wrestler6,
result.wrestler7,
result.wrestler8
].filter(Boolean);

const scores=result.scores||[
result.score1,
result.score2,
result.score3,
result.score4,
result.score5,
result.score6,
result.score7,
result.score8
].filter(score=>score!==undefined);

html+=`
<div class="match-name">
${result.match||result.type}
</div>

<div class="match">

<div class="team">

${participants
.map((name,index)=>
createWrestlerWithScore(
name,
scores[index],
result.images?.[name]
))
.join("")}

</div>

<div class="vs">

<span>FINAL</span>

${createMultiScore(scores)}

</div>

</div>`;

}


/* =====================================
   TAG TEAM
   ===================================== */

else if(result.type==="TAG TEAM"){

html+=`
<div class="match-name">
TAG TEAM
</div>

<div class="match">

<div class="team">

${(result.team1||[])
.map(name=>createWrestler(
name,
result.images?.[name]
))
.join("")}

</div>

<div class="vs">

<span>VS</span>

${createScore(
result.score1,
result.score2
)}

</div>

<div class="team">

${(result.team2||[])
.map(name=>createWrestler(
name,
result.images?.[name]
))
.join("")}

</div>

</div>`;

}


/* =====================================
   MULTI TEAM
   ===================================== */

else if([
"3 VS 3",
"4 VS 4",
"5 VS 5",
"6 VS 6",
"7 VS 7",
"8 VS 8",
"WARGAMES",
"SURVIVOR SERIES"
].includes(result.type)){

html+=`
<div class="match-name">
${result.match||result.type}
</div>

<div class="match">

<div class="team">

${(result.team1||[])
.flat()
.map(name=>createWrestler(
name,
result.images?.[name]
))
.join("")}

</div>

<div class="vs">

<span>VS</span>

${
result.score1!==undefined
?createScore(
result.score1,
result.score2
)
:""
}

</div>

<div class="team">

${(result.team2||[])
.flat()
.map(name=>createWrestler(
name,
result.images?.[name]
))
.join("")}

</div>

</div>`;

}


/* =====================================
   ELIMINATION CHAMBER TAG TEAM
   ===================================== */

else if(
result.type==="ELIMINATION CHAMBER"&&
result.team1&&
result.team2&&
result.team3&&
result.team4&&
result.team5&&
result.team6
){

const teams=[
result.team1,
result.team2,
result.team3,
result.team4,
result.team5,
result.team6
];

html+=`
<div class="match-name">
${result.match||"ELIMINATION CHAMBER TAG TEAM"}
</div>

<div class="chamber-teams">

${teams.map((team,index)=>`

<div class="chamber-team">

<div class="chamber-team-number">
TEAM ${index+1}
</div>

${(team||[])
.flat()
.map(name=>createWrestler(
name,
result.images?.[name]
))
.join("")}

</div>

`).join("")}

</div>`;

}
   else if(result.type==="ELIMINATION CHAMBER"){

const participants=result.participants||[];

html+=`
<div class="match-name">
${result.match||"ELIMINATION CHAMBER"}
</div>

<div class="match">

<div class="team">

${participants
.map((name,index)=>
createWrestlerWithScore(
name,
result.scores?.[index],
result.images?.[name]
))
.join("")}

</div>

<div class="vs">

<span>FINAL</span>

${createMultiScore(result.scores||[])}

</div>

</div>`;

   }


/* =====================================
   LADDER TAG
   ===================================== */

else if(result.type==="LADDER TAG"){

html+=`
<div class="match-name">
LADDER TAG
</div>

<div class="match">

<div class="team">

${(result.team1||[])
.flat()
.map(name=>createWrestler(
name,
result.images?.[name]
))
.join("")}

</div>

<div class="vs">

<span>FINAL</span>

${
result.score!==undefined
?createSingleScore(result.score)
:""
}

</div>

<div class="team">

${(result.team2||[])
.flat()
.map(name=>createWrestler(
name,
result.images?.[name]
))
.join("")}

</div>

</div>`;

}


/* =====================================
   BATTLE ROYALE
   ===================================== */

else if(result.type==="BATTLE ROYALE"){

html+=`
<div class="match-name">
BATTLE ROYALE
</div>

<div class="match">

<div class="team">

${(result.participants||[])
.map(name=>createWrestler(
name,
result.images?.[name]
))
.join("")}

</div>

</div>`;

}


/* =====================================
   ROYAL RUMBLE
   ===================================== */

else if(result.type==="ROYAL RUMBLE"){

html+=`
<div class="match-name">
ROYAL RUMBLE
</div>

<div class="match">

<div class="team">

${(result.participants||[])
.map(name=>createWrestler(
name,
result.images?.[name]
))
.join("")}

</div>

</div>`;

}


/* =====================================
   NORMAL MATCH
   ===================================== */

else{

html+=`
<div class="match">

<div class="team">

${createWrestler(
result.wrestler1,
result.image1
)}

</div>

<div class="vs">

<span>VS</span>

${createScore(
result.score1,
result.score2
)}

</div>

<div class="team">

${createWrestler(
result.wrestler2,
result.image2
)}

</div>

</div>`;

}


/* =====================================
   WINNER
   ===================================== */

if(result.winner){

html+=`
<div class="match-winner">
WINNER:
<strong>${result.winner}</strong>
</div>`;

}


/* =====================================
   WINNER - MULTI
   ===================================== */

else if(
Array.isArray(result.participants)&&
Array.isArray(result.scores)&&
result.participants.length===
result.scores.length
){

const scores=result.scores.map(Number);
const highest=Math.max(...scores);
const winnerIndexes=[];

scores.forEach((score,index)=>{

if(score===highest){
winnerIndexes.push(index);
}

});

if(winnerIndexes.length===1){

const winner=
result.participants[
winnerIndexes[0]
];

html+=`
<div class="match-winner">
WINNER:
<strong>${winner}</strong>
</div>`;

}else{

html+=`
<div class="match-winner">
WINNER:
<strong>DRAW</strong>
</div>`;

}

}


/* =====================================
   WINNER - NORMAL
   ===================================== */

else{

const s1=Number(result.score1);
const s2=Number(result.score2);

if(!isNaN(s1)&&!isNaN(s2)){

let winner="DRAW";

if(s1>s2){

winner=
result.type==="TAG TEAM"||
(result.team1&&result.team2)
?(result.team1||[]).join(" + ")
:result.wrestler1;

}

if(s2>s1){

winner=
result.type==="TAG TEAM"||
(result.team1&&result.team2)
?(result.team2||[]).join(" + ")
:result.wrestler2;

}

html+=`
<div class="match-winner">
WINNER:
<strong>${winner}</strong>
</div>`;

}

}

card.innerHTML=html;

eventResults.appendChild(card);

});

}


/* =========================================
   CHAMPIONSHIP NAME
   ========================================= */

function formatChampionshipName(name){

const championships={

"wwe-championship":
"WWE Championship",

"world-heavyweight-championship":
"World Heavyweight Championship",

"wwe-undisputed-championship":
"WWE Undisputed Championship",

"undisputed-wwe-championship":
"Undisputed WWE Championship",

"universal-championship":
"Universal Championship",

"wwe-universal-championship":
"WWE Universal Championship",

"intercontinental-championship":
"Intercontinental Championship",

"united-states-championship":
"United States Championship",

"wwe-womens-championship":
"WWE Women's Championship",

"womens-world-championship":
"Women's World Championship",

"womens-united-states-championship":
"Women's United States Championship",

"womens-intercontinental-championship":
"Women's Intercontinental Championship",

"world-tag-team-championship":
"World Tag Team Championship",

"wwe-tag-team-championship":
"WWE Tag Team Championship",

"world-womens-tag-team-championship":
"World Women's Tag Team Championship",

"wwe-womens-tag-team-championship":
"WWE Women's Tag Team Championship"

};

if(championships[name]){
return championships[name];
}

return String(name)
.replace(/-/g," ")
.replace(/\b\w/g,char=>char.toUpperCase());

}


/* =========================================
   WRESTLER HELPERS
   ========================================= */

function normalizeName(name){

return String(name||"")
.toLowerCase()
.trim();

}


function getWrestler(name){

if(typeof wrestlers==="undefined"){
return null;
}

return wrestlers.find(w=>
normalizeName(w.name)===
normalizeName(name)
)||null;

}


function getEventWrestlerImage(
name,
customImage
){

if(customImage)return customImage;

const wrestler=getWrestler(name);

if(wrestler?.image){
return wrestler.image;
}

return"images/Vacante.jpg";

}


/* =========================================
   CREATE WRESTLER
   ========================================= */

function createWrestler(
name,
customImage
){

if(!name)return"";

const wrestler=getWrestler(name);

const id=
wrestler?.id||
name
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-")
.replace(/^-|-$/g,"");

const image=
getEventWrestlerImage(
name,
customImage
);

return`
<a
href="superstar.html?id=${encodeURIComponent(id)}"
class="wrestler-link"
>

<div
class="wrestler"
tabindex="0"
>

<img
src="${image}"
alt="${name}"
loading="lazy"
>

<span>
${name}
</span>

</div>

</a>`;

}


function createWrestlerWithScore(
name,
score,
customImage
){

if(!name)return"";

const wrestler=getWrestler(name);

const id=
wrestler?.id||
name
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-")
.replace(/^-|-$/g,"");

const image=
getEventWrestlerImage(
name,
customImage
);

return`
<a
href="superstar.html?id=${encodeURIComponent(id)}"
class="wrestler-link"
>

<div
class="wrestler"
tabindex="0"
>

<img
src="${image}"
alt="${name}"
loading="lazy"
>

<span>
${name}
</span>

${
score!==undefined
?`<small class="wrestler-score">${score}</small>`
:""
}

</div>

</a>`;

}


/* =========================================
   SCORE HELPERS
   ========================================= */

function createScore(score1,score2){

return`
<div class="match-score">
<span>${score1??""}</span>
<span>-</span>
<span>${score2??""}</span>
</div>`;

}


function createSingleScore(score){

if(
score===undefined||
score===null||
score===""
)return"";

return`
<div class="match-score">
<span>${score}</span>
</div>`;

}


function createMultiScore(scores){

if(!Array.isArray(scores)||!scores.length){
return"";
}

return`
<div class="match-score multi-score">
${scores.map(score=>`<span>${score}</span>`).join("")}
</div>`;

}















/* =========================================
   EVENT CHRONOLOGY
   ========================================= */

function getAllChronologyEvents(){

const events=[];

/* =====================================
   EVENT DATA
   PLE / SPECIAL EVENTS
   ===================================== */

if(typeof eventData!=="undefined"){

for(const id in eventData){

const data=eventData[id];

if(!data)continue;

events.push({
id:id,
title:data.title||id,
date:data.date||"",
type:"PLE",
source:"eventData",
category:"PLE",
image:data.image||"",
includeGeneral:true
});

}
}
   /* =====================================
   TOURNAMENT DATA
   RAW / SMACKDOWN / NXT
   ===================================== */

if(typeof tournamentData!=="undefined"){

const addedShows=new Set();

for(const tournamentId in tournamentData){

const data=tournamentData[tournamentId];

if(!data)continue;

const collections=[
data.shows,
data.weekly,
data.matches
];

for(const collection of collections){

if(!collection||Array.isArray(collection))continue;

for(const showId in collection){

/* ONLY INDIVIDUAL SHOWS */

if(!/^(raw|smackdown|nxt)-\d+$/i.test(showId))continue;

if(addedShows.has(showId))continue;

const show=collection[showId];

if(!show)continue;

const brand=getShowBrand(showId);
const number=showId.split("-").pop();

events.push({
id:showId,
title:show.title||brand+" #"+number,
date:show.date||"",
type:brand==="NXT"?"NXT":"WEEKLY",
source:"tournamentData",
category:brand==="NXT"?"NXT":"WEEKLY",
image:show.image||"",
includeGeneral:true
});

addedShows.add(showId);

}
}
}
}
/* =====================================
   COMBINED WEEKLY EVENTS
   weekly-1 = RAW + SMACKDOWN
   ===================================== */

const rawShows=events.filter(
x=>/^raw-\d+$/i.test(x.id)
);

const smackdownShows=events.filter(
x=>/^smackdown-\d+$/i.test(x.id)
);

const weeklyNumbers=new Set();

rawShows.forEach(x=>{
weeklyNumbers.add(x.id.split("-").pop());
});

smackdownShows.forEach(x=>{
weeklyNumbers.add(x.id.split("-").pop());
});

weeklyNumbers.forEach(number=>{

const raw=rawShows.find(
x=>x.id==="raw-"+number
);

const smackdown=smackdownShows.find(
x=>x.id==="smackdown-"+number
);

events.push({
id:"weekly-"+number,
title:"WEEKLY #"+number,
date:raw?.date||smackdown?.date||"",
type:"WEEKLY",
source:"tournamentData",
category:"WEEKLY",
image:raw?.image||smackdown?.image||"",
includeGeneral:false,
combinedWeekly:true
});

});
   /* =====================================
   OUTSIDER DATA
   SPEED / AEW / TNA / AAA / CMLL
   ===================================== */

if(typeof outsiderData!=="undefined"){

const addedShows=new Set();

for(const tournamentId in outsiderData){

const data=outsiderData[tournamentId];

if(!data||!data.shows)continue;

const brand=data.brand||"";

for(const showId in data.shows){

if(addedShows.has(showId))continue;

const show=data.shows[showId];

if(!show)continue;

events.push({
id:showId,
title:show.title||brand+" #"+showId.split("-").pop(),
date:show.date||"",
type:brand,
source:"outsiderData",
category:brand,
image:show.image||"",
includeGeneral:true
});

addedShows.add(showId);

}
}
}
/* =====================================
   SORT CHRONOLOGY
   ===================================== */

events.sort((a,b)=>{

const dateA=parseDate(a.date);
const dateB=parseDate(b.date);

if(dateA!==dateB)return dateA-dateB;

return String(a.id).localeCompare(
String(b.id),
undefined,
{numeric:true}
);

});

return events;

}

/* =========================================
   CHRONOLOGY SAGA
   ========================================= */

function getChronologySaga(e){

if(!e)return null;

const t=((e.title||"")+" "+(e.id||"")).toLowerCase();

if(t.includes("takeover"))return"TAKEOVER";
if(t.includes("wrestlemania"))return"WRESTLEMANIA";
if(t.includes("summerslam")||t.includes("summer slam"))return"SUMMERSLAM";
if(t.includes("money in the bank")||t.includes("money-in-the-bank"))return"MONEY IN THE BANK";
if(t.includes("night of champions"))return"NIGHT OF CHAMPIONS";
if(t.includes("royal rumble"))return"ROYAL RUMBLE";
if(t.includes("survivor series"))return"SURVIVOR SERIES";
if(t.includes("backlash"))return"BACKLASH";
if(t.includes("extreme rules"))return"EXTREME RULES";
if(t.includes("hell in a cell"))return"HELL IN A CELL";
if(t.includes("elimination chamber"))return"ELIMINATION CHAMBER";
if(t.includes("tlc"))return"TLC";
if(t.includes("clash of champions"))return"CLASH OF CHAMPIONS";
if(t.includes("king of the ring"))return"KING OF THE RING";
if(t.includes("crown jewel"))return"CROWN JEWEL";
if(t.includes("fastlane"))return"FASTLANE";
if(t.includes("payback"))return"PAYBACK";

return null;
}
/* =========================================
   RENDER CHRONOLOGY
   ========================================= */

function renderChronology(e){

if(!eventChronology)return;

eventChronology.innerHTML="";

const a=getAllChronologyEvents();

const s=getChronologySaga(e);


/* =========================================
   GENERAL CHRONOLOGY
   ========================================= */

const g=a
.filter(x=>x.includeGeneral!==false)
.sort((x,y)=>parseDate(x.date)-parseDate(y.date));

let i=g.findIndex(x=>x.id===e.id);

if(i<0){

const d=parseDate(e.date);

i=g.findIndex(
x=>parseDate(x.date)>=d
);

}

if(i>=0){

eventChronology.innerHTML+=
createChronologyRow(
"GENERAL CHRONOLOGY",
g[i-1]||null,
e,
g[i+1]||null
);

}


/* =========================================
   SAGA CHRONOLOGY
   ========================================= */

if(s){

const l=a
.filter(x=>getChronologySaga(x)===s)
.sort(
(x,y)=>parseDate(x.date)-parseDate(y.date)
);

const n=l.findIndex(
x=>x.id===e.id
);

if(n>=0){

eventChronology.innerHTML+=
createChronologyRow(
s+" CHRONOLOGY",
l[n-1]||null,
e,
l[n+1]||null
);

}

}


/* =========================================
   PLE CHRONOLOGY
   ========================================= */

if(e.source==="eventData"){

const l=a
.filter(x=>x.category==="PLE")
.sort(
(x,y)=>parseDate(x.date)-parseDate(y.date)
);

const n=l.findIndex(
x=>x.id===e.id
);

if(n>=0){

eventChronology.innerHTML+=
createChronologyRow(
"PLE CHRONOLOGY",
l[n-1]||null,
e,
l[n+1]||null
);

}

}


/* =========================================
   WEEKLY CHRONOLOGY
   ========================================= */

if(
e.category==="WEEKLY"||
/^(raw|smackdown)-\d+$/i.test(e.id)
){

const l=a.filter(
x=>x.combinedWeekly
);

const id=
/^(raw|smackdown)-\d+$/i.test(e.id)
?
"weekly-"+e.id.split("-").pop()
:
e.id;

const n=l.findIndex(
x=>x.id===id
);

if(n>=0){

eventChronology.innerHTML+=
createChronologyRow(
"WEEKLY CHRONOLOGY",
l[n-1]||null,
l[n],
l[n+1]||null
);

}

}


/* =========================================
   NXT CHRONOLOGY
   ========================================= */

if(
e.category==="NXT"||
s==="TAKEOVER"
){

const l=a
.filter(x=>
x.category==="NXT"||
getChronologySaga(x)==="TAKEOVER"
)
.sort(
(x,y)=>parseDate(x.date)-parseDate(y.date)
);

const n=l.findIndex(
x=>x.id===e.id
);

if(n>=0){

eventChronology.innerHTML+=
createChronologyRow(
"NXT CHRONOLOGY",
l[n-1]||null,
e,
l[n+1]||null
);

}

}


/* =========================================
   OUTSIDER CHRONOLOGY
   ========================================= */

if(e.source==="outsiderData"){

const l=a
.filter(x=>
x.source==="outsiderData"&&
x.category===e.category
)
.sort(
(x,y)=>parseDate(x.date)-parseDate(y.date)
);

const n=l.findIndex(
x=>x.id===e.id
);

if(n>=0){

eventChronology.innerHTML+=
createChronologyRow(
e.category+" CHRONOLOGY",
l[n-1]||null,
e,
l[n+1]||null
);

}

}

}
/* =========================================
   CHRONOLOGY LINK
   ========================================= */

function chronologyLink(eventData,arrow){

if(!eventData){
return`
<div class="chronology-empty"></div>
`;
}

return`
<a
href="event.html?id=${encodeURIComponent(eventData.id)}"
class="chronology-link"
>
<span class="chronology-arrow">
${arrow}
</span>

<div class="chronology-card">

${
eventData.image
?
`<img
src="${eventData.image}"
alt="${eventData.title}"
class="chronology-image"
>`
:""
}

<span class="chronology-title">
${eventData.title}
</span>

</div>

</a>`;
}


/* =========================================
   CHRONOLOGY ROW
   ========================================= */

function createChronologyRow(
title,
previous,
current,
next
){

return`
<div class="chronology-block">

<h3>
${title}
</h3>

<div class="chronology-row">

${chronologyLink(previous,"←")}

<div class="chronology-current">

${
current&&current.image
?
`<img
src="${current.image}"
alt="${current.title}"
class="chronology-image chronology-current-image"
>`
:""
}

<span>
${current?.title||""}
</span>

</div>

${chronologyLink(next,"→")}

</div>

</div>`;
}



