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


/* =========================================
   GET TOURNAMENT EVENT
   ========================================= */

function getTournamentEvent(id){

if(typeof tournamentData==="undefined")return null;


/* =====================================
   WEEKLY
   RAW + SMACKDOWN
   weekly-1 ... weekly-1000
   ===================================== */

const weeklyMatch=id.match(/^weekly-(\d+)$/);

if(weeklyMatch){

const number=Number(weeklyMatch[1]);

if(number<1||number>1000)return null;

const rawId="raw-"+number;
const smackdownId="smackdown-"+number;

const results=[];
const dates=[];

for(const tournamentId in tournamentData){

const data=tournamentData[tournamentId];

if(!data)continue;


/* OLD MATCHES */

if(data.matches&&!Array.isArray(data.matches)){

for(const eventKey of [rawId,smackdownId]){

const event=data.matches[eventKey];

if(!event)continue;

if(event.date)dates.push(event.date);

if(event.results){
results.push(
...convertTournamentResults(event.results)
);
}

}

}


/* OLD WEEKLY */

if(data.weekly){

for(const eventKey of [rawId,smackdownId]){

const event=data.weekly[eventKey];

if(!event)continue;

if(event.date)dates.push(event.date);

if(event.results){
results.push(
...convertTournamentResults(event.results)
);
}

}

}


/* NEW TOURNAMENT SHOWS */

if(data.shows){

for(const eventKey of [rawId,smackdownId]){

const event=data.shows[eventKey];

if(!event)continue;

if(event.date)dates.push(event.date);

if(event.matches){
results.push(
...convertTournamentResults(event.matches)
);
}

}

}

}

if(!results.length)return null;

let date="";

if(dates.length){

const sortedDates=dates
.map(date=>({
original:date,
value:parseDate(date)
}))
.sort((a,b)=>a.value-b.value);

date=sortedDates[0].original;

}

return{
id:id,
title:"WEEKLY #"+number,
date:date,
brand:"",
type:"WEEKLY",
results:results
};

}


/* =====================================
   NXT
   nxt-1 ... nxt-1000
   ===================================== */

const nxtMatch=id.match(/^nxt-(\d+)$/);

if(nxtMatch){

const number=Number(nxtMatch[1]);

if(number<1||number>1000)return null;

const nxtId="nxt-"+number;

for(const tournamentId in tournamentData){

const data=tournamentData[tournamentId];

if(!data)continue;


/* NEW TOURNAMENT SHOWS */

if(data.shows&&data.shows[nxtId]){

const event=data.shows[nxtId];

return{
id:id,
title:"NXT #"+number,
date:event.date||"",
brand:"NXT",
type:"NXT",
results:convertTournamentResults(
event.matches||[]
)
};

}


/* OLD WEEKLY */

if(data.weekly&&data.weekly[nxtId]){

const event=data.weekly[nxtId];

return{
id:id,
title:"NXT #"+number,
date:event.date||"",
brand:"NXT",
type:"NXT",
results:convertTournamentResults(
event.results||[]
)
};

}


/* OLD MATCHES */

if(
data.matches&&
!Array.isArray(data.matches)&&
data.matches[nxtId]
){

const event=data.matches[nxtId];

return{
id:id,
title:"NXT #"+number,
date:event.date||"",
brand:"NXT",
type:"NXT",
results:convertTournamentResults(
event.results||[]
)
};

}

}

return null;

}

return null;

}


/* =========================================
   TOURNAMENT RESULT ADAPTER
   ========================================= */

function convertTournamentResults(results){

if(!Array.isArray(results))return[];

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
winner:winner
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

if(
typeof eventData!=="undefined" &&
eventData[eventId]
){

event=eventData[eventId];

}else{

event=getTournamentEvent(eventId);

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

const brand=
result.brand||
event.brand||
"PLE";

card.className=
`result-card brand-${brand
.toLowerCase()
.replace(/\s+/g,"-")}`;

let html="";


/* POSITION */

if(result.position){

html+=`
<div class="match-name">
${result.position}
</div>`;

}


/* CHAMPIONSHIP */

if(result.championship){

html+=`
<div class="match-championship">
${result.championship}
</div>`;

}


/* MULTI PARTICIPANT */

if([
"TRIPLE THREAT",
"FATAL 4-WAY",
"5-WAY",
"6-WAY",
"8-WAY",
"LADDER",
"ELIMINATION CHAMBER"
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
.map((name,index)=>createWrestlerWithScore(
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


/* TAG TEAM */

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


/* MULTI TEAM */

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


/* ELIMINATION CHAMBER TAG TEAM */

else if(
result.type==="ELIMINATION CHAMBER TAG TEAM"
){

html+=`
<div class="match-name">
ELIMINATION CHAMBER TAG TEAM
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


/* LADDER TAG */

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


/* BATTLE ROYALE */

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


/* ROYAL RUMBLE */

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


/* NORMAL MATCH */

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


/* WINNER */

if(result.winner){

html+=`
<div class="match-winner">
WINNER:
<strong>${result.winner}</strong>
</div>`;

}


/* WINNER - MULTI */

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


/* WINNER - NORMAL */

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


function createScore(score1,score2){

return`
<div class="match-score">
<span>${score1??""}</span>
<span>-</span>
<span>${score2??""}</span>
</div>`;

}


function createSingleScore(score){

if(score===undefined||
score===null||
score==="")return"";

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
