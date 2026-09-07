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

draftContainer.innerHTML = `

    <div class="draft-card">
        <span class="draft-card-name">
            PARTICIPANTS COMING SOON
        </span>
    </div>

`;


/* =========================================
   STANDINGS
   ========================================= */

const standingsBody =
    document.getElementById("standings-body");

standingsBody.innerHTML = `

    <tr>
        <td colspan="7">
            STANDINGS COMING SOON
        </td>
    </tr>

`;


/* =========================================
   MATCH MATRIX
   ========================================= */

const matrixTable =
    document.getElementById("matrix-table");

matrixTable.innerHTML = `

    <tr>
        <th>WRESTLER</th>
        <th>STATUS</th>
    </tr>

    <tr>
        <td>—</td>
        <td>COMING SOON</td>
    </tr>

`;


/* =========================================
   RESULTS
   ========================================= */

const resultsContainer =
    document.getElementById("results-container");

resultsContainer.innerHTML = `

    <div class="result-card">

        <div class="result-wrestler">
            RESULTS COMING SOON
        </div>

    </div>

`;
