/* =========================================
   MI WRESTLING
   RECAPS / EVENTS
   ========================================= */

const events=[];

/* =========================================
   WEEKLY EVENTS
   ========================================= */

const weeklyDates=[
    "06/09/2026","13/09/2026","20/09/2026","27/09/2026",
    "04/10/2026","11/10/2026","18/10/2026",
    "25/10/2026","01/11/2026","08/11/2026","15/11/2026",
    "22/11/2026","29/11/2026","06/12/2026",
    "13/12/2026","20/12/2026","27/12/2026","03/01/2027",
    "10/01/2027","17/01/2027","24/01/2027",
    "31/01/2027","07/02/2027","14/02/2027","21/02/2027",
    "28/02/2027","07/03/2027"
];

for(let i=1;i<=28;i++){
    events.push({
        id:`weekly-${i}`,
        type:"WEEKLY",
        title:`WEEKLY #${i}`,
        date:weeklyDates[i-1],
        brand:"RAW & SMACKDOWN"
    });
}

/* =========================================
   NXT
   ========================================= */

events.push(
    {
        id:"nxt-1",
        type:"NXT",
        title:"NXT #1",
        date:"08/09/2026",
        brand:"NXT"
    },
    {
        id:"nxt-2",
        type:"NXT",
        title:"NXT #2",
        date:"15/09/2026",
        brand:"NXT"
    }
);

/* =========================================
   SPECIAL EVENTS
   ========================================= */

events.push(
    {
        id:"summerslam-2026",
        type:"SPECIAL",
        title:"SUMMERSLAM 2026",
        date:"23/08/2026",
        brand:"SPECIAL EVENT"
    },
    {
        id:"night-of-champions-2026",
        type:"SPECIAL",
        title:"NIGHT OF CHAMPIONS 2026",
        date:"26/07/2026",
        brand:"SPECIAL EVENT"
    }
);

/* =========================================
   ELEMENT
   ========================================= */

const eventsContainer=document.getElementById("events-container");

/* =========================================
   RENDER EVENTS
   ========================================= */

function renderEvents(eventList){
    eventsContainer.innerHTML="";

    if(eventList.length===0){
        eventsContainer.innerHTML=`
            <div class="event-card">
                <div class="event-type">EVENTS</div>
                <h2>NO EVENTS FOUND</h2>
            </div>
        `;
        return;
    }

    eventList.forEach(event=>{
        const card=document.createElement("div");
        card.className="event-card";

        if(event.type==="WEEKLY")card.classList.add("weekly");
        else if(event.type==="NXT")card.classList.add("nxt");
        else if(event.type==="SPECIAL")card.classList.add("special");

        card.innerHTML=`
            <div>
                <div class="event-type">${event.type}</div>
                <h2>${event.title}</h2>
                <div class="event-date">${event.date}</div>
            </div>
            <div class="event-brand">${event.brand}</div>
        `;

        card.addEventListener("click",()=>{
            window.location.href=`event.html?id=${event.id}`;
        });

        eventsContainer.appendChild(card);
    });
}

/* =========================================
   FILTERS
   ========================================= */

const filterButtons=document.querySelectorAll(".recap-filter");

filterButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        filterButtons.forEach(item=>item.classList.remove("active"));
        button.classList.add("active");

        const filter=button.textContent.trim().toUpperCase();
        let filteredEvents=events;

        if(filter==="WEEKLY"){
            filteredEvents=events.filter(event=>event.type==="WEEKLY");
        }else if(filter==="NXT"){
            filteredEvents=events.filter(event=>event.type==="NXT");
        }else if(filter==="SPECIAL EVENTS"){
            filteredEvents=events.filter(event=>event.type==="SPECIAL");
        }

        renderEvents(filteredEvents);
    });
});

/* =========================================
   INITIAL RENDER
   ========================================= */

renderEvents(events);
