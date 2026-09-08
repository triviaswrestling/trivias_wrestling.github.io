/* =========================================
   MI WRESTLING
   SUPERSTAR
   ========================================= */


/* =========================================
   GET SUPERSTAR ID
   ========================================= */

const urlParams =
    new URLSearchParams(window.location.search);

const superstarId =
    urlParams.get("id");


/* =========================================
   FIND SUPERSTAR
   ========================================= */

const superstar =
    wrestlers.find(wrestler => {

        const wrestlerId =
            wrestler.name
                .toLowerCase()
                .replace(/\s+/g, "-");

        return wrestlerId === superstarId;

    });


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

if (!superstar) {

    superstarName.textContent =
        "SUPERSTAR NOT FOUND";

    superstarNickname.textContent =
        "";

    superstarBrand.textContent =
        "";

    superstarImage.src =
        "images/Vacante.jpg";

    superstarImage.alt =
        "Superstar Not Found";

    wins.textContent =
        "0";

    losses.textContent =
        "0";

    draws.textContent =
        "0";

    singlesRecord.textContent =
        "0 - 0 - 0";

    tagRecord.textContent =
        "0 - 0 - 0";

    sixManRecord.textContent =
        "0 - 0 - 0";

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


    /* =====================================
       BASIC INFORMATION
       ===================================== */

    superstarName.textContent =
        superstar.name;


    superstarImage.src =
        superstar.image || "images/Vacante.jpg";


    superstarImage.alt =
        superstar.name;


    /* =====================================
       NICKNAME
       ===================================== */

    if (superstar.nickname) {

        superstarNickname.textContent =
            `"${superstar.nickname}"`;

    } else {

        superstarNickname.textContent =
            "";

    }


    /* =====================================
       BRAND
       ===================================== */

    superstarBrand.textContent =
        superstar.brand || "NO BRAND";


    /* =====================================
       OVERALL RECORD
       ===================================== */

    const overallParts =
        (superstar.overall2026 || "0 - 0 - 0")
            .split("-")
            .map(part => part.trim());


    wins.textContent =
        overallParts[0] || "0";


    losses.textContent =
        overallParts[1] || "0";


    draws.textContent =
        overallParts[2] || "0";


    /* =====================================
       MATCH RECORD
       ===================================== */

    singlesRecord.textContent =
        superstar.singles || "0 - 0 - 0";


    tagRecord.textContent =
        superstar.tag || "0 - 0 - 0";


    sixManRecord.textContent =
        superstar.sixMan || "0 - 0 - 0";


    /* =====================================
       CHAMPIONSHIPS / ACHIEVEMENTS
       ===================================== */

    championshipsContainer.innerHTML =
        "";


    if (
        superstar.achievements &&
        superstar.achievements.length > 0
    ) {

        superstar.achievements.forEach(
            achievement => {

                const championshipElement =
                    document.createElement("div");

                championshipElement.className =
                    "championship-item";

                championshipElement.textContent =
                    achievement;

                championshipsContainer.appendChild(
                    championshipElement
                );

            }
        );

    } else {

        championshipsContainer.innerHTML = `
            <p>NO CHAMPIONSHIPS</p>
        `;

    }


    /* =====================================
       MATCH HISTORY
       ===================================== */

    matchHistoryContainer.innerHTML =
        `
            <p>NO MATCHES</p>
        `;

}
