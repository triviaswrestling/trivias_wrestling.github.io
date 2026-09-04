const rosterContainer = document.getElementById("roster");


function createWrestlerCard(wrestler, index) {

    const card = document.createElement("div");

    card.className = "wrestler";

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


function loadRoster(status) {

    if (!rosterContainer) {
        return;
    }


    rosterContainer.innerHTML = "";


    wrestlers.forEach(function (wrestler, index) {

        if (wrestler.status === status) {

            const card = createWrestlerCard(wrestler, index);

            rosterContainer.appendChild(card);
        }

    });
}


const main = document.querySelector("main");


if (main) {

    const status = main.dataset.rosterStatus;

    loadRoster(status);

}
