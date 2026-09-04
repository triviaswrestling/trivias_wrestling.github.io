console.log("Trivias Wrestling funcionando");

const wrestlers = [
    {
        name: "Cody Rhodes",
        image: "images/Cody Rhodes trivias.jpg",
        division: "Men's Division",

        totalWins: 0,
        totalLosses: 0,

        yearWins: 0,
        yearLosses: 0,

        achievements: [
            "2x WWE Undisputed Champion",
            "2x TNA Champion",
            "Royal Rumble Winner 2024"
        ]
    }
];


function openModal(index) {

    const wrestler = wrestlers[index];

    document.getElementById("modal-name").textContent =
        wrestler.name;

    document.getElementById("modal-division").textContent =
        "Division: " + wrestler.division;

    const achievementsList =
        document.getElementById("modal-achievements");

    achievementsList.innerHTML = "";

    wrestler.achievements.forEach(function(achievement) {

        const listItem = document.createElement("li");

        listItem.textContent = achievement;

        achievementsList.appendChild(listItem);

    });

    document.getElementById("modal").classList.add("show");
}


function closeModal() {

    document.getElementById("modal").classList.remove("show");

}
