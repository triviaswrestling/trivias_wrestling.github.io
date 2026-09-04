console.log("CHAMPIONSHIPS.JS CARGADO");


const championships = [

    {
        title: "WWE Championship",
        champion: "Cody Rhodes",
        image: "images/Cody Rhodes trivias.jpg",
        page: "championship/wwe-championship.html"
    },

    {
        title: "AEW World Championship",
        champion: "VACANT",
        image: "images/aew-title.jpg",
        page: "championship/aew-world-championship.html"
    },

    {
        title: "TNT Championship",
        champion: "VACANT",
        image: "images/tnt-title.jpg",
        page: "championship/tnt-championship.html"
    },

    {
        title: "Women's World Championship",
        champion: "VACANT",
        image: "images/womens-title.jpg",
        page: "championship/womens-world-championship.html"
    },

    {
        title: "United States Championship",
        champion: "VACANT",
        image: "images/us-title.jpg",
        page: "championship/united-states-championship.html"
    },

    {
        title: "Intercontinental Championship",
        champion: "VACANT",
        image: "images/ic-title.jpg",
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
