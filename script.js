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


function openModal(index) {

    const wrestler = wrestlers[index];

    const modal = document.getElementById("modal");
    const modalName = document.getElementById("modal-name");
    const modalDivision = document.getElementById("modal-division");
    const achievementsList = document.getElementById("modal-achievements");

    if (!wrestler) {
        return;
    }

    modalName.textContent = wrestler.name;

    modalDivision.textContent = wrestler.division;

    achievementsList.innerHTML = "";

    wrestler.achievements.forEach(function (achievement) {

        const listItem = document.createElement("li");

        listItem.textContent = achievement;

        achievementsList.appendChild(listItem);
    });

    modal.classList.add("show");

    document.body.classList.add("modal-open");
}


function closeModal() {

    const modal = document.getElementById("modal");

    modal.classList.remove("show");

    document.body.classList.remove("modal-open");
}


/* CLOSE MODAL WHEN CLICKING THE DARK BACKGROUND */

document.getElementById("modal").addEventListener("click", function () {

    closeModal();

});


/* CLOSE MODAL WITH ESCAPE */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeModal();
    }

});
