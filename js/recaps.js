const eventsContainer=document.getElementById("events-container");
const pagination=document.getElementById("pagination");
const filterButtons=document.querySelectorAll(".recap-filter");

const events=[];

const EVENTS_PER_PAGE=20;
let currentPage=1;
let currentFilter="ALL";


/* =========================================
   SPECIAL EVENTS
   ========================================= */

if(typeof eventData!=="undefined"){

Object.entries(eventData).forEach(([id,event])=>{

if(event.type==="PLE"){

events.push({
id:id,
...event
});

}

});

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
number:number,
events:[]
};

}

weeklyEvents[number].events.push({
id:id,
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
number:number,
event:{
id:id,
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


/* OLD WEEKLY */

if(data.weekly){

Object.entries(data.weekly).forEach(
([id,event])=>{

addWeekly(id,event);
addNXT(id,event);

});

}


/* OLD MATCHES */

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


/* NEW TOURNAMENT SHOWS */

if(data.shows){

Object.entries(data.shows).forEach(
([id,event])=>{

addWeekly(id,event);
addNXT(id,event);

});

}

});


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

image:"images/events/default.jpg"

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

image:nxt.event.image||
"images/events/default.jpg"

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

events.push({

id:id,

title:`${brand} #${
id.match(/-(\d+)$/)?.[1]||""
}`,

date:event.date||"",

brand:brand,

type:brand,

image:event.image||
"images/events/default.jpg"

});

});

});

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

if(!exists){

button.style.display="none";

}

}

});


/* =========================================
   GET FILTERED EVENTS
   ========================================= */

function getFilteredEvents(){

let list=events;

if(currentFilter==="WEEKLY"){

list=events.filter(
event=>event.type==="WEEKLY"
);

}

if(currentFilter==="NXT"){

list=events.filter(
event=>event.type==="NXT"
);

}

if(currentFilter==="SPECIAL EVENTS"){

list=events.filter(
event=>event.type==="PLE"
);

}

if([
"SPEED",
"TNA",
"AEW",
"AAA",
"CMLL"
].includes(currentFilter)){

list=events.filter(
event=>event.type===currentFilter
);

}

return list
.slice()
.sort(
(a,b)=>dateValue(b.date)-dateValue(a.date)
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

renderPagination(0);

return;

}


/* =========================================
   CURRENT PAGE
   ========================================= */

if(currentPage>totalPages){

currentPage=totalPages;

}

const start=
(currentPage-1)*EVENTS_PER_PAGE;

const pageEvents=
list.slice(
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
src="${event.image||"images/events/default.jpg"}"
alt="${event.title}"
>

<div class="event-info">

<div class="event-type">
${
event.type==="PLE"
?"SPECIAL EVENT"
:event.type
}
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

card.addEventListener(
"click",
()=>{

window.location.href=
`event.html?id=${event.id}`;

});

eventsContainer.appendChild(card);

});


renderPagination(totalPages);

}


/* =========================================
   PAGINATION
   ========================================= */

function renderPagination(totalPages){

if(!pagination)return;

pagination.innerHTML="";

if(totalPages<=1)return;


const previous=document.createElement("button");

previous.textContent="‹";

previous.disabled=currentPage===1;

previous.addEventListener(
"click",
()=>{

if(currentPage>1){

currentPage--;

renderEvents();

window.scrollTo({
top:0,
behavior:"smooth"
});

}

});

pagination.appendChild(previous);


/* =========================================
   PAGE NUMBERS
   ========================================= */

for(let i=1;i<=totalPages;i++){

const button=document.createElement("button");

button.textContent=i;

if(i===currentPage){

button.classList.add("active");

}

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

pagination.appendChild(button);

}


/* =========================================
   NEXT
   ========================================= */

const next=document.createElement("button");

next.textContent="›";

next.disabled=
currentPage===totalPages;

next.addEventListener(
"click",
()=>{

if(currentPage<totalPages){

currentPage++;

renderEvents();

window.scrollTo({
top:0,
behavior:"smooth"
});

}

});

pagination.appendChild(next);

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

currentPage=1;

renderEvents();

});

});


/* =========================================
   INITIAL RENDER
   ========================================= */

renderEvents();
