console.log("CHAMPIONSHIPS.JS CARGADO");


const championships = [

    {
        title: "WWE Championship",
        champion: "Cody Rhodes",
        image: "images/Cody Rhodes trivias.jpg",
        page: "championship/wwe-championship.html"
    },

    {
        title: "World Heavyweight Championship",
        champion: "VACANT",
        image: "images/Vacante.jpg",
        page: "championship/aew-world-championship.html"
    },

    {
        title: "World Tag Team Championship",
        champion: "VACANT",
        image: "images/Vacante.jpg",
        page: "championship/tnt-championship.html"
    },

    {
        title: "Intercontinental Championship",
        champion: "VACANT",
        image: "images/Vacante.jpg",
        page: "championship/womens-world-championship.html"
    },

    {
        title: "United States Championship",
        champion: "VACANT",
        image: "images/Vacante.jpg",
        page: "championship/united-states-championship.html"
    },

    {
        title: "NXT Championship",
        champion: "VACANT",
        image: "images/Vacante.jpg",
        page: "championship/intercontinental-championship.html"
    }

];


const championshipsContainer =
    document.getElementById("championships");


if (championshipsContainer) {

    championships.forEach(function (championship) {

        const card = document.createElement("a");

        card.className = "championship-card";

        card.href = championship.page;


        const image = document.createElement("img");

        image.src = championship.image;

        image.alt = championship.champion;


        const title = document.createElement("h2");

        title.textContent = championship.title;


        const champion = document.createElement("p");

        champion.textContent = championship.champion;


        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(champion);


        championshipsContainer.appendChild(card);

    });

}
/* =========================================
   OVERALL COLORS
   ========================================= */

.wrestler.raw .record strong {
    color: #ff4a5f;
}

.wrestler.smackdown .record strong {
    color: #4d8dff;
}

.wrestler.nxt .record strong {
    color: #d0d0d0;
}
