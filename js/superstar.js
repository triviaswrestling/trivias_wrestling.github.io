/* =========================================
   MI WRESTLING
   SUPERSTAR PAGE
   ========================================= */

const params=new URLSearchParams(location.search);
const wrestlerId=params.get("id");

const nameEl=document.getElementById("superstar-name");
const nicknameEl=document.getElementById("superstar-nickname");
const brandEl=document.getElementById("superstar-brand");
const imageEl=document.getElementById("superstar-image");
const winsEl=document.getElementById("wins");
const lossesEl=document.getElementById("losses");
const drawsEl=document.getElementById("draws");
const singlesEl=document.getElementById("singles-record");
const tagEl=document.getElementById("tag-record");
const sixManEl=document.getElementById("six-man-record");
const historyEl=document.getElementById("match-history");


/* =========================================
   SLUG
   ========================================= */

function slug(name){

return String(name)
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-")
.replace(/^-|-$/g,"");

}


/* =========================================
   FIND WRESTLER
   ========================================= */

function findWrestler(){

if(typeof wrestlers==="undefined"){
return null;
}

return wrestlers.find(
w=>slug(w.name)===wrestlerId
);

}

const wrestler=findWrestler();

if(!wrestler){

nameEl.textContent="SUPERSTAR NOT FOUND";

}else{

nameEl.textContent=wrestler.name||"";
nicknameEl.textContent=wrestler.nickname||"";
brandEl.textContent=wrestler.brand||"";
imageEl.src=wrestler.image||"images/Vacante.jpg";
imageEl.alt=wrestler.name||"";

renderRecords();

}


/* =========================================
   PARTICIPANTS
   ========================================= */

function participants(result){

let list=[];

if(result.wrestler1){
list.push(result.wrestler1);
}

if(result.wrestler2){
list.push(result.wrestler2);
}

if(Array.isArray(result.team1)){
list.push(...result.team1.flat());
}

if(Array.isArray(result.team2)){
list.push(...result.team2.flat());
}

if(Array.isArray(result.participants)){
list.push(...result.participants);
}

return[
...new Set(list.filter(Boolean))
];

}


/* =========================================
   THIS WRESTLER?
   ========================================= */

function isThisWrestler(name){

return name&&slug(name)===wrestlerId;

}


/* =========================================
   RIVALS
   ========================================= */

function rivals(result){

return participants(result)
.filter(n=>!isThisWrestler(n));

}


/* =========================================
   OUTCOME
   ========================================= */

function outcome(result){

const people=participants(result);

if(!people.some(isThisWrestler)){
return null;
}


/* EXPLICIT WINNER */

if(result.winner){

return isThisWrestler(result.winner)
?"WIN"
:"LOSS";

}


/* MULTI PARTICIPANT */

if(
Array.isArray(result.participants)&&
Array.isArray(result.scores)&&
result.participants.length===
result.scores.length
){

const scores=result.scores.map(Number);

if(scores.some(isNaN)){
return null;
}

const highest=Math.max(...scores);

const winnerIndexes=[];

scores.forEach((score,index)=>{

if(score===highest){
winnerIndexes.push(index);
}

});

if(winnerIndexes.length!==1){

const thisIndex=
result.participants.findIndex(
isThisWrestler
);

if(winnerIndexes.includes(thisIndex)){
return"WIN";
}

return"DRAW";

}

return isThisWrestler(
result.participants[winnerIndexes[0]]
)
?"WIN"
:"LOSS";

}


/* NORMAL MATCH */

if(
result.score1===undefined||
result.score2===undefined
){

return null;

}

const a=Number(result.score1);
const b=Number(result.score2);

if(isNaN(a)||isNaN(b)){
return null;
}


if(
result.wrestler1&&
isThisWrestler(result.wrestler1)
){

if(a>b)return"WIN";
if(a<b)return"LOSS";

return"DRAW";

}


if(
result.wrestler2&&
isThisWrestler(result.wrestler2)
){

if(b>a)return"WIN";
if(b<a)return"LOSS";

return"DRAW";

}


if(
Array.isArray(result.team1)&&
result.team1.flat().some(isThisWrestler)
){

if(a>b)return"WIN";
if(a<b)return"LOSS";

return"DRAW";

}


if(
Array.isArray(result.team2)&&
result.team2.flat().some(isThisWrestler)
){

if(b>a)return"WIN";
if(b<a)return"LOSS";

return"DRAW";

}

return null;

}


/* =========================================
   CATEGORY
   ========================================= */

function category(result){

const type=
(result.type||"").toUpperCase();

if(
type==="TAG TEAM"||
type==="LADDER TAG"||
type==="ELIMINATION CHAMBER TAG TEAM"||
type==="TRIPLE THREAT TAG"||
type==="4-WAY TAG"
){

return"TAG";

}

if(
type==="6 VS 6"||
type==="6-MAN TAG TEAM"||
type==="WARGAMES"
){

return"SIX";

}

return"SINGLES";

}


/* =========================================
   TOURNAMENT ID
   ========================================= */

function tournamentId(event,result){

if(!result.tournament){
return null;
}

const n=
(String(result.tournament).match(/\d+/)||["1"])[0];

const brand=
(result.brand||event.brand||"").toUpperCase();

if(brand==="RAW"){
return`raw-${n}`;
}

if(brand==="SMACKDOWN"){
return`smackdown-${n}`;
}

if(brand==="NXT"){
return`nxt-${n}`;
}

return null;

}


/* =========================================
   MATCH LINK
   ========================================= */

function matchLink(event,result,index){

const tournament=
tournamentId(event,result);

if(tournament){

return`torneoroad.html?id=${encodeURIComponent(tournament)}`;

}

return`event.html?id=${encodeURIComponent(event.id)}&match=${index}`;

}


/* =========================================
   MATCH LABEL
   ========================================= */

function matchLabel(result){

return result.match||result.type||"SINGLES";

}


/* =========================================
   DATE
   ========================================= */

function parseDate(date){

if(!date){
return 0;
}

const[
day,
month,
year
]=String(date).split("/");

return new Date(
Number(year),
Number(month)-1,
Number(day)
).getTime()||0;

}


/* =========================================
   TOURNAMENT RESULT ADAPTER
   ========================================= */

function adaptTournamentResult(result){

if(!result){
return null;
}


/* NEW SHOW FORMAT */

if(Array.isArray(result)){

const wrestler1=result[0]||"";
const wrestler2=result[1]||"";
const score1=result[2]??"";
const score2=result[3]??"";

let winner=null;

const s1=Number(score1);
const s2=Number(score2);

if(!isNaN(s1)&&!isNaN(s2)){

if(s1>s2){
winner=wrestler1;
}

else if(s2>s1){
winner=wrestler2;
}

}

return{

type:"SINGLES",

wrestler1:wrestler1,
wrestler2:wrestler2,
score1:score1,
score2:score2,
winner:winner

};

}


/* OLD OBJECT FORMAT */

const wrestler1=
result.wrestler1||
result.a||
result.player1||
result.p1||
"";

const wrestler2=
result.wrestler2||
result.b||
result.player2||
result.p2||
"";

const score1=
result.score1!==undefined
?result.score1
:result.scoreA!==undefined
?result.scoreA
:"";

const score2=
result.score2!==undefined
?result.score2
:result.scoreB!==undefined
?result.scoreB
:"";

let winner=result.winner||null;

if(!winner){

const s1=Number(score1);
const s2=Number(score2);

if(!isNaN(s1)&&!isNaN(s2)){

if(s1>s2){
winner=wrestler1;
}

else if(s2>s1){
winner=wrestler2;
}

}

}

return{

type:"SINGLES",

wrestler1:wrestler1,
wrestler2:wrestler2,
score1:score1,
score2:score2,
winner:winner

};

}


/* =========================================
   GET TOURNAMENT EVENTS
   ========================================= */

function getTournamentEvents(){

const list=[];

if(typeof tournamentData==="undefined"){
return list;
}

const added=new Set();

Object.entries(tournamentData)
.forEach(([tournamentKey,data])=>{

if(!data){
return;
}


/* =====================================
   ADD EVENT
   ===================================== */

function addEvent(id,event,results){

if(!event){
return;
}

if(
!/^raw-\d+$/.test(id)&&
!/^smackdown-\d+$/.test(id)&&
!/^nxt-\d+$/.test(id)
){

return;
}

const uniqueKey=
`${id}-${tournamentKey}`;

if(added.has(uniqueKey)){
return;
}

added.add(uniqueKey);

list.push({

id:id,

title:
id.startsWith("nxt-")
?"NXT #"+id.split("-")[1]
:id.startsWith("raw-")
?"RAW #"+id.split("-")[1]
:"SMACKDOWN #"+id.split("-")[1],

date:event.date||"",

brand:
id.startsWith("nxt-")
?"NXT"
:id.startsWith("raw-")
?"RAW"
:"SMACKDOWN",

type:
id.startsWith("nxt-")
?"NXT"
:"WEEKLY",

results:(results||[])
.map(adaptTournamentResult)
.filter(Boolean),

tournamentSource:true,

tournamentKey:tournamentKey

});

}


/* =====================================
   OLD WEEKLY
   ===================================== */

if(data.weekly){

Object.entries(data.weekly)
.forEach(([id,event])=>{

addEvent(
id,
event,
event.results||[]
);

});

}


/* =====================================
   OLD MATCHES
   ===================================== */

if(
data.matches&&
!Array.isArray(data.matches)
){

Object.entries(data.matches)
.forEach(([id,event])=>{

addEvent(
id,
event,
event.results||[]
);

});

}


/* =====================================
   NEW SHOWS
   ===================================== */

if(data.shows){

Object.entries(data.shows)
.forEach(([id,event])=>{

addEvent(
id,
event,
event.matches||[]
);

});

}

});

return list;

}


/* =========================================
   RENDER RECORDS
   ========================================= */

function renderRecords(){

let wins=0;
let losses=0;
let draws=0;

let singles={
w:0,
l:0,
d:0
};

let tag={
w:0,
l:0,
d:0
};

let six={
w:0,
l:0,
d:0
};

let history=[];


/* =========================================
   EVENTDATA
   ========================================= */

if(typeof eventData!=="undefined"){

Object.entries(eventData)
.forEach(([eventId,event])=>{

(event.results||[])
.forEach((result,index)=>{

processResult(
eventId,
event,
result,
index
);

});

});

}


/* =========================================
   TOURNAMENTDATA
   ========================================= */

const tournamentEvents=
getTournamentEvents();

tournamentEvents.forEach(event=>{

(event.results||[])
.forEach((result,index)=>{

processResult(
event.id,
event,
result,
index
);

});

});


/* =========================================
   PROCESS RESULT
   ========================================= */

function processResult(
eventId,
event,
result,
index
){

if(
!participants(result)
.some(isThisWrestler)
){

return;

}

const resultOutcome=
outcome(result);

if(!resultOutcome){
return;
}


/* OVERALL */

if(resultOutcome==="WIN"){
wins++;
}

if(resultOutcome==="LOSS"){
losses++;
}

if(resultOutcome==="DRAW"){
draws++;
}


/* CATEGORY */

const cat=
category(result);

const target=
cat==="TAG"
?tag
:cat==="SIX"
?six
:singles;

if(resultOutcome==="WIN"){
target.w++;
}

if(resultOutcome==="LOSS"){
target.l++;
}

if(resultOutcome==="DRAW"){
target.d++;
}


/* HISTORY */

history.push({

eventId:eventId,

event:event,

result:result,

index:index,

outcome:resultOutcome,

rivals:rivals(result),

link:matchLink(
{
id:eventId,
...event
},
result,
index
)

});

}

winsEl.textContent=wins;
lossesEl.textContent=losses;
drawsEl.textContent=draws;

singlesEl.textContent=
`${singles.w} - ${singles.d} - ${singles.l}`;

tagEl.textContent=
`${tag.w} - ${tag.d} - ${tag.l}`;

sixManEl.textContent=
`${six.w} - ${six.d} - ${six.l}`;


/* =========================================
   SORT HISTORY
   ========================================= */

history.sort((a,b)=>{

return parseDate(b.event.date)-
parseDate(a.event.date);

});

renderHistory(history);

}


/* =========================================
   RENDER HISTORY
   ========================================= */

function renderHistory(history){

historyEl.innerHTML="";

if(!history.length){

historyEl.innerHTML=
"<p>NO MATCHES FOUND.</p>";

return;

}

history.forEach(item=>{

const rivalText=
item.rivals.length
?item.rivals.join(" / ")
:"NO RIVAL";

const div=document.createElement("a");

div.className=
`history-item result-${item.outcome.toLowerCase()}`;

div.href=item.link;

div.innerHTML=`

<div class="history-top">

<div class="history-event">
${item.event.title||"EVENT"}
</div>

<div class="history-date">
${item.event.date||""}
</div>

</div>

<div class="history-type">

${
item.event.type==="PLE"
?"SPECIAL EVENT"
:item.event.type||"EVENT"
}

· ${matchLabel(item.result)}

</div>

<div class="history-rivals">

<span>RIVAL</span>

${rivalText}

</div>

<div class="history-result">
${item.outcome}
</div>

`;

historyEl.appendChild(div);

});

}
