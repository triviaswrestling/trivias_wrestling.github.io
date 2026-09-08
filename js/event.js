/* =========================================
   MI WRESTLING
   EVENT
   ========================================= */


/* =========================================
   GET EVENT ID
   ========================================= */

const urlParams = new URLSearchParams(
    window.location.search
);

const eventId = urlParams.get("id");


/* =========================================
   EVENTS DATABASE
   ========================================= */

const eventData = {

    "weekly-1": {

        type: "WEEKLY",
        title: "WEEKLY #1",
        date: "06/09/2026",
        brand: "RAW & SMACKDOWN",

        results: [

            {
                match: "MATCH 1",

                wrestler1: {
                    name: "Axiom",
                    image: "images/Vacante.jpg"
                },

                wrestler2: {
                    name: "Adam Cole",
                    image: "images/Vacante.jpg"
                },

                winner: "Axiom"
            },


            {
                match: "MATCH 2",

                wrestler1: {
                    name: "Jeff Jarrett",
                    image: "images/Vacante.jpg"
                },

                wrestler2: {
                    name: "Alberto Del Rio",
                    image: "images/Vacante.jpg"
                },

                winner: "Jeff Jarrett"
            },


            {
                match: "MAIN EVENT",

                wrestler1: {
                    name: "Wrestler A",
                    image: "images/Vacante.jpg"
                },

                wrestler2: {
                    name: "Wrestler B",
                    image: "images/Vacante.jpg"
                },

                winner: "Wrestler A"
            }

        ]

    }

};


/* =========================================
   ELEMENTS
   ========================================= */

const eventTitle =
    document.getElementById("event-title");

const eventDate =
    document.getElementById("event-date");

const eventBrand =
    document.getElementById("event-brand");

const eventResults =
    document.getElementById("event-results");


/* =========================================
   EVENT NOT FOUND
   ========================================= */

if (!eventId || !eventData[eventId]) {

    eventTitle.textContent =
        "EVENT NOT FOUND";

    eventDate.textContent = "";

    eventBrand.textContent = "";

    eventResults.innerHTML = `
        <p>
            This event does not exist.
        </p>
    `;

}


/* =========================================
   LOAD EVENT
   ========================================= */

else {

    const event =
        eventData[eventId];


    eventTitle.textContent =
        event.title;

    eventDate.textContent =
        event.date;

    eventBrand.textContent =
        event.brand;


    /* =====================================
       RESULTS
       ===================================== */

    eventResults.innerHTML = "";


    event.results.forEach(result => {

        const resultCard =
            document.createElement("div");

        resultCard.className =
            "result-card";


        resultCard.innerHTML = `

            <div class="match-name">
                ${result.match}
            </div>


            <div class="match">

                <div class="wrestler">

                    <img
                        src="${result.wrestler1.image}"
                        alt="${result.wrestler1.name}"
                    >

                    <span>
                        ${result.wrestler1.name}
                    </span>

                </div>


                <div class="vs">
                    VS
                </div>


                <div class="wrestler">

                    <img
                        src="${result.wrestler2.image}"
                        alt="${result.wrestler2.name}"
                    >

                    <span>
                        ${result.wrestler2.name}
                    </span>

                </div>

            </div>


            <div class="match-winner">

                WINNER:

                <strong>
                    ${result.winner}
                </strong>

            </div>

        `;


        eventResults.appendChild(
            resultCard
        );

    });

}
