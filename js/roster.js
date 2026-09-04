console.log("ROSTER.JS CARGADO");
const rosterContainer = document.getElementById("roster");
const nxtRosterContainer = document.getElementById("nxt-roster");


function createWrestlerCard(wrestler, index) {

    const card = document.createElement("div");

    card.className = "wrestler";

if (wrestler.brand) {
    card.classList.add(
        wrestler.brand.toLowerCase().replace(" ", "-")
    );
}

    card.onclick = function () {
        openModal(index);
    };


    const image = document.createElement("img");

    image.src = wrestler.image;
    image.alt = wrestler.name;


    const nickname = document.createElement("p");

    nickname.textContent = wrestler.nickname || "";


    const name = document.createElement("h2");

    name.textContent = wrestler.name;


    const stable = document.createElement("p");

    stable.textContent = wrestler.stable || "";


    const record2026 = document.createElement("div");

    record2026.className = "record";

    record2026.innerHTML =
        "<span>2026 Overall</span>" +
        "<strong>" + wrestler.overall2026 + "</strong>";


    const careerRecord = document.createElement("div");

    careerRecord.className = "record";

    careerRecord.innerHTML =
        "<span>Career Overall</span>" +
        "<strong>" + wrestler.careerOverall + "</strong>";


    card.appendChild(image);
    card.appendChild(nickname);
    card.appendChild(name);
    card.appendChild(stable);
    card.appendChild(record2026);
    card.appendChild(careerRecord);


    return card;
}


/* =========================================
   LOAD MAIN ROSTER
   ========================================= */

function loadMainRoster(status) {

    if (!rosterContainer) {
        return;
    }


    rosterContainer.innerHTML = "";


    wrestlers.forEach(function (wrestler, index) {

        if (
            wrestler.status === status &&
            wrestler.division !== "NXT"
        ) {

            const card = createWrestlerCard(wrestler, index);

            rosterContainer.appendChild(card);
        }

    });
}


/* =========================================
   LOAD NXT ROSTER
   ========================================= */

function loadNXTRoster(status) {

    if (!nxtRosterContainer) {
        return;
    }


    nxtRosterContainer.innerHTML = "";


    wrestlers.forEach(function (wrestler, index) {

        if (
            wrestler.status === status &&
            wrestler.division === "NXT"
        ) {

            const card = createWrestlerCard(wrestler, index);

            nxtRosterContainer.appendChild(card);
        }

    });
}


/* =========================================
   LOAD ROSTERS
   ========================================= */

const main = document.querySelector("main");


if (main) {

    const status = main.dataset.rosterStatus;

    loadMainRoster(status);

    loadNXTRoster(status);

}
