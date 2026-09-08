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

    return String(name)
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

}


/* =========================================
   NORMALIZE NAME
   ========================================= */

function normalizeName(name) {

    return String(name)
        .toLowerCase()
        .trim();

}


/* =========================================
   GET WRESTLER
   ========================================= */

function getWrestler(name) {

    if (typeof wrestlers === "undefined") {

        return null;

    }

    return wrestlers.find(wrestler => {

        return normalizeName(
            wrestler.name
        ) === normalizeName(name);

    }) || null;

}


/* =========================================
   GET WRESTLER IMAGE
   ========================================= */

function getWrestlerImage(name) {

    const wrestler =
        getWrestler(name);

    if (
        wrestler &&
        wrestler.image
    ) {

        return wrestler.image;

    }

    return "images/Vacante.jpg";

}


/* =========================================
   EVENT NOT FOUND
   ========================================= */

if (
    !eventId ||
    typeof eventData === "undefined" ||
    !eventData[eventId]
) {

    eventTitle.textContent =
        "EVENT NOT FOUND";

    eventDate.textContent =
        "";

    eventBrand.textContent =
        "";

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
       NO RESULTS
       ===================================== */

    if (
        !event.results ||
        event.results.length === 0
    ) {

        eventResults.innerHTML = `
            <p>
                No results available.
            </p>
        `;

    }


    /* =====================================
       RENDER RESULTS
       ===================================== */

    else {

        event.results.forEach(result => {

            const resultCard =
                document.createElement("div");

            resultCard.className =
                "result-card";


            /* =================================
               WRESTLERS
               ================================= */

            const team1 = Array.isArray(
                result.wrestler1
            )
                ? result.wrestler1
                : [result.wrestler1];

            const team2 = Array.isArray(
                result.wrestler2
            )
                ? result.wrestler2
                : [result.wrestler2];


            /* =================================
               CREATE WRESTLER HTML
               ================================= */

            function createWrestlerHTML(name) {

                const wrestlerId =
                    createWrestlerId(name);

                const image =
                    getWrestlerImage(name);

                return `

                    <div class="wrestler">

                        <a
                            href="superstar.html?id=${wrestlerId}"
                            class="wrestler-link"
                        >

                            <img
                                src="${image}"
                                alt="${name}"
                            >

                            <span>
                                ${name}
                            </span>

                        </a>

                    </div>

                `;

            }


            /* =================================
               TEAM 1
               ================================= */

            let team1HTML = "";

            team1.forEach(name => {

                team1HTML +=
                    createWrestlerHTML(name);

            });


            /* =================================
               TEAM 2
               ================================= */

            let team2HTML = "";

            team2.forEach(name => {

                team2HTML +=
                    createWrestlerHTML(name);

            });


            /* =================================
               MATCH NAME
               ================================= */

            const matchName =
                result.match ||
                `${team1.join(" & ")} vs ${team2.join(" & ")}`;


            /* =================================
               WINNER
               ================================= */

            let winner =
                result.winner || "";


            if (!winner) {

                if (
                    typeof result.score1 === "number" &&
                    typeof result.score2 === "number"
                ) {

                    if (
                        result.score1 >
                        result.score2
                    ) {

                        winner =
                            team1.join(" & ");

                    }

                    else if (
                        result.score2 >
                        result.score1
                    ) {

                        winner =
                            team2.join(" & ");

                    }

                    else {

                        winner =
                            "DRAW";

                    }

                }

            }


            /* =================================
               SCORE
               ================================= */

            let scoreHTML = "";

            if (
                result.score1 !== undefined &&
                result.score2 !== undefined
            ) {

                scoreHTML = `

                    <div class="match-score">

                        ${result.score1}
                        -
                        ${result.score2}

                    </div>

                `;

            }


            /* =================================
               CHAMPIONSHIP
               ================================= */

            let championshipHTML = "";

            if (
                result.championship
            ) {

                championshipHTML = `

                    <div class="championship-name">

                        ${result.championship}

                    </div>

                `;

            }


            /* =================================
               RESULT CARD
               ================================= */

            resultCard.innerHTML = `

                <div class="match-name">

                    ${matchName}

                </div>

                ${championshipHTML}


                <div class="match">


                    <div class="team">

                        ${team1HTML}

                    </div>


                    <div class="vs">

                        VS

                        ${scoreHTML}

                    </div>


                    <div class="team">

                        ${team2HTML}

                    </div>


                </div>


                <div class="match-winner">

                    WINNER:

                    <strong>

                        ${winner || "TBD"}

                    </strong>

                </div>

            `;


            eventResults.appendChild(
                resultCard
            );

        });

    }

}
