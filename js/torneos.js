console.log("TORNEOS.JS CARGADO");

const tournaments=[];

for(let number=25;number>=1;number--){

    tournaments.push({
        id:`monday-night-raw-${number}`,
        number,
        brand:"RAW",
        division:"First Division",
        title:`Tournament ${number}`,
        image:`images/raw${number}.jpg`
    });

    tournaments.push({
        id:`friday-night-smackdown-${number}`,
        number,
        brand:"SMACKDOWN",
        division:"First Division",
        title:`Tournament ${number}`,
        image:`images/smackdown${number}.jpg`
    });

}

for(let number=18;number>=1;number--){

    tournaments.push({
        id:`wwe-nxt-${number}`,
        number,
        brand:"NXT",
        division:"Second Division",
        title:`Tournament ${number}`,
        image:number>=9
            ?"images/nxt-b.png"
            :"images/nxt-a.png"
    });

}


/* =========================================
   CHAMPIONSHIPS
   ========================================= */

const championships=[

    {
        id:"campeonato-4",
        number:4,
        title:"CHAMPIONSHIP 4",
        division:"CHAMPIONSHIP",
        image:"images/Vacante.jpg"
    },

    {
        id:"campeonato-3",
        number:3,
        title:"CHAMPIONSHIP 3",
        division:"CHAMPIONSHIP",
        image:"images/Vacante.jpg"
    },

    {
        id:"campeonato-2",
        number:2,
        title:"CHAMPIONSHIP 2",
        division:"CHAMPIONSHIP",
        image:"images/Vacante.jpg"
    },

    {
        id:"campeonato-1",
        number:1,
        title:"CHAMPIONSHIP 1",
        division:"CHAMPIONSHIP",
        image:"images/Vacante.jpg"
    }

];


/* =========================================
   CONTAINERS
   ========================================= */

const firstDivisionContainer=
    document.getElementById("first-division-tournaments");

const secondDivisionContainer=
    document.getElementById("second-division-tournaments");

const championshipContainer=
    document.getElementById("championship-tournaments");


/* =========================================
   CREATE CARD
   ========================================= */

function createTournamentCard(tournament){

    const card=document.createElement("div");

    card.className="tournament-card";

    card.style.backgroundImage=
        `url("${tournament.image}")`;

    card.dataset.id=tournament.id;

    if(tournament.brand){
        card.classList.add(
            tournament.brand.toLowerCase()
        );
    }

    card.innerHTML=`

        <div>

            <div class="tournament-number">
                ${tournament.brand
                    ?tournament.brand+" "+tournament.number
                    :"CHAMPIONSHIP "+tournament.number}
            </div>

            <h3>
                ${tournament.title}
            </h3>

            <div class="tournament-brand">
                ${tournament.division}
            </div>

        </div>

        <div class="tournament-view">
            VIEW →
        </div>

    `;

    card.addEventListener("click",()=>{

        window.location.href=
            `torneoroad.html?id=${tournament.id}`;

    });

    return card;

}


/* =========================================
   RENDER
   ========================================= */

function renderTournaments(){

    if(
        !firstDivisionContainer||
        !secondDivisionContainer||
        !championshipContainer
    ){

        console.error("Tournament containers not found.");
        return;

    }

    firstDivisionContainer.innerHTML="";
    secondDivisionContainer.innerHTML="";
    championshipContainer.innerHTML="";

    tournaments.forEach(tournament=>{

        const card=createTournamentCard(tournament);

        if(tournament.division==="First Division"){

            firstDivisionContainer.appendChild(card);

        }else{

            secondDivisionContainer.appendChild(card);

        }

    });

    championships.forEach(championship=>{

        const card=createTournamentCard(championship);

        card.classList.add("championship");

        championshipContainer.appendChild(card);

    });

}


/* =========================================
   START
   ========================================= */

renderTournaments();
