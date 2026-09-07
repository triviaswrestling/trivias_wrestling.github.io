console.log("TORNEOS.JS CARGADO");


/* =========================================
   MI WRESTLING
   TOURNAMENT SYSTEM
   ========================================= */


/* =========================================
   TOURNAMENT DATA
   ========================================= */

const tournaments = [

    /* =========================================
       FIRST DIVISION
       RAW
       ========================================= */

    {
        id: "raw-1",
        number: 1,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 1"
    },

    {
        id: "raw-2",
        number: 2,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 2"
    },

    {
        id: "raw-3",
        number: 3,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 3"
    },

    {
        id: "raw-4",
        number: 4,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 4"
    },

    {
        id: "raw-5",
        number: 5,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 5"
    },

    {
        id: "raw-6",
        number: 6,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 6"
    },

    {
        id: "raw-7",
        number: 7,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 7"
    },

    {
        id: "raw-8",
        number: 8,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 8"
    },

    {
        id: "raw-9",
        number: 9,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 9"
    },

    {
        id: "raw-10",
        number: 10,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 10"
    },

    {
        id: "raw-11",
        number: 11,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 11"
    },

    {
        id: "raw-12",
        number: 12,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 12"
    },

    {
        id: "raw-13",
        number: 13,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 13"
    },

    {
        id: "raw-14",
        number: 14,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 14"
    },

    {
        id: "raw-15",
        number: 15,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 15"
    },

    {
        id: "raw-16",
        number: 16,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 16"
    },

    {
        id: "raw-17",
        number: 17,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 17"
    },

    {
        id: "raw-18",
        number: 18,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 18"
    },

    {
        id: "raw-19",
        number: 19,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 19"
    },

    {
        id: "raw-20",
        number: 20,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 20"
    },

    {
        id: "raw-21",
        number: 21,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 21"
    },

    {
        id: "raw-22",
        number: 22,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 22"
    },

    {
        id: "raw-23",
        number: 23,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 23"
    },

    {
        id: "raw-24",
        number: 24,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 24"
    },

    {
        id: "raw-25",
        number: 25,
        brand: "RAW",
        division: "First Division",
        title: "Tournament 25"
    },


    /* =========================================
       FIRST DIVISION
       SMACKDOWN
       ========================================= */

    ...Array.from({ length: 25 }, (_, i) => ({
        id: `smackdown-${i + 1}`,
        number: i + 1,
        brand: "SMACKDOWN",
        division: "First Division",
        title: `Tournament ${i + 1}`
    })),


    /* =========================================
       SECOND DIVISION
       NXT
       ========================================= */

    ...Array.from({ length: 15 }, (_, i) => ({
        id: `nxt-${i + 1}`,
        number: i + 1,
        brand: "NXT",
        division: "Second Division",
        title: `Tournament ${i + 1}`
    }))

];


/* =========================================
   CONTAINERS
   ========================================= */

const firstDivisionContainer =
    document.getElementById("first-division-tournaments");

const secondDivisionContainer =
    document.getElementById("second-division-tournaments");


/* =========================================
   CREATE TOURNAMENT CARD
   ========================================= */

function createTournamentCard(tournament) {

    const card = document.createElement("div");

    card.className = "tournament-card";

    card.dataset.id = tournament.id;

    card.innerHTML = `
        <div>

            <div class="tournament-number">
                ${tournament.brand} ${tournament.number}
            </div>

            <h3>
                ${tournament.title}
            </h3>

            <div class="tournament-brand">
                ${tournament.division}
            </div>

        </div>

        <div class="tournament-view">
            VIEW →
