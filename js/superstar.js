/* =========================================
   MI WRESTLING
   SUPERSTAR
   ========================================= */

/* GET SUPERSTAR ID */
const urlParams = new URLSearchParams(window.location.search);
const superstarId = urlParams.get("id");


/* =========================================
   SUPERSTAR DATABASE
   ========================================= */

const superstarData = {

    "axiom": {
        name: "Axiom",
        image: "images/Vacante.jpg",
        nickname: "",
        brand: "NXT",

        wins: 0,
        losses: 0,
        draws: 0,

        singles: "0 - 0 - 0",
        tag: "0 - 0 - 0",
        sixMan: "0 - 0 - 0",

        championships: [],

        history: []
    },


    "adam-cole": {
        name: "Adam Cole",
        image: "images/Vacante.jpg",
        nickname: "",
        brand: "RAW",

        wins: 0,
        losses: 0,
        draws: 0,

        singles: "0 - 0 - 0",
        tag: "0 - 0 - 0",
        sixMan: "0 - 0 - 0",

        championships: [],

        history: []
    },


    "jeff-jarrett": {
        name: "Jeff Jarrett",
        image: "images/Vacante.jpg",
        nickname: "",
        brand: "SMACKDOWN",

        wins: 0,
        losses: 0,
        draws: 0,

        singles: "0 - 0 - 0",
        tag: "0 - 0 - 0",
        sixMan: "0 - 0 - 0",

        championships: [],

        history: []
    },


    "alberto-del-rio": {
        name: "Alberto Del Rio",
        image: "images/Vacante.jpg",
        nickname: "El Patron",
        brand: "RAW",

        wins: 0,
        losses: 0,
        draws: 0,

        singles: "0 - 0 - 0",
        tag: "0 - 0 - 0",
        sixMan: "0 - 0 - 0",

        championships: [],

        history: []
    }

};


/* =========================================
   ELEMENTS
   ========================================= */

const superstarImage =
    document.getElementById("superstar-image");

const superstarName =
    document.getElementById("superstar-name");

const superstarNickname =
    document.getElementById("superstar-nickname");

const superstarBrand =
    document.getElementById("superstar-brand");

const wins =
    document.getElementById("wins");

const losses =
    document.getElementById("losses");

const draws =
    document.getElementById("draws");

const singlesRecord =
    document.getElementById("singles-record");

const tagRecord =
    document.getElementById("tag-record");

const sixManRecord =
    document.getElementById("six-man-record");

const championshipsContainer =
    document.getElementById("championships");

const matchHistoryContainer =
    document.getElementById("match-history");


/* =========================================
   SUPERSTAR NOT FOUND
   ========================================= */

if (!superstarId || !superstarData[superstarId]) {

    superstarName.textContent = "SUPERSTAR NOT FOUND";

    superstarNickname.textContent = "";
    superstarBrand.textContent = "";

    superstarImage.src = "images/Vacante.jpg";

    wins.textContent = "0";
    losses.textContent = "0";
    draws.textContent = "0";

    singlesRecord.textContent = "0 - 0 - 0";
    tagRecord.textContent = "0 - 0 - 0";
    sixManRecord.textContent = "0 - 0 - 0";

    championshipsContainer.innerHTML = `
        <p>SUPERSTAR DOES NOT EXIST</p>
    `;

    matchHistoryContainer.innerHTML = `
        <p>NO MATCHES</p>
    `;
}


/* =========================================
   LOAD SUPERSTAR
   ========================================= */

else {

    const superstar = superstarData[superstarId];


    /* BASIC INFORMATION */

    superstarName.textContent =
        superstar.name;

    superstarImage.src =
        superstar.image;

    superstarImage.alt =
        superstar.name;


    /* NICKNAME */

    if (superstar.nickname) {

        superstarNickname.textContent =
            `"${superstar.nickname}"`;

    } else {

        superstarNickname.textContent = "";

    }


    /* BRAND */

    superstarBrand.textContent =
        superstar.brand;


    /* =========================================
       OVERALL RECORD
       ========================================= */

    wins.textContent =
        superstar.wins;

    losses.textContent =
        superstar.losses;

    draws.textContent =
        superstar.draws;


    /* =========================================
       MATCH RECORD
       ========================================= */

    singlesRecord.textContent =
        superstar.singles;

    tagRecord.textContent =
        superstar.tag;

    sixManRecord.textContent =
        superstar.sixMan;


    /* =========================================
       CHAMPIONSHIPS
       ========================================= */

    championshipsContainer.innerHTML = "";

    if (superstar.championships.length === 0) {

        championshipsContainer.innerHTML = `
            <p>NO CHAMPIONSHIPS</p>
        `;

    } else {

        superstar.championships.forEach(championship => {

            const championshipElement =
                document.createElement("div");

            championshipElement.className =
                "championship-item";

            championshipElement.textContent =
                championship;

            championshipsContainer.appendChild(
                championshipElement
            );

        });

    }


    /* =========================================
       MATCH HISTORY
       ========================================= */

    matchHistoryContainer.innerHTML = "";

    if (superstar.history.length === 0) {

        matchHistoryContainer.innerHTML = `
            <p>NO MATCHES</p>
        `;

    } else {

        superstar.history.forEach(match => {

            const matchElement =
                document.createElement("div");

            matchElement.className =
                "history-match";

            matchElement.innerHTML = `
                <strong>${match.event}</strong>
                <span>${match.match}</span>
                <span>${match.result}</span>
            `;

            matchHistoryContainer.appendChild(
                matchElement
            );

        });

    }

}
