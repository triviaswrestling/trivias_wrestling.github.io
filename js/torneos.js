console.log("TORNEOS.JS CARGADO");

const gamesHome=document.getElementById("games-home");
const gamesDirectory=document.getElementById("games-directory");
const directoryContainer=document.getElementById("directory-tournaments");
const directoryTitle=document.getElementById("directory-title");
const searchInput=document.getElementById("tournament-search");
const backButton=document.getElementById("back-button");
const homeSearch=document.getElementById("home-tournament-search");
const gamesSections=document.getElementById("games-sections");

const directoryImages={
    RAW:"images/raw1.jpg",
    SMACKDOWN:"images/smackdown1.jpg",
    NXT:"images/nxt-a.png",
    SPEED:"images/speed.jpg",
    AEW:"images/aew.jpg",
    TNA:"images/tna.jpg",
    AAA:"images/aaa.jpg"
};

const championships=[
    {id:"campeonato-4",number:4,title:"CHAMPIONSHIP 4",division:"CHAMPIONSHIP",image:"images/Vacante.jpg"},
    {id:"campeonato-3",number:3,title:"CHAMPIONSHIP 3",division:"CHAMPIONSHIP",image:"images/Vacante.jpg"},
    {id:"campeonato-2",number:2,title:"CHAMPIONSHIP 2",division:"CHAMPIONSHIP",image:"images/Vacante.jpg"},
    {id:"campeonato-1",number:1,title:"CHAMPIONSHIP 1",division:"CHAMPIONSHIP",image:"images/Vacante.jpg"}
];

function getNormalTournaments(){
    return Object.entries(tournamentData||{}).map(([id,data])=>{
        let brand="OTHER";

        if(id.startsWith("monday-night-raw-"))brand="RAW";
        else if(id.startsWith("friday-night-smackdown-"))brand="SMACKDOWN";
        else if(id.startsWith("wwe-nxt-"))brand="NXT";

        const number=id.match(/\d+$/)?.[0]||"";

        return{
            id,
            number:Number(number),
            brand,
            division:data.division||(brand==="NXT"?"SECOND DIVISION":"FIRST DIVISION"),
            title:data.title||`TOURNAMENT ${number}`,
            image:getTournamentImage(brand,Number(number))
        };
    });
}

function getOutsiderTournaments(){
    return Object.entries(outsiderData||{}).map(([id,data])=>{
        const brand=(data.brand||"OUTSIDER").toUpperCase();
        const number=id.match(/\d+$/)?.[0]||"";

        return{
            id,
            number:Number(number),
            brand,
            division:data.division||data.format||"TOURNAMENT",
            title:data.title||`${brand} ${number}`,
            image:getTournamentImage(brand,Number(number)),
            outsider:true
        };
    });
}

function getAllTournaments(){
    return[
        ...getNormalTournaments(),
        ...getOutsiderTournaments()
    ];
}

function getTournamentImage(brand,number){
    if(brand==="NXT"){
        return number>=9?"images/nxt-b.png":"images/nxt-a.png";
    }

    return directoryImages[brand]||"images/Vacante.jpg";
}

function createTournamentCard(tournament){
    const card=document.createElement("div");

    card.className="tournament-card";
    card.style.backgroundImage=`url("${tournament.image}")`;
    card.dataset.id=tournament.id;

    if(tournament.brand){
        card.classList.add(tournament.brand.toLowerCase());
    }

    card.innerHTML=`
        <div>
            <div class="tournament-number">
                ${tournament.brand} ${tournament.number||""}
            </div>
            <h3>${tournament.title}</h3>
            <div class="tournament-brand">
                ${tournament.division}
            </div>
        </div>
        <div class="tournament-view">VIEW →</div>
    `;

    card.addEventListener("click",()=>{
        if(tournament.outsider){
            window.location.href=`outsiderRoad.html?id=${tournament.id}`;
        }else{
            window.location.href=`torneoroad.html?id=${tournament.id}`;
        }
    });

    return card;
}

const sectionConfig=[
    {title:"RAW / SMACKDOWN",brands:["RAW","SMACKDOWN"]},
    {title:"NXT",brands:["NXT"]},
    {title:"AAA",brands:["AAA"]},
    {title:"SPEED",brands:["SPEED"]},
    {title:"AEW",brands:["AEW"]},
    {title:"TNA",brands:["TNA"]}
];

function createSection(title,tournaments){
    if(!tournaments.length)return;

    const section=document.createElement("section");
    section.className="division-section";

    const divider=document.createElement("div");
    divider.className="division-divider";

    const heading=document.createElement("h2");
    heading.textContent=title;

    divider.appendChild(heading);

    const grid=document.createElement("div");
    grid.className="tournaments-grid";

    tournaments.forEach(tournament=>{
        grid.appendChild(createTournamentCard(tournament));
    });

    section.appendChild(divider);
    section.appendChild(grid);
    gamesSections.appendChild(section);
}

function renderHome(){
    gamesSections.innerHTML="";

    const query=homeSearch.value.toLowerCase().trim();
    const tournaments=getAllTournaments();

    sectionConfig.forEach(section=>{
        const filtered=tournaments
            .filter(tournament=>section.brands.includes(tournament.brand))
            .filter(tournament=>
                !query||
                tournament.title.toLowerCase().includes(query)||
                tournament.id.toLowerCase().includes(query)||
                tournament.brand.toLowerCase().includes(query)||
                String(tournament.number).includes(query)
            )
            .sort((a,b)=>b.number-a.number);

        createSection(section.title,filtered);
    });

    const filteredChampionships=championships.filter(championship=>
        !query||
        championship.title.toLowerCase().includes(query)||
        String(championship.number).includes(query)||
        "championship".includes(query)
    );

    if(filteredChampionships.length){
        const section=document.createElement("section");
        section.className="division-section";

        const divider=document.createElement("div");
        divider.className="division-divider";

        const heading=document.createElement("h2");
        heading.textContent="CHAMPIONSHIP";

        divider.appendChild(heading);

        const grid=document.createElement("div");
        grid.className="tournaments-grid";

        filteredChampionships.forEach(championship=>{
            const card=createTournamentCard({
                ...championship,
                brand:"CHAMPIONSHIP"
            });

            card.classList.add("championship");

            card.addEventListener("click",()=>{
                window.location.href=`torneoroad.html?id=${championship.id}`;
            });

            grid.appendChild(card);
        });

        section.appendChild(divider);
        section.appendChild(grid);
        gamesSections.appendChild(section);
    }
}

function openDirectory(brand,tournaments){
    gamesHome.style.display="none";
    gamesDirectory.style.display="block";
    directoryTitle.textContent=brand;
    searchInput.value="";
    renderDirectoryTournaments(tournaments);
}

function renderDirectoryTournaments(tournaments){
    directoryContainer.innerHTML="";

    tournaments.forEach(tournament=>{
        directoryContainer.appendChild(createTournamentCard(tournament));
    });
}

searchInput.addEventListener("input",()=>{
    const query=searchInput.value.toLowerCase().trim();
    const brand=directoryTitle.textContent;

    const tournaments=getAllTournaments()
        .filter(tournament=>tournament.brand===brand);

    const filtered=tournaments.filter(tournament=>
        tournament.title.toLowerCase().includes(query)||
        tournament.id.toLowerCase().includes(query)||
        String(tournament.number).includes(query)
    );

    renderDirectoryTournaments(filtered);
});

homeSearch.addEventListener("input",renderHome);

backButton.addEventListener("click",()=>{
    gamesDirectory.style.display="none";
    gamesHome.style.display="block";
    searchInput.value="";
});

renderHome();
