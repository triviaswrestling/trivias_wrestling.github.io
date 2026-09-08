/* =========================================
   MI WRESTLING
   TOURNAMENT ROAD
   ========================================= */


/* =========================================
   GET TOURNAMENT ID
   ========================================= */

const urlParams = new URLSearchParams(
    window.location.search
);

const tournamentId =
    urlParams.get("id");


/* =========================================
   TOURNAMENT DATABASE
   ========================================= */

const tournaments = [];


/* =========================================
   FIRST DIVISION
   RAW + SMACKDOWN
   ========================================= */

for (let number = 25; number >= 1; number--) {

    tournaments.push({

        id:
            `raw-${number}`,

        number:
            number,

        brand:
            "RAW",

        division:
            "FIRST DIVISION",

        title:
            `TOURNAMENT ${number}`

    });


    tournaments.push({

        id:
            `smackdown-${number}`,

        number:
            number,

        brand:
            "SMACKDOWN",

        division:
            "FIRST DIVISION",

        title:
            `TOURNAMENT ${number}`

    });

}


/* =========================================
   SECOND DIVISION
   NXT
   ========================================= */

for (let number = 18; number >= 1; number--) {

    tournaments.push({

        id:
            `nxt-${number}`,

        number:
            number,

        brand:
            "NXT",

        division:
            "SECOND DIVISION",

        title:
            `TOURNAMENT ${number}`

    });

}


/* =========================================
   FIND TOURNAMENT
   ========================================= */

const tournament =
    tournaments.find(item => {

        return item.id === tournamentId;

    });


/* =========================================
   ELEMENTS
   ========================================= */

const tournamentBrand =
    document.getElementById(
        "tournament-brand"
    );

const tournamentTitle =
    document.getElementById(
        "tournament-title"
    );

const tournamentDivision =
    document.getElementById(
        "tournament-division"
    );

const draftContainer =
    document.getElementById(
        "draft-container"
    );

const standingsBody =
    document.getElementById(
        "standings-body"
    );

const matrixTable =
    document.getElementById(
        "matrix-table"
    );

const resultsContainer =
    document.getElementById(
        "results-container"
    );


/* =========================================
   WRESTLER ID
   ========================================= */

function createWrestlerId(name) {

    return name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

}


/* =========================================
   TOURNAMENT NOT FOUND
   ========================================= */

if (!tournament) {

    tournamentBrand.textContent =
        "";

    tournamentTitle.textContent =
        "TOURNAMENT NOT FOUND";

    tournamentDivision.textContent =
        "";

}


/* =========================================
   LOAD TOURNAMENT
   ========================================= */

else {

    /* =====================================
       BASIC INFORMATION
       ===================================== */

    tournamentBrand.textContent =
        tournament.brand;

    tournamentTitle.textContent =
        tournament.title;

    tournamentDivision.textContent =
        tournament.division;


    /* =====================================
       GET TOURNAMENT DATA
       ===================================== */

    const currentData =
        tournamentData[tournamentId];


    /* =====================================
       NO DATA
       ===================================== */

    if (!currentData) {

        draftContainer.innerHTML = `
            <p>
                PARTICIPANTS COMING SOON
            </p>
        `;

        standingsBody.innerHTML = `
            <tr>
                <td colspan="7">
                    STANDINGS COMING SOON
                </td>
            </tr>
        `;

        matrixTable.innerHTML = `
            <tr>
                <td>
                    MATRIX COMING SOON
                </td>
            </tr>
        `;

        resultsContainer.innerHTML = `
            <p>
                RESULTS COMING SOON
            </p>
        `;

    }


    /* =====================================
       DATA EXISTS
       ===================================== */

    else {

        const participants =
            currentData.participants || [];


        const matches =
            currentData.matches || [];


        /* =================================
           DRAFT
           ================================= */

        draftContainer.innerHTML = "";


        if (
            participants.length === 0
        ) {

            draftContainer.innerHTML = `
                <p>
                    NO PARTICIPANTS
                </p>
            `;

        }

        else {

            participants.forEach(name => {

                const wrestler =
                    document.createElement("div");

                wrestler.className =
                    "draft-wrestler";


                wrestler.innerHTML = `

                    <a
                        href="superstar.html?id=${createWrestlerId(name)}"
                        class="wrestler-link"
                    >
                        ${name}
                    </a>

                `;


                draftContainer.appendChild(
                    wrestler
                );

            });

        }


        /* =================================
           STANDINGS DATABASE
           ================================= */

        const standings = {};


        participants.forEach(name => {

            standings[name] = {

                name:
                    name,

                played:
                    0,

                wins:
                    0,

                draws:
                    0,

                losses:
                    0,

                points:
                    0,

                scoreFor:
                    0,

                scoreAgainst:
                    0

            };

        });


        /* =================================
           PROCESS MATCHES
           ================================= */

        matches.forEach(match => {

            const wrestler1 =
                standings[match.wrestler1];

            const wrestler2 =
                standings[match.wrestler2];


            if (
                !wrestler1 ||
                !wrestler2
            ) {

                return;

            }


            wrestler1.played++;
            wrestler2.played++;


            wrestler1.scoreFor +=
                match.score1;

            wrestler1.scoreAgainst +=
                match.score2;


            wrestler2.scoreFor +=
                match.score2;

            wrestler2.scoreAgainst +=
                match.score1;


            /* =============================
               WRESTLER 1 WINS
               ============================= */

            if (
                match.score1 >
                match.score2
            ) {

                wrestler1.wins++;

                wrestler1.points += 3;

                wrestler2.losses++;

            }


            /* =============================
               WRESTLER 2 WINS
               ============================= */

            else if (
                match.score1 <
                match.score2
            ) {

                wrestler2.wins++;

                wrestler2.points += 3;

                wrestler1.losses++;

            }


            /* =============================
               DRAW
               ============================= */

            else {

                wrestler1.draws++;

                wrestler2.draws++;

                wrestler1.points++;

                wrestler2.points++;

            }

        });


        /* =================================
           SORT STANDINGS
           ================================= */

        const standingsList =
            Object.values(standings);


        standingsList.sort((a, b) => {

            if (
                b.points !==
                a.points
            ) {

                return b.points -
                    a.points;

            }


            if (
                b.wins !==
                a.wins
            ) {

                return b.wins -
                    a.wins;

            }


            const differenceA =
                a.scoreFor -
                a.scoreAgainst;


            const differenceB =
                b.scoreFor -
                b.scoreAgainst;


            return differenceB -
                differenceA;

        });


        /* =================================
           RENDER STANDINGS
           ================================= */

        standingsBody.innerHTML = "";


        standingsList.forEach(
            (wrestler, index) => {

                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>
                        ${index + 1}
                    </td>

                    <td>

                        <a
                            href="superstar.html?id=${createWrestlerId(wrestler.name)}"
                            class="table-wrestler-link"
                        >
                            ${wrestler.name}
                        </a>

                    </td>

                    <td>
                        ${wrestler.played}
                    </td>

                    <td>
                        ${wrestler.wins}
                    </td>

                    <td>
                        ${wrestler.draws}
                    </td>

                    <td>
                        ${wrestler.losses}
                    </td>

                    <td>
                        ${wrestler.points}
                    </td>

                `;


                standingsBody.appendChild(
                    row
                );

            }
        );


        /* =================================
           MATCH MATRIX
           ================================= */

        matrixTable.innerHTML = "";


        const headerRow =
            document.createElement("tr");


        headerRow.innerHTML = `
            <th>WRESTLER</th>
        `;


        participants.forEach(name => {

            const th =
                document.createElement("th");

            th.textContent =
                name;

            headerRow.appendChild(th);

        });


        matrixTable.appendChild(
            headerRow
        );


        participants.forEach(
            wrestlerName => {

                const row =
                    document.createElement("tr");


                const nameCell =
                    document.createElement("td");


                nameCell.innerHTML = `

                    <a
                        href="superstar.html?id=${createWrestlerId(wrestlerName)}"
                        class="table-wrestler-link"
                    >
                        ${wrestlerName}
                    </a>

                `;


                row.appendChild(
                    nameCell
                );


                participants.forEach(
                    opponentName => {

                        const cell =
                            document.createElement(
                                "td"
                            );


                        if (
                            wrestlerName ===
                            opponentName
                        ) {

                            cell.textContent =
                                "—";

                            row.appendChild(
                                cell
                            );

                            return;

                        }


                        const match =
                            matches.find(
                                item => {

                                    return (
                                        (
                                            item.wrestler1 ===
                                            wrestlerName &&
                                            item.wrestler2 ===
                                            opponentName
                                        )
                                        ||
                                        (
                                            item.wrestler1 ===
                                            opponentName &&
                                            item.wrestler2 ===
                                            wrestlerName
                                        )
                                    );

                                }
                            );


                        if (!match) {

                            cell.textContent =
                                "·";

                        }

                        else if (
                            match.score1 ===
                            match.score2
                        ) {

                            cell.textContent =
                                "D";

                            cell.classList.add(
                                "matrix-draw"
                            );

                        }

                        else {

                            const wrestlerIsFirst =
                                match.wrestler1 ===
                                wrestlerName;


                            const wrestlerWon =
                                wrestlerIsFirst
                                    ? match.score1 >
                                      match.score2
                                    : match.score2 >
                                      match.score1;


                            if (wrestlerWon) {

                                cell.textContent =
                                    "W";

                                cell.classList.add(
                                    "matrix-win"
                                );

                            }

                            else {

                                cell.textContent =
                                    "L";

                                cell.classList.add(
                                    "matrix-loss"
                                );

                            }

                        }


                        row.appendChild(
                            cell
                        );

                    }
                );


                matrixTable.appendChild(
                    row
                );

            }
        );


        /* =================================
           RESULTS
           ================================= */

        resultsContainer.innerHTML = "";


        if (
            matches.length === 0
        ) {

            resultsContainer.innerHTML = `
                <p>
                    NO RESULTS
                </p>
            `;

        }

        else {

            matches.forEach(match => {

                const result =
                    document.createElement("div");

                result.className =
                    "tournament-result";


                let resultClass =
                    "draw";


                if (
                    match.score1 >
                    match.score2
                ) {

                    resultClass =
                        "wrestler1-win";

                }

                else if (
                    match.score1 <
                    match.score2
                ) {

                    resultClass =
                        "wrestler2-win";

                }


                result.innerHTML = `

                    <div class="tournament-result-round">
                        ROUND ${match.date}
                    </div>

                    <div class="tournament-result-match">

                        <a
                            href="superstar.html?id=${createWrestlerId(match.wrestler1)}"
                            class="table-wrestler-link"
                        >
                            ${match.wrestler1}
                        </a>

                        <strong>
                            ${match.score1}
                            -
                            ${match.score2}
                        </strong>

                        <a
                            href="superstar.html?id=${createWrestlerId(match.wrestler2)}"
                            class="table-wrestler-link"
                        >
                            ${match.wrestler2}
                        </a>

                    </div>

                `;


                result.classList.add(
                    resultClass
                );


                resultsContainer.appendChild(
                    result
                );

            });

        }

    }

}
