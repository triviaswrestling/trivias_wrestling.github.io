console.log("TORNEOROAD.JS CARGADO");


// =========================================
// TORNEO SELECCIONADO
// =========================================

const params = new URLSearchParams(window.location.search);

const tournamentId = params.get("id");


// =========================================
// ELEMENTOS DE LA PÁGINA
// =========================================

const tournamentBrand =
    document.getElementById("tournament-brand");

const tournamentTitle =
    document.getElementById("tournament-title");

const tournamentDivision =
    document.getElementById("tournament-division");


// =========================================
// DATOS DEL TORNEO
// =========================================

const tournamentData = {

    // FIRST DIVISION
    "raw-25": {
        brand: "RAW",
        number: 25,
        division: "FIRST DIVISION"
    },

    "smackdown-25": {
        brand: "SMACKDOWN",
        number: 25,
        division: "FIRST DIVISION"
    },

    "raw-24": {
        brand: "RAW",
        number: 24,
        division: "FIRST DIVISION"
    },

    "smackdown-24": {
        brand: "SMACKDOWN",
        number: 24,
        division: "FIRST DIVISION"
    },

    // SECOND DIVISION
    "nxt-15": {
        brand: "NXT",
        number: 15,
        division: "SECOND DIVISION"
    },

    "nxt-14": {
        brand: "NXT",
        number: 14,
        division: "SECOND DIVISION"
    }

};


// =========================================
// MOSTRAR TORNEO
// =========================================

function loadTournament() {

    if (!tournamentId) {

        tournamentTitle.textContent =
            "TOURNAMENT";

        return;
    }


    const tournament =
        tournamentData[tournamentId];


    if (!tournament) {

        tournamentTitle.textContent =
            "TOURNAMENT NOT FOUND";

        return;
    }


    tournamentBrand.textContent =
        tournament.brand;


    tournamentTitle.textContent =
        `TOURNAMENT ${tournament.number}`;


    tournamentDivision.textContent =
        tournament.division;


    // Color de la página

    const page =
