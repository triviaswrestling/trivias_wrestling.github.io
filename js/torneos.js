console.log("TORNEOS.JS CARGADO");


/* =========================================
   MI WRESTLING
   TOURNAMENT SYSTEM
   ========================================= */


/* =========================================
   TOURNAMENT DATA
   ========================================= */

const tournaments = [];


/* =========================================
   FIRST DIVISION
   RAW + SMACKDOWN
   25 → 1
   ========================================= */

for (let number = 25; number >= 1; number--) {

    tournaments.push({

        id: `raw-${number}`,
        number: number,
        brand: "RAW",
        division: "First Division",
        title: `Tournament ${number}`,
        image: `images/raw${number}.jpg`

    });


    tournaments.push({

        id: `smackdown-${number}`,
        number: number,
        brand: "SMACKDOWN",
        division: "First Division",
        title: `Tournament ${number}`,
        image: `images/smackdown${number}.jpg`

    });

}


/* =========================================
   SECOND DIVISION
   NXT
   18 → 1
   ========================================= */

for (let number = 18; number >= 1; number--) {

    tournaments.push({

        id: `nxt-${number}`,
        number: number,
        brand: "NXT",
        division: "Second Division",
        title: `Tournament ${number}`,
        image: `images/nxt${number}.jpg`

    });

}


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

    card.style.backgroundImage =
        `url("${tournament.image}")`;

    card.dataset.id = tournament.id;


    /* =========================================
       BRAND
       ========================================= */

    card.classList.add(
        tournament.brand.toLowerCase()
    );


    /* =========================================
       CARD CONTENT
       ========================================= */

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
        </div>

    `;


    /* =========================================
       CLICK
       ========================================= */

    card.addEventListener("click", () => {

        window.location.href =
            `torneoroad.html?id=${tournament.id}`;

    });


    /* =========================================
       RETURN CARD
       ========================================= */

    return card;

}


/* =========================================
   RENDER TOURNAMENTS
   ========================================= */

function renderTournaments() {

    if (
        !firstDivisionContainer ||
        !secondDivisionContainer
    ) {

        console.error(
            "Tournament containers not found."
        );

        return;

    }


    firstDivisionContainer.innerHTML = "";

    secondDivisionContainer.innerHTML = "";


    tournaments.forEach(tournament => {

        const card =
            createTournamentCard(tournament);


        if (
            tournament.division === "First Division"
        ) {

            firstDivisionContainer.appendChild(card);

        } else {

            secondDivisionContainer.appendChild(card);

        }

    });

}


/* =========================================
   START
   ========================================= */

renderTournaments();
