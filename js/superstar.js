/* =========================================
   MI WRESTLING
   SUPERSTAR
   EVENTS + TOURNAMENTS
   ========================================= */


/* =========================================
   GET SUPERSTAR ID
   ========================================= */

const urlParams = new URLSearchParams(
    window.location.search
);

const wrestlerId = urlParams.get("id");


/* =========================================
   ELEMENTS
   ========================================= */

const imageElement =
    document.getElementById("superstar-image");

const nameElement =
    document.getElementById("superstar-name");

const nicknameElement =
    document.getElementById("superstar-nickname");

const brandElement =
    document.getElementById("superstar-brand");

const winsElement =
    document.getElementById("wins");

const lossesElement =
    document.getElementById("losses");

const drawsElement =
    document.getElementById("draws");

const singlesRecordElement =
    document.getElementById("singles-record");

const tagRecordElement =
    document.getElementById("tag-record");

const sixManRecordElement =
    document.getElementById("six-man-record");

const championshipsElement =
    document.getElementById("championships");

const matchHistoryElement =
    document.getElementById("match-history");


/* =========================================
   CREATE ID FROM NAME
   ========================================= */

function createWrestlerId(name) {

    return name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

}


/* =========================================
   NORMALIZE NAME
   ========================================= */

function normalizeName(name) {

    return name
        .toLowerCase()
        .trim();

}


/* =========================================
   FIND WRESTLER
   ========================================= */

const superstar =
    wrestlers.find(wrestler => {

        return createWrestlerId(
            wrestler.name
        ) === wrestlerId;

    });


/* =========================================
   SUPERSTAR NOT FOUND
   ========================================= */

if (!superstar) {

    nameElement.textContent =
        "SUPERSTAR NOT FOUND";

    nicknameElement.textContent = "";

    brandElement.textContent = "";

    matchHistoryElement.innerHTML = `
        <p>
            This superstar does not exist.
        </p>
    `;

}


/* =========================================
   LOAD SUPERSTAR
   ========================================= */

else {

    /* =====================================
       BASIC INFORMATION
       ===================================== */

    imageElement.src =
        superstar.image ||
        "images/Vacante.jpg";

    imageElement.alt =
        superstar.name;

    nameElement.textContent =
        superstar.name;

    nicknameElement.textContent =
        superstar.nickname
            ? superstar.nickname
            : "";

    brandElement.textContent =
        superstar.brand
            ? superstar.brand
            : "NO BRAND";


    /* =====================================
       OVERALL RECORD
       ===================================== */

    const recordParts =
        (superstar.overall2026 || "0 - 0 - 0")
            .split("-")
            .map(part => part.trim());

    const overallWins =
        recordParts[0] || "0";

    const overallLosses =
        recordParts[1] || "0";

    const overallDraws =
        recordParts[2] || "0";


    winsElement.textContent =
        overallWins;

    lossesElement.textContent =
        overallLosses;

    drawsElement.textContent =
        overallDraws;


    /* =====================================
       CHAMPIONSHIPS
       ===================================== */

    championshipsElement.innerHTML = "";


    if (
        superstar.achievements &&
        superstar.achievements.length > 0
    ) {

        superstar.achievements.forEach(
            achievement => {

                const item =
                    document.createElement("p");

                item.textContent =
                    achievement;

                championshipsElement.appendChild(
                    item
                );

            }
        );

    }

    else {

        championshipsElement.innerHTML = `
            <p>NO CHAMPIONSHIPS</p>
        `;

    }


    /* =====================================
       MATCH HISTORY
       ===================================== */

    const matchHistory = [];


    /* =====================================
       ADD MATCH
       ===================================== */

    function addMatch(match) {

        matchHistory.push(match);

    }


    /* =====================================
       PROCESS EVENTS
       ===================================== */

    if (typeof eventData !== "undefined") {

        Object.entries(eventData).forEach(
            ([eventId, event]) => {

                if (!event.results) {
                    return;
                }


                event.results.forEach(result => {

                    const wrestler1 =
                        result.wrestler1 || [];

                    const wrestler2 =
                        result.wrestler2 || [];


                    const wrestlerName =
                        normalizeName(
                            superstar.name
                        );


                    const inTeam1 =
                        wrestler1.some(name =>
                            normalizeName(name) ===
                            wrestlerName
                        );


                    const inTeam2 =
                        wrestler2.some(name =>
                            normalizeName(name) ===
                            wrestlerName
                        );


                    if (
                        !inTeam1 &&
                        !inTeam2
                    ) {

                        return;

                    }


                    /* =========================
                       RESULT
                       ========================= */

                    let resultStatus =
                        "DRAW";


                    if (
                        result.winner === "DRAW"
                    ) {

                        resultStatus =
                            "DRAW";

                    }

                    else if (
                        inTeam1
                    ) {

                        resultStatus =
                            result.winner === "Team 1"
                                ? "WIN"
                                : "LOSS";

                    }

                    else if (
                        inTeam2
                    ) {

                        resultStatus =
                            result.winner === "Team 2"
                                ? "WIN"
                                : "LOSS";

                    }

                    else if (
                        normalizeName(
                            result.winner || ""
                        ) === wrestlerName
                    ) {

                        resultStatus =
                            "WIN";

                    }

                    else {

                        resultStatus =
                            "LOSS";

                    }


                    /* =========================
                       OPPONENTS
                       ========================= */

                    let opponents = [];


                    if (inTeam1) {

                        opponents =
                            wrestler2;

                    }

                    else {

                        opponents =
                            wrestler1;

                    }


                    addMatch({

                        source: "EVENT",

                        title:
                            event.title,

                        date:
                            event.date,

                        type:
                            result.type,

                        match:
                            result.match,

                        opponents:
                            opponents,

                        status:
                            resultStatus

                    });

                });

            }
        );

    }


    /* =====================================
       PROCESS TOURNAMENTS
       ===================================== */

    if (
        typeof tournamentData !==
        "undefined"
    ) {

        Object.entries(
            tournamentData
        ).forEach(
            ([tournamentId, tournament]) => {

                if (!tournament.matches) {
                    return;
                }


                tournament.matches.forEach(
                    match => {

                        const wrestlerName =
                            normalizeName(
                                superstar.name
                            );


                        const isWrestler1 =
                            normalizeName(
                                match.wrestler1
                            ) ===
                            wrestlerName;


                        const isWrestler2 =
                            normalizeName(
                                match.wrestler2
                            ) ===
                            wrestlerName;


                        if (
                            !isWrestler1 &&
                            !isWrestler2
                        ) {

                            return;

                        }


                        /* =====================
                           RESULT
                           ===================== */

                        let resultStatus =
                            "DRAW";


                        if (
                            match.score1 >
                            match.score2
                        ) {

                            resultStatus =
                                isWrestler1
                                    ? "WIN"
                                    : "LOSS";

                        }

                        else if (
                            match.score1 <
                            match.score2
                        ) {

                            resultStatus =
                                isWrestler2
                                    ? "WIN"
                                    : "LOSS";

                        }

                        else {

                            resultStatus =
                                "DRAW";

                        }


                        /* =====================
                           OPPONENT
                           ===================== */

                        const opponent =
                            isWrestler1
                                ? match.wrestler2
                                : match.wrestler1;


                        addMatch({

                            source:
                                "TOURNAMENT",

                            title:
    tournamentId
        .replace("raw-", "RAW ")
        .replace("smackdown-", "SMACKDOWN ")
        .replace("nxt-", "NXT "),

                            date:
                                `ROUND ${match.date}`,

                            type:
                                "SINGLES",

                            match:
                                "TOURNAMENT MATCH",

                            opponents:
                                [opponent],

                            status:
                                resultStatus

                        });

                    }
                );

            }
        );

    }


    /* =====================================
       MATCH TYPE RECORDS
       ===================================== */

    let singlesWins = 0;
    let singlesLosses = 0;
    let singlesDraws = 0;

    let tagWins = 0;
    let tagLosses = 0;
    let tagDraws = 0;

    let sixManWins = 0;
    let sixManLosses = 0;
    let sixManDraws = 0;


    matchHistory.forEach(match => {

        if (
            match.type === "SINGLES"
        ) {

            if (match.status === "WIN") {
                singlesWins++;
            }

            else if (match.status === "LOSS") {
                singlesLosses++;
            }

            else {
                singlesDraws++;
            }

        }

        else if (
            match.type === "TAG TEAM"
        ) {

            if (match.status === "WIN") {
                tagWins++;
            }

            else if (match.status === "LOSS") {
                tagLosses++;
            }

            else {
                tagDraws++;
            }

        }

        else if (
            match.type === "6-MAN TAG TEAM"
        ) {

            if (match.status === "WIN") {
                sixManWins++;
            }

            else if (match.status === "LOSS") {
                sixManLosses++;
            }

            else {
                sixManDraws++;
            }

        }

    });


    /* =====================================
       DISPLAY MATCH TYPE RECORDS
       ===================================== */

    singlesRecordElement.textContent =
        `${singlesWins} - ${singlesLosses} - ${singlesDraws}`;

    tagRecordElement.textContent =
        `${tagWins} - ${tagLosses} - ${tagDraws}`;

    sixManRecordElement.textContent =
        `${sixManWins} - ${sixManLosses} - ${sixManDraws}`;


    /* =====================================
       NO MATCHES
       ===================================== */

    if (matchHistory.length === 0) {

        matchHistoryElement.innerHTML = `
            <p>NO MATCHES</p>
        `;

    }


    /* =====================================
       RENDER MATCH HISTORY
       ===================================== */

    else {

        matchHistoryElement.innerHTML = "";


        matchHistory.forEach(match => {

            const row =
                document.createElement("div");

            row.className =
                "match-history-row";


            const opponentsText =
                match.opponents.join(" & ");


            row.innerHTML = `

                <div class="match-history-info">

                    <div class="match-history-source">
                        ${match.source}
                    </div>

                    <div class="match-history-title">
                        ${match.title}
                    </div>

                    <div class="match-history-match">
                        ${match.match}
                    </div>

                    <div class="match-history-opponent">
                        VS ${opponentsText}
                    </div>

                    <div class="match-history-date">
                        ${match.date} · ${match.type}
                    </div>

                </div>

                <div class="match-history-result ${match.status.toLowerCase()}">
                    ${match.status}
                </div>

            `;


            matchHistoryElement.appendChild(
                row
            );

        });

    }

}
