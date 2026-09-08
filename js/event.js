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
   CREATE WRESTLER ID
   ========================================= */

function createWrestlerId(name) {

    return name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

}


/* =========================================
   EVENT NOT FOUND
   ========================================= */

if (
    !eventId ||
    !eventData[eventId]
) {

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


    /* =====================================
       EVENT INFORMATION
       ===================================== */

    eventTitle.textContent =
        event.title;

    eventDate.textContent =
        event.date;

    eventBrand.textContent =
        event.brand;


    /* =====================================
       CLEAR RESULTS
       ===================================== */

    eventResults.innerHTML = "";


    /* =====================================
       RENDER RESULTS
       ===================================== */

    event.results.forEach(result => {

        const resultCard =
            document.createElement("div");

        resultCard.className =
            "result-card";


        /* =================================
           CHAMPIONSHIP
           ================================= */

        let championshipHTML = "";


        if (result.championship) {

            championshipHTML = `
                <div class="championship-name">
                    ${result.championship}
                </div>
            `;

        }


        /* =================================
           TEAM 1
           ================================= */

        let team1HTML = "";


        result.wrestler1.forEach(name => {

            const wrestlerId =
                createWrestlerId(name);


            team1HTML += `

                <div class="wrestler">

                    <a
                        href="superstar.html?id=${wrestlerId}"
                        class="wrestler-link"
                    >

                        <img
                            src="images/Vacante.jpg"
                            alt="${name}"
                        >

                        <span>
                            ${name}
                        </span>

                    </a>

                </div>

            `;

        });


        /* =================================
           TEAM 2
           ================================= */

        let team2HTML = "";


        result.wrestler2.forEach(name => {

            const wrestlerId =
                createWrestlerId(name);


            team2HTML += `

                <div class="wrestler">

                    <a
                        href="superstar.html?id=${wrestlerId}"
                        class="wrestler-link"
                    >

                        <img
                            src="images/Vacante.jpg"
                            alt="${name}"
                        >

                        <span>
                            ${name}
                        </span>

                    </a>

                </div>

            `;

        });


        /* =================================
           RESULT CARD
           ================================= */

        resultCard.innerHTML = `

            <div class="match-name">
                ${result.match}
            </div>

            ${championshipHTML}

            <div class="match">

                <div class="team">

                    ${team1HTML}

                </div>


                <div class="vs">
                    VS
                </div>


                <div class="team">

                    ${team2HTML}

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
