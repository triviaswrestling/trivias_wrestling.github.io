/* =========================================
   MI WRESTLING
   RECAPS / EVENTS
   ========================================= */

const eventsContainer=document.getElementById("events-container");
const filterButtons=document.querySelectorAll(".recap-filter");

/* =========================================
   EVENTS
   WEEKLY + PLE ONLY
   ========================================= */

const events=Object.entries(eventData)
    .filter(([id,event])=>event.type==="WEEKLY"||event.type==="PLE")
    .map(([id,event])=>({id,...event}));

/* =========================================
   SORT
   NEWEST → OLDEST
   ========================================= */

function dateValue(date){
    if(!date)return 0;
    const [d,m,y]=date.split("/");
    return new Date(y,m-1,d).getTime();
}

events.sort((a,b)=>dateValue(b.date)-dateValue(a.date));

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

        card.className=`event-card ${event.type.toLowerCase()}`;

        card.innerHTML=`
            <img class="event-image"
                 src="${event.image||"images/events/default.jpg"}"
                 alt="${event.title}">

            <div class="event-info">
                <div class="event-type">${event.type}</div>
                <h2>${event.title}</h2>
                <div class="event-date">${event.date}</div>
                <div class="event-brand">${event.brand}</div>
            </div>
        `;

        card.addEventListener("click",()=>{
            window.location.href=`event.html?id=${event.id}`;
        });

        eventsContainer.appendChild(card);
    });
}

/* =========================================
   FILTER
   ========================================= */

filterButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        filterButtons.forEach(btn=>btn.classList.remove("active"));
        button.classList.add("active");

        const filter=button.textContent.trim().toUpperCase();

        let list=events;

        if(filter==="WEEKLY")
            list=events.filter(e=>e.type==="WEEKLY");

        if(filter==="SPECIAL EVENTS")
            list=events.filter(e=>e.type==="PLE");

        if(filter==="NXT")
            list=[];

        renderEvents(list);
    });
});

/* =========================================
   START
   ========================================= */

renderEvents(events);
