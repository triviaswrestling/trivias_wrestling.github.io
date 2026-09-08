/* =========================================
   MI WRESTLING
   RECAPS / EVENTS
   ========================================= */


/* =========================================
   EVENTS DATABASE
   ========================================= */

const events = [

    {
        id: "weekly-1",
        type: "WEEKLY",
        title: "WEEKLY #1",
        date: "06/09/2026",
        brand: "RAW & SMACKDOWN"
    },

    {
        id: "weekly-2",
        type: "WEEKLY",
        title: "WEEKLY #2",
        date: "13/09/2026",
        brand: "RAW & SMACKDOWN"
    },

    {
        id: "nxt-1",
        type: "NXT",
        title: "NXT #1",
        date: "08/09/2026",
        brand: "NXT"
    },

    {
        id: "nxt-2",
        type: "NXT",
        title: "NXT #2",
        date: "15/09/2026",
        brand: "NXT"
    },

    {
        id: "summerslam-2026",
        type: "SPECIAL",
        title: "SUMMERSLAM 2026",
        date: "23/08/2026",
        brand: "SPECIAL EVENT"
    },

    {
        id: "night-of-champions-2026",
        type: "SPECIAL",
        title: "NIGHT OF CHAMPIONS 2026",
        date: "26/07/2026",
        brand: "SPECIAL EVENT"
    }

];


/* =========================================
   ELEMENT
   ========================================= */

const eventsContainer =
    document.getElementById("events-container");


/* =========================================
   RENDER EVENTS
   ========================================= */

function renderEvents(eventList) {

    eventsContainer.innerHTML = "";


    if (eventList.length === 0) {

        eventsContainer.innerHTML = `

            <div class="event-card">

                <div class="event-type">
                    EVENTS
                </div>

                <h2>
                    NO EVENTS FOUND
                </h2>

            </div>

        `;

        return;

    }


    eventList.forEach(event => {

        const card =
            document.createElement("div");


        card.className =
            "event-card";


        /* EVENT CLASS */

        if (event.type === "WEEKLY") {

            card.classList.add("weekly");

        }

        else if (event.type === "NXT") {

            card.classList.add("nxt");

        }

        else if (event.type === "SPECIAL") {

            card.classList.add("special");

        }


        card.innerHTML = `

            <div>

                <div class="event-type">
                    ${event.type}
                </div>

                <h2>
                    ${event.title}
                </h2>

                <div class="event-date">
                    ${event.date}
                </div>

            </div>

            <div class="event-brand">
                ${event.brand}
            </div>

        `;


        /* =================================
           OPEN EVENT
           ================================= */

        card.addEventListener(
            "click",
            () => {

                window.location.href =
                    `recap.html?id=${event.id}`;

            }
        );


        eventsContainer.appendChild(card);

    });

}


/* =========================================
   FILTERS
   ========================================= */

const filterButtons =
    document.querySelectorAll(
        ".recap-filter"
    );


filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {


            /* ACTIVE BUTTON */

            filterButtons.forEach(
                item => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add(
                "active"
            );


            /* FILTER */

            const filter =
                button.textContent
                .trim()
                .toUpperCase();


            let filteredEvents;


            if (filter === "ALL") {

                filteredEvents =
                    events;

            }

            else if (filter === "WEEKLY") {

                filteredEvents =
                    events.filter(
                        event =>
                            event.type === "WEEKLY"
                    );

            }

            else if (filter === "NXT") {

                filteredEvents =
                    events.filter(
                        event =>
                            event.type === "NXT"
                    );

            }

            else if (
                filter === "SPECIAL EVENTS"
            ) {

                filteredEvents =
                    events.filter(
                        event =>
                            event.type === "SPECIAL"
                    );

            }


            renderEvents(
                filteredEvents
            );

        }
    );

});


/* =========================================
   INITIAL RENDER
   ========================================= */

renderEvents(events);
