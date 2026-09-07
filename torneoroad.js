console.log("TORNEOROAD.JS CARGADO");


/* =========================================
   GET TOURNAMENT ID FROM URL
   ========================================= */

const urlParams = new URLSearchParams(window.location.search);
const tournamentId = urlParams.get("id");


/* =========================================
   TOURNAMENT DATABASE
   ========================================= */

const tournaments = {};
const tournamentData = {

    "raw-1": {

        participants: [
            "Axiom",
            "Bret Hart",
            "Jacob Fatu",
            "Kyle O'Reilly",
            "Cody Rhodes",
            "Trick Williams",
            "Bron Breakker",
            "Jon Moxley"
        ],

        matches: [

            {
                wrestler1: "Axiom",
                wrestler2: "Bret Hart",
                score1: 2,
                score2: 1
            },

            {
                wrestler1: "Jacob Fatu",
                wrestler2: "Kyle O'Reilly",
                score1: 2,
                score2: 3
            },

            {
                wrestler1: "Cody Rhodes",
                wrestler2: "Trick Williams",
                score1: 3,
                score2: 2
            },

            {
                wrestler1: "Bron Breakker",
                wrestler2: "Jon Moxley",
                score1: 1,
                score2: 3
            }

        ]

    }

};


/* =========================================
   GENERATE TOURNAMENTS
   ========================================= */

/* RAW */

for (let number = 25; number >= 1; number--) {

    tournaments[`raw-${number}`] = {

        id: `raw-${number}`,
        number: number,
        brand: "RAW",
        division: "FIRST DIVISION",
        title: `TOURNAMENT ${number}`

    };

}


/* SMACKDOWN */

for (let number = 25; number >= 1; number--) {

    tournaments[`smackdown-${number}`] = {

        id: `smackdown-${number}`,
        number: number,
        brand: "SMACKDOWN",
        division: "FIRST DIVISION",
        title: `TOURNAMENT ${number}`

    };

}


/* NXT */

for (let number = 18; number >= 1; number--) {

    tournaments[`nxt-${number}`] = {

        id: `nxt-${number}`,
        number: number,
        brand: "NXT",
        division: "SECOND DIVISION",
        title: `TOURNAMENT ${number}`

    };

}


/* =========================================
   FIND CURRENT TOURNAMENT
   ========================================= */

const tournament = tournaments[tournamentId];


/* =========================================
   ELEMENTS
   ========================================= */

const brandElement =
    document.getElementById("tournament-brand");

const titleElement =
    document.getElementById("tournament-title");

const divisionElement =
    document.getElementById("tournament-division");


/* =========================================
   DISPLAY TOURNAMENT
   ========================================= */

if (tournament) {

    brandElement.textContent =
        tournament.brand;

    titleElement.textContent =
        tournament.title;

    divisionElement.textContent =
        tournament.division;


    /* =========================================
       BRAND CLASS
       ========================================= */

    const page =
        document.querySelector(".torneoroad-page");

    page.classList.remove(
        "raw",
        "smackdown",
        "nxt"
    );

    page.classList.add(
        tournament.brand.toLowerCase()
    );


} else {

    /* =========================================
       INVALID TOURNAMENT
       ========================================= */

    brandElement.textContent = "MI WRESTLING";

    titleElement.textContent =
        "TOURNAMENT NOT FOUND";

    divisionElement.textContent = "";

}

/* =========================================
   DRAFT
   ========================================= */

const draftContainer =
    document.getElementById("draft-container");

const currentData =
    tournamentData[tournamentId];

if (currentData) {

    draftContainer.innerHTML = "";

    currentData.participants.forEach((wrestler, index) => {

        const card = document.createElement("div");

        card.className = "draft-card";

        card.innerHTML = `

            <span class="draft-card-number">
                ${index + 1}
            </span>

            <span class="draft-card-name">
                ${wrestler}
            </span>

        `;

        draftContainer.appendChild(card);

    });

} else {

    draftContainer.innerHTML = `

        <div class="draft-card">
            <span class="draft-card-name">
                PARTICIPANTS COMING SOON
            </span>
        </div>

    `;

}


/* =========================================
   STANDINGS
   ========================================= */

/* =========================================
   STANDINGS
   ========================================= */

const standingsBody =
    document.getElementById("standings-body");

if (currentData) {

    const standings = {};

    currentData.participants.forEach(wrestler => {

        standings[wrestler] = {
            played: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            points: 0
        };

    });


    currentData.matches.forEach(match => {

        const wrestler1 =
            standings[match.wrestler1];

        const wrestler2 =
            standings[match.wrestler2];


        wrestler1.played++;
        wrestler2.played++;


        if (match.score1 > match.score2) {

            wrestler1.wins++;
            wrestler1.points += 3;

            wrestler2.losses++;

        }

        else if (match.score1 < match.score2) {

            wrestler2.wins++;
            wrestler2.points += 3;

            wrestler1.losses++;

        }

        else {

            wrestler1.draws++;
            wrestler2.draws++;

            wrestler1.points++;
            wrestler2.points++;

        }

    });


    const sortedStandings =
        Object.entries(standings)
        .sort((a, b) => {

            if (b[1].points !== a[1].points) {
                return b[1].points - a[1].points;
            }

            return b[1].wins - a[1].wins;

        });


    standingsBody.innerHTML = "";


    sortedStandings.forEach(
        ([wrestler, stats], index) => {

            const row =
                document.createElement("tr");

            row.innerHTML = `

                <td>${index + 1}</td>

                <td>${wrestler}</td>

                <td>${stats.played}</td>

                <td>${stats.wins}</td>

                <td>${stats.draws}</td>

                <td>${stats.losses}</td>

                <td>${stats.points}</td>

            `;

            standingsBody.appendChild(row);

        }
    );

} else {

    standingsBody.innerHTML = `

        <tr>
            <td colspan="7">
                STANDINGS COMING SOON
            </td>
        </tr>

    `;

}


/* =========================================
   MATCH MATRIX
   ========================================= */

const matrixTable =
    document.getElementById("matrix-table");

if (currentData) {

    const participants =
        currentData.participants;

    matrixTable.innerHTML = "";


    /* HEADER */

    const headerRow =
        document.createElement("tr");

    headerRow.innerHTML =
        `<th>WRESTLER</th>` +
        participants
            .map(wrestler => `<th>${wrestler}</th>`)
            .join("");

    matrixTable.appendChild(headerRow);


    /* ROWS */

    participants.forEach(wrestler => {

        const row =
            document.createElement("tr");

        let html =
            `<td>${wrestler}</td>`;


        participants.forEach(opponent => {

            if (wrestler === opponent) {

                html += `<td class="matrix-empty">—</td>`;

                return;

            }


            const match =
                currentData.matches.find(match =>

                    (
                        match.wrestler1 === wrestler &&
                        match.wrestler2 === opponent
                    )

                    ||

                    (
                        match.wrestler1 === opponent &&
                        match.wrestler2 === wrestler
                    )

                );


            if (!match) {

                html += `
                    <td class="matrix-empty">
                        —
                    </td>
                `;

                return;

            }


            let result;

            if (match.wrestler1 === wrestler) {

                if (match.score1 > match.score2) {
                    result = "W";
                }
                else if (match.score1 < match.score2) {
                    result = "L";
                }
                else {
                    result = "D";
                }

            } else {

                if (match.score2 > match.score1) {
                    result = "W";
                }
                else if (match.score2 < match.score1) {
                    result = "L";
                }
                else {
                    result = "D";
                }

            }


            const className =
                result === "W"
                    ? "matrix-win"
                    : result === "L"
                        ? "matrix-loss"
                        : "matrix-draw";


            html += `
                <td class="${className}">
                    ${result}
                </td>
            `;

        });


        row.innerHTML = html;

        matrixTable.appendChild(row);

    });

}


/* =========================================
   RESULTS
   ========================================= */

/* =========================================
   RESULTS
   ========================================= */

const resultsContainer =
    document.getElementById("results-container");

if (currentData) {

    resultsContainer.innerHTML = "";

    currentData.matches.forEach((match, index) => {

        const resultCard =
            document.createElement("div");

        resultCard.className = "result-card";

        resultCard.innerHTML = `

            <div class="result-wrestler">
                ${match.wrestler1}
            </div>

            <div class="result-score">
                ${match.score1} - ${match.score2}
            </div>

            <div class="result-wrestler">
                ${match.wrestler2}
            </div>

        `;

        resultsContainer.appendChild(resultCard);

    });

} else {

    resultsContainer.innerHTML = `

        <div class="result-card">

            <div class="result-wrestler">
                RESULTS COMING SOON
            </div>

        </div>

    `;

}
