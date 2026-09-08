/* =========================================
   MI WRESTLING
   RECORDS
   ========================================= */


/* =========================================
   WRESTLER RECORDS DATABASE
   ========================================= */

const wrestlerRecords = [

    {
        id: "axiom",
        name: "Axiom",
        wins: 70,
        losses: 0,
        draws: 0
    },

    {
        id: "adam-cole",
        name: "Adam Cole",
        wins: 0,
        losses: 0,
        draws: 0
    },

    {
        id: "jeff-jarrett",
        name: "Jeff Jarrett",
        wins: 0,
        losses: 0,
        draws: 0
    },

    {
        id: "alberto-del-rio",
        name: "Alberto Del Rio",
        wins: 0,
        losses: 0,
        draws: 0
    }

];


/* =========================================
   ELEMENT
   ========================================= */

const recordsContainer =
    document.getElementById(
        "records-container"
    );


/* =========================================
   RENDER RECORDS
   ========================================= */

function renderRecords(recordList) {

    recordsContainer.innerHTML = "";


    if (recordList.length === 0) {

        recordsContainer.innerHTML = `

            <div class="record-card">

                <div class="record-name">
                    NO WRESTLERS FOUND
                </div>

            </div>

        `;

        return;

    }


    recordList.forEach(wrestler => {

        const card =
            document.createElement("div");


        card.className =
            "record-card";


        card.innerHTML = `

            <div class="record-name">
                ${wrestler.name}
            </div>


            <div class="record-result">

                <span class="record-label">
                    RECORD
                </span>

                <span class="record-value">
                    ${wrestler.wins} - ${wrestler.losses} - ${wrestler.draws}
                </span>

            </div>

        `;


        /* =================================
           OPEN WRESTLER RECORD
           ================================= */

        card.addEventListener(
            "click",
            () => {

                window.location.href =
                    `record.html?id=${wrestler.id}`;

            }
        );


        recordsContainer.appendChild(card);

    });

}


/* =========================================
   SEARCH
   ========================================= */

const searchInput =
    document.getElementById(
        "record-search"
    );


searchInput.addEventListener(
    "input",
    () => {

        const search =
            searchInput.value
                .trim()
                .toLowerCase();


        const filteredRecords =
            wrestlerRecords.filter(
                wrestler =>
                    wrestler.name
                        .toLowerCase()
                        .includes(search)
            );


        renderRecords(
            filteredRecords
        );

    }
);


/* =========================================
   INITIAL RENDER
   ========================================= */

renderRecords(
    wrestlerRecords
);
