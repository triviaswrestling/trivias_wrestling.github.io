const eventsContainer=document.getElementById("events-container");
const filterButtons=document.querySelectorAll(".recap-filter");

const events=[];


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
   RENDER
   ========================================= */

function renderEvents(list){

eventsContainer.innerHTML="";

if(!list.length){

eventsContainer.innerHTML=`
<div class="event-card">
<h2>NO EVENTS FOUND</h2>
</div>`;

return;

}

list.forEach(event=>{

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

}


/* =========================================
   FILTERS
   ========================================= */

filterButtons.forEach(button=>{

button.addEventListener("click",()=>{

filterButtons.forEach(btn=>
btn.classList.remove("active")
);

button.classList.add("active");

const filter=
button.textContent
.trim()
.toUpperCase();

let list=events;

if(filter==="WEEKLY"){

list=events.filter(
event=>event.type==="WEEKLY"
);

}

if(filter==="NXT"){

list=events.filter(
event=>event.type==="NXT"
);

}

if(filter==="SPECIAL EVENTS"){

list=events.filter(
event=>event.type==="PLE"
);

}

renderEvents(list);

});

});


/* =========================================
   INITIAL RENDER
   ========================================= */

renderEvents(events);
