/* =========================================
   MI WRESTLING
   RECORDS
   ========================================= */

const wrestlerRecords = wrestlers.map(wrestler => {

    let wins = 0;
    let losses = 0;
    let draws = 0;

    const slug = name =>
        String(name)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

    const wrestlerId = slug(wrestler.name);

    function participants(result) {
        let list = [];

        if (result.wrestler1) list.push(result.wrestler1);
        if (result.wrestler2) list.push(result.wrestler2);

        if (Array.isArray(result.team1))
            list.push(...result.team1.flat());

        if (Array.isArray(result.team2))
            list.push(...result.team2.flat());

        if (Array.isArray(result.participants))
            list.push(...result.participants);

        return [...new Set(list.filter(Boolean))];
    }

    function isThisWrestler(name) {
        return name && slug(name) === wrestlerId;
    }

    function outcome(result) {

        const people = participants(result);

        if (!people.some(isThisWrestler))
            return null;

        if (result.winner) {
            return isThisWrestler(result.winner)
                ? "WIN"
                : "LOSS";
        }

        if (
            Array.isArray(result.participants) &&
            Array.isArray(result.scores) &&
            result.participants.length === result.scores.length
        ) {

            const scores = result.scores.map(Number);

            if (scores.some(isNaN))
                return null;

            const highest = Math.max(...scores);

            const winnerIndexes = [];

            scores.forEach((score, index) => {
                if (score === highest)
                    winnerIndexes.push(index);
            });

            const thisIndex =
                result.participants.findIndex(isThisWrestler);

            if (winnerIndexes.length !== 1) {
                return winnerIndexes.includes(thisIndex)
                    ? "WIN"
                    : "DRAW";
            }

            return isThisWrestler(
                result.participants[winnerIndexes[0]]
            )
                ? "WIN"
                : "LOSS";
        }

        if (
            result.score1 === undefined ||
            result.score2 === undefined
        )
            return null;

        const a = Number(result.score1);
        const b = Number(result.score2);

        if (result.wrestler1 && isThisWrestler(result.wrestler1)) {
            if (a > b) return "WIN";
            if (a < b) return "LOSS";
            return "DRAW";
        }

        if (result.wrestler2 && isThisWrestler(result.wrestler2)) {
            if (b > a) return "WIN";
            if (b < a) return "LOSS";
            return "DRAW";
        }

        if (
            Array.isArray(result.team1) &&
            result.team1.flat().some(isThisWrestler)
        ) {
            if (a > b) return "WIN";
            if (a < b) return "LOSS";
            return "DRAW";
        }

        if (
            Array.isArray(result.team2) &&
            result.team2.flat().some(isThisWrestler)
        ) {
            if (b > a) return "WIN";
            if (b < a) return "LOSS";
            return "DRAW";
        }

        return null;
    }

    Object.values(eventData || {}).forEach(event => {
        (event.results || []).forEach(result => {

            const resultOutcome = outcome(result);

            if (resultOutcome === "WIN") wins++;
            if (resultOutcome === "LOSS") losses++;
            if (resultOutcome === "DRAW") draws++;

        });
    });

    return {
        id: wrestlerId,
        name: wrestler.name,
        brand: wrestler.brand || "NO BRAND",
        wins,
        losses,
        draws
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

    const start =
        (currentPage - 1) * wrestlersPerPage;

    const end =
        start + wrestlersPerPage;

    const pageRecords =
        recordList.slice(start, end);

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
                    ${wrestler.draws} -
                    ${wrestler.losses}
                </span>

            </div>

        `;

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

        if (i === currentPage)
            button.classList.add("active");

        button.dataset.page = i;

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

    const totalPages =
        Math.max(
            1,
            Math.ceil(
                filteredRecords.length /
                wrestlersPerPage
            )
        );

    if (currentPage > totalPages)
        currentPage = totalPages;

    renderRecords(filteredRecords);

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
