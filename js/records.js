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
        brand: "NXT",
        wins: 0,
        losses: 0,
        draws: 0
    },

    {
        id: "adam-cole",
        name: "Adam Cole",
        brand: "RAW",
        wins: 0,
        losses: 0,
        draws: 0
    },

    {
        id: "jeff-jarrett",
        name: "Jeff Jarrett",
        brand: "SMACKDOWN",
        wins: 0,
        losses: 0,
        draws: 0
    },

    {
        id: "alberto-del-rio",
        name: "Alberto Del Rio",
        brand: "RAW",
        wins: 0,
        losses: 0,
        draws: 0
    }

];


/* =========================================
   ELEMENTS
   ========================================= */

const recordsContainer =
    document.getElementById("records-container");

const searchInput =
    document.getElementById("record-search");

const filterButtons =
    document.querySelectorAll(".record-filter");

const pageButtons =
    document.querySelectorAll(".record-page");


/* =========================================
   SETTINGS
   ========================================= */

const wrestlersPerPage = 20;

let currentPage = 1;

let currentBrand = "ALL";


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


    /* =====================================
       PAGINATION
       ===================================== */

    const start =
        (currentPage - 1) * wrestlersPerPage;

    const end =
        start + wrestlersPerPage;

    const pageRecords =
        recordList.slice(start, end);


    /* =====================================
       CREATE CARDS
       ===================================== */

    pageRecords.forEach(wrestler => {

        const card =
            document.createElement("div");

        card.className =
            "record-card";


        card.innerHTML = `

            <div class="record-top">

                <div class="record-name">
                    ${wrestler.name}
                </div>

                <div class="record-brand">
                    ${wrestler.brand}
                </div>

            </div>

            <div class="record-result">

                <span class="record-label">
                    RECORD
                </span>

                <span class="record-value">
                    ${wrestler.wins} -
                    ${wrestler.losses} -
                    ${wrestler.draws}
                </span>

            </div>

        `;


        /* =================================
           OPEN SUPERSTAR
           ================================= */

        card.addEventListener("click", () => {

            window.location.href =
                `superstar.html?id=${wrestler.id}`;

        });


        recordsContainer.appendChild(card);

    });

}


/* =========================================
   FILTER RECORDS
   ========================================= */

function getFilteredRecords() {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    return wrestlerRecords.filter(wrestler => {

        const matchesSearch =
            wrestler.name
                .toLowerCase()
                .includes(search);


        const matchesBrand =
            currentBrand === "ALL" ||
            wrestler.brand === currentBrand;


        return matchesSearch && matchesBrand;

    });

}


/* =========================================
   UPDATE RECORDS
   ========================================= */

function updateRecords() {

    const filteredRecords =
        getFilteredRecords();


    /* =====================================
       RESET PAGE IF NECESSARY
       ===================================== */

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                filteredRecords.length /
                wrestlersPerPage
            )
        );


    if (currentPage > totalPages) {

        currentPage =
            totalPages;

    }


    renderRecords(filteredRecords);


    updatePageButtons(totalPages);

}


/* =========================================
   PAGE BUTTONS
   ========================================= */

function updatePageButtons(totalPages) {

    pageButtons.forEach(button => {

        const page =
            Number(button.dataset.page);


        button.classList.remove("active");


        if (page === currentPage) {

            button.classList.add("active");

        }


        /* Hide pages that don't exist */

        if (page > totalPages) {

            button.style.display =
                "none";

        } else {

            button.style.display =
                "";

        }

    });

}


/* =========================================
   SEARCH
   ========================================= */

searchInput.addEventListener(
    "input",
    () => {

        currentPage = 1;

        updateRecords();

    }
);


/* =========================================
   BRAND FILTER
   ========================================= */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            currentBrand =
                button.dataset.brand;


            currentPage = 1;


            filterButtons.forEach(filter => {

                filter.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );


            updateRecords();

        }
    );

});


/* =========================================
   PART BUTTONS
   ========================================= */

pageButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            currentPage =
                Number(
                    button.dataset.page
                );


            pageButtons.forEach(page => {

                page.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );


            updateRecords();

        }
    );

});


/* =========================================
   INITIAL RENDER
   ========================================= */

updateRecords();
