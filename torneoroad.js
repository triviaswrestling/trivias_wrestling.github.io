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

};


/* =========================================
   WRESTLER IMAGES
   ========================================= */

const wrestlerImages = {

    "Axiom": "images/Vacante.jpg",
    "Bret Hart": "images/Vacante.jpg",
    "Jacob Fatu": "images/Vacante.jpg",
    "Kyle O'Reilly": "images/Vacante.jpg",
    "Cody Rhodes": "images/Vacante.jpg",
    "Trick Williams": "images/Vacante.jpg",
    "Bron Breakker": "images/Vacante.jpg",
    "Jon Moxley": "images/Vacante.jpg"

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

const currentData = tournamentData[tournamentId];


/* =========================================
   ELEMENTS
   ========================================= */

const brandElement =
    document.getElementById("tournament-brand");

const titleElement =
    document.getElementById("tournament-title");

const divisionElement =
    document.getElementById("tournament-division");

const draftContainer =
    document.getElementById("draft-container");

const standingsBody =
    document.getElementById("standings-body");

const matrixTable =
    document.getElementById("matrix-table");

const resultsContainer =
    document.getElementById("results-container");


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

    brandElement.textContent =
        "MI WRESTLING";

    titleElement.textContent =
        "TOURNAMENT NOT FOUND";

    divisionElement.textContent =
        "";

}


/* =========================================
   DRAFT
   ========================================= */

if (currentData) {

    draftContainer.innerHTML = "";


    currentData.participants.forEach(
    (wrestler) => {

        const card =
            document.createElement("div");

        card.className =
            "draft-card";

        card.innerHTML = `

            <img
                class="draft-card-image"
                src="${wrestlerImages[wrestler]}"
                alt="${wrestler}"
            >

            <span class="draft-card-name">
                ${wrestler}
            </span>

        `;

        draftContainer.appendChild(card);

    }
);

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

if (currentData) {

    const standings = {};


    /* CREATE WRESTLERS */

    currentData.participants.forEach(
        wrestler => {

            standings[wrestler] = {

                played: 0,
                wins: 0,
                draws: 0,
                losses: 0,
                points: 0

            };

        }
    );


    /* CALCULATE MATCHES */

    currentData.matches.forEach(
        match => {

            const wrestler1 =
                standings[match.wrestler1];

            const wrestler2 =
                standings[match.wrestler2];


            if (!wrestler1 || !wrestler2) {
                return;
            }


            wrestler1.played++;
            wrestler2.played++;


            /* WIN */

            if (match.score1 > match.score2) {

                wrestler1.wins++;
                wrestler1.points += 3;

                wrestler2.losses++;

            }


            /* LOSS */

            else if (match.score1 < match.score2) {

                wrestler2.wins++;
                wrestler2.points += 3;

                wrestler1.losses++;

            }


            /* DRAW */

            else {

                wrestler1.draws++;
                wrestler2.draws++;

                wrestler1.points++;
                wrestler2.points++;

            }

        }
    );


    /* =========================================
       SCORE DIFFERENCE
       ========================================= */

    function getScoreDifference(wrestler) {

        let difference = 0;


        currentData.matches.forEach(
            match => {

                if (
                    match.wrestler1 === wrestler
                ) {

                    difference +=
                        match.score1 -
                        match.score2;

                }


                if (
                    match.wrestler2 === wrestler
                ) {

                    difference +=
                        match.score2 -
                        match.score1;

                }

            }
        );


        return difference;

    }


    /* =========================================
       SORT STANDINGS
       ========================================= */

    const sortedStandings =
        Object.entries(standings)
        .sort((a, b) => {

            /* POINTS */

            if (
                b[1].points !==
                a[1].points
            ) {

                return (
                    b[1].points -
                    a[1].points
                );

            }


            /* WINS */

            if (
                b[1].wins !==
                a[1].wins
            ) {

                return (
                    b[1].wins -
                    a[1].wins
                );

            }


            /* SCORE DIFFERENCE */

            return (
                getScoreDifference(b[0]) -
                getScoreDifference(a[0])
            );

        });


    /* =========================================
       RENDER STANDINGS
       ========================================= */

    standingsBody.innerHTML = "";


    sortedStandings.forEach(
        ([wrestler, stats], index) => {

            const row =
                document.createElement("tr");


            /* CHAMPION */

            if (index === 0) {

                row.classList.add(
                    "champion"
                );

            }


            /* RELEGATION */

            if (
                index ===
                sortedStandings.length - 1
            ) {

                row.classList.add(
                    "relegation"
                );

            }


            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${wrestler}
                </td>

                <td>
                    ${stats.played}
                </td>

                <td>
                    ${stats.wins}
                </td>

                <td>
                    ${stats.draws}
                </td>

                <td>
                    ${stats.losses}
                </td>

                <td>
                    ${stats.points}
                </td>

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

if (currentData) {

    const participants =
        currentData.participants;


    matrixTable.innerHTML = "";


    /* =========================================
       HEADER
       ========================================= */

    const headerRow =
        document.createElement("tr");


    let headerHTML =
        "<th>WRESTLER</th>";


    participants.forEach(
        wrestler => {

            headerHTML += `

                <th>
                    ${wrestler}
                </th>

            `;

        }
    );


    headerRow.innerHTML =
        headerHTML;


    matrixTable.appendChild(
        headerRow
    );


    /* =========================================
       MATRIX ROWS
       ========================================= */

    participants.forEach(
        wrestler => {

            const row =
                document.createElement("tr");


            let html = `

                <td>
                    ${wrestler}
                </td>

            `;


            participants.forEach(
                opponent => {


                    /* SAME WRESTLER */

                    if (
                        wrestler === opponent
                    ) {

                        html += `

                            <td class="matrix-empty">
                                —
                            </td>

                        `;

                        return;

                    }


                    /* FIND MATCH */

                    const match =
                        currentData.matches.find(
                            match =>

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


                    /* NO MATCH */

                    if (!match) {

                        html += `

                            <td class="matrix-empty">
                                —
                            </td>

                        `;

                        return;

                    }


                    /* =================================
                       DETERMINE RESULT
                       ================================= */

                    let result;


                    if (
                        match.wrestler1 === wrestler
                    ) {

                        if (
                            match.score1 >
                            match.score2
                        ) {

                            result = "W";

                        }

                        else if (
                            match.score1 <
                            match.score2
                        ) {

                            result = "L";

                        }

                        else {

                            result = "D";

                        }

                    }

                    else {

                        if (
                            match.score2 >
                            match.score1
                        ) {

                            result = "W";

                        }

                        else if (
                            match.score2 <
                            match.score1
                        ) {

                            result = "L";

                        }

                        else {

                            result = "D";

                        }

                    }


                    /* =================================
                       RESULT CLASS
                       ================================= */

                    let className;


                    if (result === "W") {

                        className =
                            "matrix-win";

                    }

                    else if (result === "L") {

                        className =
                            "matrix-loss";

                    }

                    else {

                        className =
                            "matrix-draw";

                    }


                    html += `

                        <td class="${className}">
                            ${result}
                        </td>

                    `;

                }
            );


            row.innerHTML =
                html;


            matrixTable.appendChild(
                row
            );

        }
    );

} else {

    matrixTable.innerHTML = `

        <tr>

            <td>
                MATRIX COMING SOON
            </td>

        </tr>

    `;

}


/* =========================================
   RESULTS
   ========================================= */

if (currentData) {

    resultsContainer.innerHTML = "";


    currentData.matches.forEach(
        match => {

            const resultCard =
                document.createElement("div");


            resultCard.className =
                "result-card";


            resultCard.innerHTML = `

                <div class="result-wrestler">
                    ${match.wrestler1}
                </div>

                <div class="result-score">
                    ${match.score1}
                    -
                    ${match.score2}
                </div>

                <div class="result-wrestler">
                    ${match.wrestler2}
                </div>

            `;


            resultsContainer.appendChild(
                resultCard
            );

        }
    );

} else {

    resultsContainer.innerHTML = `

        <div class="result-card">

            <div class="result-wrestler">
                RESULTS COMING SOON
            </div>

        </div>

    `;

}
