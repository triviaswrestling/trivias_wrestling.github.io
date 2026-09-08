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
   WRESTLER DATABASE
   ========================================= */

const wrestlerDatabase =
    window.wrestlerDatabase || {};


/* =========================================
   GET WRESTLER
   ========================================= */

function getWrestler(name) {

    if (wrestlerDatabase[name]) {

        return wrestlerDatabase[name];

    }

    return {
        image: "images/Vacante.jpg"
    };

}


/* =========================================
   EVENTS DATABASE
   ========================================= */

const eventData = {


    /* =========================================
       WEEKLY 1
       ========================================= */

    "weekly-1": {

        type: "WEEKLY",
        title: "WEEKLY #1",
        date: "06/09/2026",
        brand: "RAW & SMACKDOWN",

        results: [

            {
                match: "MATCH 1",
                type: "SINGLES",
                championship: "",

                wrestler1: [
                    "Axiom"
                ],

                wrestler2: [
                    "Adam Cole"
                ],

                winner: "Axiom"
            },


            {
                match: "MATCH 2",
                type: "SINGLES",
                championship: "WWE CHAMPIONSHIP",

                wrestler1: [
                    "Champion"
                ],

                wrestler2: [
                    "Challenger"
                ],

                winner: "Champion"
            },


            {
                match: "MATCH 3",
                type: "TAG TEAM",
                championship: "",

                wrestler1: [
                    "Jeff Jarrett",
                    "Axiom"
                ],

                wrestler2: [
                    "Alberto Del Rio",
                    "Wrestler A"
                ],

                winner: "Team 1"
            },


            {
                match: "MAIN EVENT",
                type: "6-MAN TAG TEAM",
                championship: "",

                wrestler1: [
                    "Axiom",
                    "Adam Cole",
                    "Jeff Jarrett"
                ],

                wrestler2: [
                    "Alberto Del Rio",
                    "Wrestler E",
                    "Wrestler F"
                ],

                winner: "Team 1"
            }

        ]

    },


    /* =========================================
       WEEKLY 2
       ========================================= */

    "weekly-2": {

        type: "WEEKLY",
        title: "WEEKLY #2",
        date: "13/09/2026",
        brand: "RAW & SMACKDOWN",

        results: [

            {
                match: "MATCH 1",
                type: "SINGLES",
                championship: "",

                wrestler1: [
                    "Wrestler A"
                ],

                wrestler2: [
                    "Wrestler B"
                ],

                winner: "Wrestler A"
            }

        ]

    },


    /* =========================================
       NXT 1
       ========================================= */

    "nxt-1": {

        type: "NXT",
        title: "NXT #1",
        date: "08/09/2026",
        brand: "NXT",

        results: [

            {
                match: "MATCH 1",
                type: "SINGLES",
                championship: "",

                wrestler1: [
                    "Wrestler A"
                ],

                wrestler2: [
                    "Wrestler B"
                ],

                winner: "Wrestler A"
            }

        ]

    },


    /* =========================================
       NXT 2
       ========================================= */

    "nxt-2": {

        type: "NXT",
        title: "NXT #2",
        date: "15/09/2026",
        brand: "NXT",

        results: [

            {
                match: "MATCH 1",
                type: "SINGLES",
                championship: "",

                wrestler1: [
                    "Wrestler C"
                ],

                wrestler2: [
                    "Wrestler D"
                ],

                winner: "Wrestler D"
            }

        ]

    },


    /* =========================================
       SUMMERSLAM 2026
       ========================================= */

    "summerslam-2026": {

        type: "SPECIAL",
        title: "SUMMERSLAM 2026",
        date: "23/08/2026",
        brand: "SPECIAL EVENT",

        results: [

            {
                match: "MATCH 1",
                type: "SINGLES",
                championship: "",

                wrestler1: [
                    "Wrestler A"
                ],

                wrestler2: [
                    "Wrestler B"
                ],

                winner: "Wrestler A"
            },


            {
                match: "WWE CHAMPIONSHIP",
                type: "SINGLES",
                championship: "WWE CHAMPIONSHIP",

                wrestler1: [
                    "Champion"
                ],

                wrestler2: [
                    "Challenger"
                ],

                winner: "Challenger"
            },


            {
                match: "MAIN EVENT",
                type: "6-MAN TAG TEAM",
                championship: "",

                wrestler1: [
                    "Wrestler A",
                    "Wrestler B",
                    "Wrestler C"
                ],

                wrestler2: [
                    "Wrestler D",
                    "Wrestler E",
                    "Wrestler F"
                ],

                winner: "Team 2"
            }

        ]

    },


    /* =========================================
       NIGHT OF CHAMPIONS 2026
       ========================================= */

    "night-of-champions-2026": {

        type: "SPECIAL",
        title: "NIGHT OF CHAMPIONS 2026",
        date: "26/07/2026",
        brand: "SPECIAL EVENT",

        results: [

            {
                match: "CHAMPIONSHIP MATCH",
                type: "SINGLES",
                championship: "CHAMPIONSHIP",

                wrestler1: [
                    "Champion"
                ],

                wrestler2: [
                    "Challenger"
                ],

                winner: "Challenger"
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

            const wrestler =
                getWrestler(name);

            team1HTML += `

                <div class="wrestler">

                    <img
                        src="${wrestler.image}"
                        alt="${name}"
                    >

                    <span>
                        ${name}
                    </span>

                </div>

            `;

        });


        /* =================================
           TEAM 2
           ================================= */

        let team2HTML = "";

        result.wrestler2.forEach(name => {

            const wrestler =
                getWrestler(name);

            team2HTML += `

                <div class="wrestler">

                    <img
                        src="${wrestler.image}"
                        alt="${name}"
                    >

                    <span>
                        ${name}
                    </span>

                </div>

            `;

        });


        /* =================================
           CARD
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
