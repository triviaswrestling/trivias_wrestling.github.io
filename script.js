console.log("Trivias Wrestling funcionando");

const wrestlers = [
    {
        name: "Cody Rhodes",
        division: "Men's Division",
        achievements: [
            "2x WWE Undisputed Champion",
            "2x TNA Champion",
            "Royal Rumble Winner 2024"
        ]
    }
];

/* =========================================
   WRESTLER MODAL
   ========================================= */

function openModal(index) {
    const wrestler = wrestlers[index];
    const modal = document.getElementById("modal");
    const modalName = document.getElementById("modal-name");
    const modalDivision = document.getElementById("modal-division");
    const achievementsList = document.getElementById("modal-achievements");

    if (!wrestler || !modal) return;

    if (modalName) modalName.textContent = wrestler.name;
    if (modalDivision) modalDivision.textContent = wrestler.division;

    if (achievementsList) {
        achievementsList.innerHTML = "";
        wrestler.achievements.forEach(achievement => {
            const listItem = document.createElement("li");
            listItem.textContent = achievement;
            achievementsList.appendChild(listItem);
        });
    }

    modal.classList.add("show");
    document.body.classList.add("modal-open");
}

function closeModal() {
    const modal = document.getElementById("modal");
    if (!modal) return;
    modal.classList.remove("show");
    document.body.classList.remove("modal-open");
}

const wrestlerModal = document.getElementById("modal");

if (wrestlerModal) {
    wrestlerModal.addEventListener("click", function () {
        closeModal();
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
        closeStipulations();
    }
});

/* =========================================
   STIPULATIONS MODAL
   ========================================= */

const openStipulations = document.getElementById("openStipulations");
const closeStipulationsButton = document.getElementById("closeStipulations");
const stipulationsOverlay = document.getElementById("stipulationsOverlay");
const stipulationsModal = document.getElementById("stipulationsModal");

function openStipulationsModal() {
    if (!stipulationsModal) return;
    stipulationsModal.classList.add("active");
    document.body.classList.add("modal-open");
}

function closeStipulations() {
    if (!stipulationsModal) return;
    stipulationsModal.classList.remove("active");
    document.body.classList.remove("modal-open");
}

if (openStipulations) {
    openStipulations.addEventListener("click", openStipulationsModal);
}

if (closeStipulationsButton) {
    closeStipulationsButton.addEventListener("click", closeStipulations);
}

if (stipulationsOverlay) {
    stipulationsOverlay.addEventListener("click", closeStipulations);
}

/* =========================================
   GLOBAL WRESTLER DATABASE
   ========================================= */

window.wrestlerDatabase = {};

wrestlers.forEach(wrestler => {
    window.wrestlerDatabase[wrestler.name] = wrestler;
});
