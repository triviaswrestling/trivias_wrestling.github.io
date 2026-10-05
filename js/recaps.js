const eventsContainer=document.getElementById("events-container");
const pagination=document.getElementById("pagination");
const dateParts=document.getElementById("date-parts");
const filterButtons=document.querySelectorAll(".recap-filter");

const events=[];
const EVENTS_PER_PAGE=18;

let currentPage=1;
let currentFilter="ALL";


/* =========================================
   SPECIAL EVENTS
   ========================================= */

if(typeof eventData!=="undefined"){

Object.entries(eventData).forEach(([id,event])=>{

if(event.type==="PLE"){
events.push({
id,
...event,
type:event.brand==="NXT"?"TAKEOVER":"PLE"
});
}

});

}


/* =========================================
   SEASON IMAGES
   ========================================= */

function getSeasonImage(type,number){

const seasons={

WEEKLY:[[1,40,"images/smackrawlivee.webp"],
[41,50,"images/smackrawlivee.webp"]],

NXT:[[1,40,"images/nxt202X.webp"]],

SPEED:[[1,55,"images/speeed.webp"]],

TNA:[],

AEW:[],

AAA:[],

CMLL:[]

};

const list=seasons[type];

if(!list||!list.length)
return "images/events/default.jpg";

const season=list.find(
range=>number>=range[0]&&number<=range[1]
);

return season?
season[2]:
"images/events/default.jpg";

}


/* =========================================
   TOURNAMENT DATA
   ========================================= */

if(typeof tournamentData!=="undefined"){

const weeklyEvents={};
const nxtEvents={};


/* =========================================
   WEEKLY
   ========================================= */

function addWeekly(id,event){

if(!event)return;

const match=id.match(/^(raw|smackdown)-(\d+)$/);

if(!match)return;

const number=Number(match[2]);

if(!weeklyEvents[number]){
weeklyEvents[number]={
number,
events:[]
};
}

weeklyEvents[number].events.push({
id,
...event
});

}


/* =========================================
   NXT
   ========================================= */

function addNXT(id,event){

if(!event)return;

const match=id.match(/^nxt-(\d+)$/);

if(!match)return;

const number=Number(match[1]);

nxtEvents[number]={
number,
event:{
id,
...event
}
};

}


/* =========================================
   READ ALL TOURNAMENTS
   ========================================= */

Object.entries(tournamentData).forEach(
([tournamentId,data])=>{

if(!data)return;


/* =====================================
   OLD WEEKLY
   ===================================== */

if(data.weekly){

Object.entries(data.weekly).forEach(
([id,event])=>{

addWeekly(id,event);
addNXT(id,event);

});

}


/* =====================================
   OLD MATCHES
   ===================================== */

if(
data.matches&&
!Array.isArray(data.matches)
){

Object.entries(data.matches).forEach(
([id,event])=>{

addWeekly(id,event);
addNXT(id,event);

});

}


/* =====================================
   NEW TOURNAMENT SHOWS
   ===================================== */

if(data.shows){

Object.entries(data.shows).forEach(
([id,event])=>{

addWeekly(id,event);
addNXT(id,event);

});

}


/* =====================================
   LEAGUES
   ===================================== */

if(Array.isArray(data.leagues)){

const grouped={};

data.leagues.forEach(league=>{

Object.entries(league.shows||{})
.forEach(([id,event])=>{

if(!event)return;

if(!grouped[id]){
grouped[id]={
date:event.date||"",
image:event.image||""
};
}

});

});

Object.entries(grouped).forEach(
([id,event])=>{

addWeekly(id,event);
addNXT(id,event);

});

}

}
);


/* =========================================
   CREATE WEEKLY
   ========================================= */

Object.values(weeklyEvents).forEach(weekly=>{

if(!weekly.events.length)return;

weekly.events.sort(
(a,b)=>dateValue(a.date)-dateValue(b.date)
);

const dates=weekly.events
.map(event=>event.date)
.filter(Boolean)
.sort(
(a,b)=>dateValue(a)-dateValue(b)
);

events.push({

id:`weekly-${weekly.number}`,

title:`WEEKLY #${weekly.number}`,

date:dates[0]||"",

brand:"",

type:"WEEKLY",

image:getSeasonImage(
"WEEKLY",
weekly.number
)

});

});


/* =========================================
   CREATE NXT
   ========================================= */

Object.values(nxtEvents).forEach(nxt=>{

if(!nxt.event)return;

events.push({

id:`nxt-${nxt.number}`,

title:`NXT #${nxt.number}`,

date:nxt.event.date||"",

brand:"NXT",

type:"NXT",

image:
nxt.event.image||
getSeasonImage(
"NXT",
nxt.number
)

});

});

}


/* =========================================
   OUTSIDER DATA
   SPEED / TNA / AEW / AAA / CMLL
   ========================================= */

if(typeof outsiderData!=="undefined"){

Object.entries(outsiderData).forEach(
([tournamentId,data])=>{

if(!data||!data.shows)return;

const brand=(data.brand||"").toUpperCase();

if(![
"SPEED",
"TNA",
"AEW",
"AAA",
"CMLL"
].includes(brand))return;

Object.entries(data.shows).forEach(
([id,event])=>{

if(!event)return;

const number=
Number(id.match(/-(\d+)$/)?.[1]||0);

events.push({

id,

title:
`${brand} #${
id.match(/-(\d+)$/)?.[1]||""
}`,

date:event.date||"",

brand,

type:brand,

image:
event.image||
getSeasonImage(
brand,
number
)

});

});

}
);

}


/* =========================================
   DATE
   ========================================= */

function dateValue(date){

if(!date)return 0;

const[d,m,y]=String(date).split("/");

return new Date(
Number(y),
Number(m)-1,
Number(d)
).getTime();

}


/* =========================================
   SORT
   ========================================= */

events.sort(
(a,b)=>dateValue(b.date)-dateValue(a.date)
);


/* =========================================
   AVAILABLE FILTERS
   ========================================= */

const outsiderBrands=[
"SPEED",
"TNA",
"AEW",
"AAA",
"CMLL"
];

filterButtons.forEach(button=>{

const filter=button.textContent
.trim()
.toUpperCase();

if(outsiderBrands.includes(filter)){

const exists=events.some(
event=>event.type===filter
);

if(!exists)
button.style.display="none";

}

});


/* =========================================
   GET FILTERED EVENTS
   ========================================= */

function getFilteredEvents(){

let list=events;

if(currentFilter==="WEEKLY")
list=events.filter(
event=>event.type==="WEEKLY"
);

if(currentFilter==="NXT")
list=events.filter(
event=>event.type==="NXT"
);

if(currentFilter==="PLE")
list=events.filter(
event=>event.type==="PLE"
);

if(currentFilter==="TAKEOVER")
list=events.filter(
event=>event.type==="TAKEOVER"
);

if([
"SPEED",
"TNA",
"AEW",
"AAA",
"CMLL"
].includes(currentFilter))
list=events.filter(
event=>event.type===currentFilter
);

return list.slice().sort(
(a,b)=>dateValue(b.date)-dateValue(a.date)
);

}


/* =========================================
   DATE PARTS
   PART 01 = EVENTS 1-20
   PART 02 = EVENTS 21-40
   ========================================= */

function renderDateParts(totalPages){

if(!dateParts)return;

dateParts.innerHTML="";

if(totalPages<=1)return;

for(let i=1;i<=totalPages;i++){

const button=document.createElement("button");

button.className="date-part";


/* =====================================
   ACTIVE PART
   ===================================== */

if(i===currentPage)
button.classList.add("active");


/* =====================================
   PART TEXT
   ===================================== */

const number=String(i).padStart(2,"0");

button.innerHTML=`
<span>PART</span>
${number}
`;


/* =====================================
   CLICK
   ===================================== */

button.addEventListener(
"click",
()=>{

currentPage=i;

renderEvents();

window.scrollTo({
top:0,
behavior:"smooth"
});

});

dateParts.appendChild(button);

}

}


/* =========================================
   TOUCH CARD STATE
   ONLY EVENT CARDS
   ========================================= */

let activeTouchCard=null;

function activateTouchCard(card){

if(!card)return;

if(activeTouchCard&&activeTouchCard!==card){
activeTouchCard.classList.remove("touch-active");
}

card.classList.add("touch-active");

activeTouchCard=card;

}


/* =========================================
   TOUCH / POINTER DETECTION
   ========================================= */

if(eventsContainer){

eventsContainer.addEventListener(
"pointerdown",
event=>{

const card=event.target.closest(".event-card");

if(card&&eventsContainer.contains(card)){
activateTouchCard(card);
return;
}

if(activeTouchCard){
activeTouchCard.classList.remove("touch-active");
activeTouchCard=null;
}

},
{passive:true}
);


/* =========================================
   FINGER SWIPE ACROSS CARDS
   ========================================= */

eventsContainer.addEventListener(
"pointermove",
event=>{

if(event.pointerType!=="touch")return;

const element=document.elementFromPoint(
event.clientX,
event.clientY
);

const card=
element?
element.closest(".event-card"):
null;

if(card&&eventsContainer.contains(card)){
activateTouchCard(card);
}

},
{passive:true}
);

}


/* =========================================
   RENDER
   ========================================= */

function renderEvents(){

eventsContainer.innerHTML="";

const list=getFilteredEvents();

const totalPages=Math.ceil(
list.length/EVENTS_PER_PAGE
);


/* =========================================
   NO EVENTS
   ========================================= */

if(!list.length){

eventsContainer.innerHTML=`
<div class="event-card">
<h2>NO EVENTS FOUND</h2>
</div>
`;

activeTouchCard=null;

renderDateParts(0);

return;

}


/* =========================================
   CURRENT PART
   ========================================= */

if(currentPage>totalPages)
currentPage=totalPages;

if(currentPage<1)
currentPage=1;


/* =========================================
   PART POSITION
   ========================================= */

const start=
(currentPage-1)*EVENTS_PER_PAGE;

const pageEvents=list.slice(
start,
start+EVENTS_PER_PAGE
);


/* =========================================
   CREATE CARDS
   ========================================= */

pageEvents.forEach(event=>{

const card=document.createElement("div");

card.className=
`event-card ${event.type.toLowerCase()}`;

card.innerHTML=`

<img
class="event-image"
src="${
event.image||
"images/events/default.jpg"
}"
alt="${event.title}"
onerror="this.onerror=null;this.src='images/events/default.jpg';"
>

<div class="event-info">

<div class="event-type">
${event.type}
</div>

<h2>${event.title}</h2>

<div class="event-date">
${event.date||""}
</div>

<div class="event-brand">
${event.brand||""}
</div>

</div>
`;


/* =====================================
   EVENT CLICK
   ORIGINAL NAVIGATION
   ===================================== */

card.addEventListener(
"click",
()=>{

window.location.href=
`event.html?id=${event.id}`;

}
);

eventsContainer.appendChild(card);

});


/* =========================================
   RESET OLD CARD REFERENCE
   ========================================= */

activeTouchCard=null;


/* =========================================
   UPDATE PARTS
   ========================================= */

renderDateParts(totalPages);

}


/* =========================================
   OLD PAGINATION CONTAINER
   ========================================= */

function renderPagination(totalPages){

if(!pagination)return;

pagination.innerHTML="";

}


/* =========================================
   FILTERS
   ========================================= */

filterButtons.forEach(button=>{

button.addEventListener(
"click",
()=>{

filterButtons.forEach(btn=>
btn.classList.remove("active")
);

button.classList.add("active");

currentFilter=
button.textContent
.trim()
.toUpperCase();


/* ================================
   RESET TO PART 01
   ================================ */

currentPage=1;

renderEvents();

}
);

});


/* =========================================
   INITIAL RENDER
   ========================================= */

renderEvents();
