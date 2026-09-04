function openModal(index) {

    const wrestler = wrestlers[index];

    if (!wrestler) {
        return;
    }

    const modal = document.getElementById("modal");
    const modalName = document.getElementById("modal-name");
    const modalDivision = document.getElementById("modal-division");
    const achievementsList = document.getElementById("modal-achievements");


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


/* CLOSE WHEN CLICKING THE BACKGROUND */

document.getElementById("modal").addEventListener("click", function () {

    closeModal();

});


/* CLOSE WITH ESCAPE */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeModal();

    }

});
