/* =========================================
   MI WRESTLING
   EVENT
   ========================================= */

const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("id");


/* =========================================
   ELEMENTS
   ========================================= */

const eventTitle = document.getElementById("event-title");
const eventDate = document.getElementById("event-date");
const eventBrand = document.getElementById("event-brand");
const eventResults = document.getElementById("event-results");


/* =========================================
   FUNCTIONS
   ========================================= */

function normalizeName(name) {
    return String(name).toLowerCase().trim();
}

function createWrestlerId(name) {
    return normalizeName(name).replace(/\s+/g, "-");
}

function getWrestler(name) {

    if (typeof wrestlers === "undefined") {
        return null;
    }

    return wrestlers.find(
        w => normalizeName(w.name) === normalizeName(name)
    ) || null;
}

function getWrestlerImage(name) {

    const wrestler = getWrestler(name);

    return wrestler && wrestler.image
        ? wrestler.image
        : "images/Vacante.jpg";
}


/* =========================================
   BRAND COLORS
   ========================================= */

function getBrandClass(brand) {

    const b = normalizeName(brand);

    if (b === "smackdown" || b === "smack down") {
        return "brand-smackdown";
    }

    if (b === "nxt") {
        return "brand-nxt";
    }

    if (b === "speed") {
        return "brand-speed";
    }

    if (
        b === "ple" ||
        b === "premium live event" ||
        b === "premium live events"
    ) {
        return "brand-ple";
    }

    return "brand-raw";
}


/* =========================================
   EVENT NOT FOUND
   ========================================= */

if (
    !eventId ||
    typeof eventData === "undefined" ||
    !eventData[eventId]
) {

    eventTitle.textContent = "EVENT NOT FOUND";
    eventDate.textContent = "";
    eventBrand.textContent = "";

    eventResults.innerHTML =
        "<p>This event does not exist.</p>";

}


/* =========================================
   LOAD EVENT
   ========================================= */

else {

    const event = eventData[eventId];

    eventTitle.textContent = event.title;
    eventDate.textContent = event.date;
    eventBrand.textContent = event.brand;

    eventResults.innerHTML = "";


    if (!event.results || !event.results.length) {

        eventResults.innerHTML =
            "<p>No results available.</p>";

    }

    else {

        event.results.forEach(result => {

            /* =====================================
               BRAND OF THIS MATCH
               ===================================== */

            const brandClass =
                getBrandClass(result.brand || event.brand);


            /* =====================================
               RESULT CARD
               ===================================== */

            const resultCard =
                document.createElement("div");

            resultCard.className =
                `result-card ${brandClass}`;


            /* =====================================
               TEAMS
               ===================================== */

            const team1 = Array.isArray(result.wrestler1)
                ? result.wrestler1
                : [result.wrestler1];

            const team2 = Array.isArray(result.wrestler2)
                ? result.wrestler2
                : [result.wrestler2];


            /* =====================================
               WRESTLER HTML
               ===================================== */

            function createWrestlerHTML(name) {

                return `
                    <div class="wrestler">

                        <a
                            href="superstar.html?id=${createWrestlerId(name)}"
                            class="wrestler-link"
                        >

                            <img
                                src="${getWrestlerImage(name)}"
                                alt="${name}"
                            >

                            <span>${name}</span>

                        </a>

                    </div>
                `;
            }


            const team1HTML =
                team1.map(createWrestlerHTML).join("");

            const team2HTML =
                team2.map(createWrestlerHTML).join("");


            /* =====================================
               MATCH NAME
               ===================================== */

            const matchName =
                result.match ||
                `${team1.join(" & ")} vs ${team2.join(" & ")}`;


            /* =====================================
               WINNER
               ===================================== */

            let winner = result.winner || "";

            if (
                !winner &&
                typeof result.score1 === "number" &&
                typeof result.score2 === "number"
            ) {

                if (result.score1 > result.score2) {
                    winner = team1.join(" & ");
                }

                else if (result.score2 > result.score1) {
                    winner = team2.join(" & ");
                }

                else {
                    winner = "DRAW";
                }
            }


            /* =====================================
               SCORE
               ===================================== */

            let scoreHTML = "";

            if (
                result.score1 !== undefined &&
                result.score2 !== undefined
            ) {

                scoreHTML = `
                    <div class="match-score">
                        <span>${result.score1}</span>
                        <span>-</span>
                        <span>${result.score2}</span>
                    </div>
                `;
            }


            /* =====================================
               CHAMPIONSHIP
               ===================================== */

            const championshipHTML =
                result.championship
                    ? `
                        <div class="championship-name">
                            ${result.championship}
                        </div>
                    `
                    : "";


            /* =====================================
               FINAL HTML
               ===================================== */

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

                        <span>VS</span>

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

            eventResults.appendChild(resultCard);

        });
    }
}
