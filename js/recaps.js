/* =========================================
   MI WRESTLING
   RECAPS / EVENTS
   ========================================= */


/* =========================================
   EVENTS DATABASE
   ========================================= */

const events = [];


/* =========================================
   WEEKLY EVENTS
   ========================================= */

const weeklyDates = [
    "06/09/2026","13/09/2026","20/09/2026","27/09/2026",
    "04/10/2026","11/10/2026","18/10/2026","25/10/2026",
    "01/11/2026","08/11/2026","15/11/2026","22/11/2026",
    "29/11/2026","06/12/2026","13/12/2026","20/12/2026",
    "27/12/2026","03/01/2027","10/01/2027","17/01/2027",
    "24/01/2027","31/01/2027","07/02/2027","14/02/2027",
    "21/02/2027","28/02/2027","07/03/2027"
];

weeklyDates.forEach((date, i) => {

    events.push({
        id:`weekly-${i+1}`,
        type:"WEEKLY",
        title:`WEEKLY #${i+1}`,
        date:date,
        brand:"RAW & SMACKDOWN",
        image:"images/raw-smackdown.jpg"
    });

});


/* =========================================
   NXT EVENTS
   ========================================= */

events.push(

    {
        id:"nxt-1",
        type:"NXT",
        title:"NXT #1",
        date:"08/09/2026",
        brand:"NXT",
        image:"images/nxt.jpg"
    },

    {
        id:"nxt-2",
        type:"NXT",
        title:"NXT #2",
        date:"15/09/2026",
        brand:"NXT",
        image:"images/nxt.jpg"
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
        brand:"SPECIAL EVENT",
        image:"images/special.jpg"
    },

    {
        id:"night-of-champions-2026",
        type:"SPECIAL",
        title:"NIGHT OF CHAMPIONS 2026",
        date:"26/07/2026",
        brand:"SPECIAL EVENT",
        image:"images/special.jpg"
    }

);


/* =========================================
   TOURNAMENT EVENTS
   ========================================= */

events.push(

    {
        id:"tournament-1",
        type:"TOURNAMENT",
        title:"TOURNAMENT #1",
        date:"30/09/2026",
        brand:"RAW",
        image:"images/raw.jpg"
    }

);


/* =========================================
   SORT
   NEWEST → OLDEST
   ========================================= */

events.sort((a,b) => {

    const A = a.date.split("/");
    const B = b.date.split("/");

    return new Date(B[2],B[1]-1,B[0]) -
           new Date(A[2],A[1]-1,A[0]);

});


/* =========================================
   ELEMENTS
   ========================================= */

const eventsContainer =
    document.getElementById("events-container");

const filterButtons =
    document.querySelectorAll(".recap-filter");


/* =========================================
   RENDER EVENTS
   ========================================= */

function renderEvents(list) {

    eventsContainer.innerHTML = "";

    if (!list.length) {

        eventsContainer.innerHTML = `
            <div class="event-card">
                <h2>NO EVENTS FOUND</h2>
            </div>
        `;

        return;
    }


    list.forEach(event => {

        const card =
            document.createElement("div");

        card.className =
            `event-card ${event.type.toLowerCase()}`;


        card.innerHTML = `

            <img
                class="event-image"
                src="${event.image}"
                alt="${event.brand}"
            >

            <div class="event-info">

                <div class="event-type">
                    ${event.type}
                </div>

                <h2>
                    ${event.title}
                </h2>

                <div class="event-date">
                    ${event.date}
                </div>

                <div class="event-brand">
                    ${event.brand}
                </div>

            </div>

        `;


        card.addEventListener("click", () => {

            window.location.href =
                `event.html?id=${event.id}`;

        });


        eventsContainer.appendChild(card);

    });

}


/* =========================================
   FILTER
   ========================================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");


        const filter =
            button.textContent
                .trim()
                .toUpperCase();


        let list = events;


        if (filter === "WEEKLY")
            list = events.filter(e =>
                e.type === "WEEKLY"
            );


        if (filter === "NXT")
            list = events.filter(e =>
                e.type === "NXT"
            );


        if (filter === "SPECIAL EVENTS")
            list = events.filter(e =>
                e.type === "SPECIAL"
            );


        renderEvents(list);

    });

});


/* =========================================
   INITIAL RENDER
   ========================================= */

renderEvents(events);
