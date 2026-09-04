console.log("Trivias Wrestling funcionando");
const wrestlers = [
    {
        name: "Cody Rhodes",
        image: "images/Cody Rhodes trivias.jpg",
        division: "Men's Division",
        wins: 0,
        losses: 0,

        achievements: [
            "2x WWE Undisputed Champion",
            "2x TNA Champion",
            "Royal Rumble Winner 2024"
        ]
    }
];

function openModal(index) {

    const wrestler = wrestlers[index];

    document.getElementById("modal-image").src = wrestler.image;

    document.getElementById("modal-name").textContent = wrestler.name;

    document.getElementById("modal-division").textContent =
        "Division: " + wrestler.division;

    document.getElementById("modal-record").textContent =
        "Wins: " + wrestler.wins +
        " | Losses: " + wrestler.losses;

    const achievementsList =
        document.getElementById("modal-achievements");

    achievementsList.innerHTML = "";

    wrestler.achievements.forEach(function(achievement) {

        const listItem = document.createElement("li");

        listItem.textContent = achievement;

        achievementsList.appendChild(listItem);

    });

    document.getElementById("modal").style.display = "flex";
}

function closeModal() {

    document.getElementById("modal").style.display = "none";

}
