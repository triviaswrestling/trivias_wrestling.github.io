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


function slug(name){
return String(name)
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-")
.replace(/^-|-$/g,"");
}


function findWrestler(){

if(typeof wrestlers==="undefined")return null;

return wrestlers.find(w=>slug(w.name)===wrestlerId);

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

if(result.wrestler1)list.push(result.wrestler1);
if(result.wrestler2)list.push(result.wrestler2);

if(Array.isArray(result.team1)){
list.push(...result.team1.flat());
}

if(Array.isArray(result.team2)){
list.push(...result.team2.flat());
}

if(Array.isArray(result.participants)){
list.push(...result.participants);
}

return[...new Set(list.filter(Boolean))];

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

if(!people.some(isThisWrestler))return null;


/* =====================================
   EXPLICIT WINNER
   ===================================== */

if(result.winner){

return isThisWrestler(result.winner)
?"WIN"
:"LOSS";

}


/* =====================================
   MULTI PARTICIPANT WITH SCORES
   ===================================== */

if(
Array.isArray(result.participants)&&
Array.isArray(result.scores)&&
result.participants.length===result.scores.length
){

const scores=result.scores.map(Number);

if(scores.some(isNaN))return null;

const highest=Math.max(...scores);

const winnerIndexes=[];

scores.forEach((score,index)=>{

if(score===highest){
winnerIndexes.push(index);
}

});


/* DRAW IF MORE THAN ONE HAS THE HIGHEST SCORE */

if(winnerIndexes.length!==1){

const thisIndex=result.participants
.findIndex(isThisWrestler);

if(winnerIndexes.includes(thisIndex)){
return"WIN";
}

return"DRAW";

}


/* SINGLE WINNER */

const winnerIndex=winnerIndexes[0];

return isThisWrestler(result.participants[winnerIndex])
?"WIN"
:"LOSS";

}


/* =====================================
   NORMAL TWO-PERSON MATCH
   ===================================== */

if(result.score1===undefined||result.score2===undefined){
return null;
}

const a=Number(result.score1);
const b=Number(result.score2);

if(isNaN(a)||isNaN(b))return null;


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

const type=(result.type||"").toUpperCase();


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

if(!result.tournament)return null;

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

const tournament=tournamentId(event,result);

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
   RENDER RECORDS
   ========================================= */

function renderRecords(){

let wins=0;
let losses=0;
let draws=0;

let singles={w:0,l:0,d:0};
let tag={w:0,l:0,d:0};
let six={w:0,l:0,d:0};

let history=[];


Object.entries(eventData||{}).forEach(([eventId,event])=>{

(event.results||[]).forEach((result,index)=>{

if(!participants(result).some(isThisWrestler)){
return;
}


const resultOutcome=outcome(result);

if(!resultOutcome){
return;
}


/* =====================================
   OVERALL
   ===================================== */

if(resultOutcome==="WIN"){
wins++;
}

if(resultOutcome==="LOSS"){
losses++;
}

if(resultOutcome==="DRAW"){
draws++;
}


/* =====================================
   CATEGORY RECORD
   ===================================== */

const cat=category(result);

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


/* =====================================
   HISTORY
   ===================================== */

history.push({

eventId,
event,
result,
index,
outcome:resultOutcome,
rivals:rivals(result),

link:matchLink(
{id:eventId,...event},
result,
index
)

});

});

});


/* =====================================
   DISPLAY OVERALL
   ===================================== */

winsEl.textContent=wins;
lossesEl.textContent=losses;
drawsEl.textContent=draws;


/* =====================================
   DISPLAY CATEGORY RECORDS
   ===================================== */

singlesEl.textContent=
`${singles.w} - ${singles.d} - ${singles.l}`;

tagEl.textContent=
`${tag.w} - ${tag.d} - ${tag.l}`;

sixManEl.textContent=
`${six.w} - ${six.d} - ${six.l}`;


/* =====================================
   SORT HISTORY
   ===================================== */

history.sort((a,b)=>{

const parse=d=>{

const[day,month,year]=String(d||"").split("/");

return new Date(
year,
month-1,
day
).getTime()||0;

};

return parse(b.event.date)-parse(a.event.date);

});


renderHistory(history);

}


/* =========================================
   RENDER HISTORY
   ========================================= */

function renderHistory(history){

historyEl.innerHTML="";


if(!history.length){

historyEl.innerHTML="<p>NO MATCHES FOUND.</p>";

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
${item.event.type==="PLE"
?"SPECIAL EVENT"
:item.event.type||"EVENT"}
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
