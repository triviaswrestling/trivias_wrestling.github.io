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
return String(name).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
}

function findWrestler(){
if(typeof wrestlerData==="undefined")return null;
return Object.values(wrestlerData).find(w=>
w.id===wrestlerId||slug(w.name)===wrestlerId
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

function participants(result){
let list=[];
if(result.wrestler1)list.push(result.wrestler1);
if(result.wrestler2)list.push(result.wrestler2);
if(Array.isArray(result.team1))list.push(...result.team1.flat());
if(Array.isArray(result.team2))list.push(...result.team2.flat());
if(Array.isArray(result.participants))list.push(...result.participants);
return [...new Set(list.filter(Boolean))];
}

function rivals(result){
return participants(result).filter(n=>slug(n)!==wrestlerId&&n!==wrestler?.name);
}

function outcome(result){
if(result.winner){
return result.winner===wrestler?.name||slug(result.winner)===wrestlerId?"WIN":"LOSS";
}

const p=participants(result);
if(!p.includes(wrestler?.name))return null;

if(result.score1!==undefined&&result.score2!==undefined){
let a=Number(result.score1),b=Number(result.score2);

if(result.wrestler1===wrestler.name){
if(a>b)return"WIN";
if(a<b)return"LOSS";
return"DRAW";
}

if(result.wrestler2===wrestler.name){
if(b>a)return"WIN";
if(b<a)return"LOSS";
return"DRAW";
}

if(Array.isArray(result.team1)&&result.team1.flat().includes(wrestler.name)){
if(a>b)return"WIN";
if(a<b)return"LOSS";
return"DRAW";
}

if(Array.isArray(result.team2)&&result.team2.flat().includes(wrestler.name)){
if(b>a)return"WIN";
if(b<a)return"LOSS";
return"DRAW";
}
}

if(result.score!==undefined&&Array.isArray(result.participants)){
if(result.winner)return result.winner===wrestler.name?"WIN":"LOSS";
}

return null;
}

function category(result){
const type=(result.type||"").toUpperCase();

if(
type==="TAG TEAM"||
type==="LADDER TAG"||
type==="ELIMINATION CHAMBER TAG TEAM"||
type==="TRIPLE THREAT TAG"||
type==="4-WAY TAG"
)return"TAG";

if(
type==="6 VS 6"||
type==="6-MAN TAG TEAM"||
type==="WARGAMES"
)return"SIX";

return"SINGLES";
}

function tournamentId(event,result){
if(result.tournament){
const n=(result.tournament.match(/\d+/)||["1"])[0];
const brand=(result.brand||event.brand||"").toUpperCase();

if(brand==="RAW")return`raw-${n}`;
if(brand==="SMACKDOWN")return`smackdown-${n}`;
if(brand==="NXT")return`nxt-${n}`;
}

if(event.type==="NXT"){
const n=(result.tournament?.match(/\d+/)||["1"])[0];
return`nxt-${n}`;
}

return null;
}

function matchLink(event,result,index){
const tournament=tournamentId(event,result);

if(tournament)
return`torneoroad.html?id=${encodeURIComponent(tournament)}`;

return`event.html?id=${encodeURIComponent(event.id)}&match=${index}`;
}

function matchLabel(result){
if(result.match)return result.match;
return result.type||"SINGLES";
}

function renderRecords(){
let wins=0,losses=0,draws=0;
let singles={w:0,l:0,d:0};
let tag={w:0,l:0,d:0};
let six={w:0,l:0,d:0};
let history=[];

Object.entries(eventData||{}).forEach(([eventId,event])=>{
(event.results||[]).forEach((result,index)=>{
const people=participants(result);
if(!people.some(n=>n===wrestler.name||slug(n)===wrestlerId))return;

const resultOutcome=outcome(result);
if(!resultOutcome)return;

if(resultOutcome==="WIN")wins++;
if(resultOutcome==="LOSS")losses++;
if(resultOutcome==="DRAW")draws++;

const cat=category(result);
const target=cat==="TAG"?tag:cat==="SIX"?six:singles;

if(resultOutcome==="WIN")target.w++;
if(resultOutcome==="LOSS")target.l++;
if(resultOutcome==="DRAW")target.d++;

history.push({
eventId,
event,
result,
index,
outcome:resultOutcome,
rivals:rivals(result),
link:matchLink({id:eventId,...event},result,index)
});
});
});

winsEl.textContent=wins;
lossesEl.textContent=losses;
drawsEl.textContent=draws;

singlesEl.textContent=`${singles.w} - ${singles.l} - ${singles.d}`;
tagEl.textContent=`${tag.w} - ${tag.l} - ${tag.d}`;
sixManEl.textContent=`${six.w} - ${six.l} - ${six.d}`;

history.sort((a,b)=>{
const parse=d=>{
const [day,month,year]=String(d||"").split("/");
return new Date(year,month-1,day).getTime()||0;
};
return parse(b.event.date)-parse(a.event.date);
});

renderHistory(history);
}

function renderHistory(history){
historyEl.innerHTML="";

if(!history.length){
historyEl.innerHTML="<p>NO MATCHES FOUND.</p>";
return;
}

history.forEach(item=>{
const rivalText=item.rivals.length
?item.rivals.join(" / ")
:"NO RIVAL";

const div=document.createElement("div");
div.className="history-item";

div.innerHTML=`
<div class="history-event">${item.event.title||"EVENT"}</div>
<div class="history-date">${item.event.date||""}</div>
<div class="history-type">${item.event.type==="PLE"?"SPECIAL EVENT":item.event.type||"EVENT"} · ${matchLabel(item.result)}</div>
<div class="history-rivals"><strong>RIVAL:</strong> ${rivalText}</div>
<div class="history-result ${item.outcome.toLowerCase()}">${item.outcome}</div>
<a class="history-view" href="${item.link}">VIEW MATCH →</a>
`;

historyEl.appendChild(div);
});
}
