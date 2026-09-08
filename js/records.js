/* =========================================
   MI WRESTLING
   RECORDS
   ========================================= */


/* =========================================
   WRESTLER RECORDS DATABASE
   ========================================= */

const wrestlerRecords = wrestlers.map(wrestler => {

    const recordParts =
        wrestler.overall2026
            .split("-")
            .map(part => part.trim());


    return {

        id: wrestler.name
            .toLowerCase()
            .replace(/\s+/g, "-"),

        name: wrestler.name,

        brand: wrestler.brand || "NO BRAND",

        wins: recordParts[0] || "0",

        losses: recordParts[1] || "0",

        draws: recordParts[2] || "0"

    };

});


/* =========================================
   ELEMENTS
   ========================================= */

const recordsContainer =
    document.getElementById("records-container");

const searchInput =
    document.getElementById("record-search");

const filterButtons =
    document.querySelectorAll(".record-filter");

const pagesContainer =
    document.getElementById("record-pages");


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


    /* =====================================
       NO RESULTS
       ===================================== */

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
            wrestler.brand.toUpperCase() ===
            currentBrand;


        return matchesSearch && matchesBrand;

    });

}


/* =========================================
   CREATE PAGE BUTTONS
   ========================================= */

function createPageButtons(totalPages) {

    pagesContainer.innerHTML = "";


    for (let i = 1; i <= totalPages; i++) {

        const button =
            document.createElement("button");


        button.className =
            "record-page";


        if (i === currentPage) {

            button.classList.add("active");

        }


        button.dataset.page =
            i;


        button.textContent =
            `PART ${i}`;


        button.addEventListener(
            "click",
            () => {

                currentPage = i;

                updateRecords();

            }
        );


        pagesContainer.appendChild(button);

    }

}


/* =========================================
   UPDATE RECORDS
   ========================================= */

function updateRecords() {

    const filteredRecords =
        getFilteredRecords();


    /* =====================================
       CALCULATE TOTAL PAGES
       ===================================== */

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                filteredRecords.length /
                wrestlersPerPage
            )
        );


    /* =====================================
       RESET PAGE IF NECESSARY
       ===================================== */

    if (currentPage > totalPages) {

        currentPage =
            totalPages;

    }


    /* =====================================
       RENDER RECORDS
       ===================================== */

    renderRecords(filteredRecords);


    /* =====================================
       CREATE PAGE BUTTONS
       ===================================== */

    createPageButtons(totalPages);

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
   INITIAL RENDER
   ========================================= */

updateRecords();
