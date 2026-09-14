/* =========================================
   OUTSIDER ROAD
   ========================================= */

const params=new URLSearchParams(window.location.search);
const tournamentId=params.get("id");

const brandElement=document.getElementById("tournament-brand");
const titleElement=document.getElementById("tournament-title");
const divisionElement=document.getElementById("tournament-division");

const draftContainer=document.getElementById("draft-container");
const standingsBody=document.getElementById("standings-body");
const matrixTable=document.getElementById("matrix-table");
const resultsContainer=document.getElementById("results-container");

const tournament=outsiderData[tournamentId];

/* =========================================
   HELPERS
   ========================================= */

function createWrestlerId(name){
    return String(name||"")
        .toLowerCase()
        .trim()
        .replace(/\s+/g,"-");
}

function normalizeName(name){
    return String(name||"")
        .toLowerCase()
        .trim();
}

function getWrestler(name){

    if(typeof wrestlers==="undefined"){
        return null;
    }

    return wrestlers.find(w=>
        normalizeName(w.name)===normalizeName(name)
    )||null;
}

function getWrestlerImage(name){

    const wrestler=getWrestler(name);

    if(wrestler?.image){
        return wrestler.image;
    }

    return "images/Vacante.jpg";
}

function createWrestlerLink(name){

    return `
        <a
            href="superstar.html?id=${createWrestlerId(name)}"
            class="table-wrestler-link"
        >
            ${name}
        </a>
    `;
}

/* =========================================
   LOAD TOURNAMENT
   ========================================= */

if(!tournament){

    titleElement.textContent="TOURNAMENT NOT FOUND";

}else{

    brandElement.textContent=tournament.brand||"OUTSIDER";
    titleElement.textContent=tournament.name||tournament.title||tournamentId;
    divisionElement.textContent=tournament.division||tournament.format||"";

    renderDraft(tournament);

    if(tournament.standings){
        renderStandings(tournament);
    }

    if(tournament.matrix){
        renderMatrix(tournament);
    }

    if(tournament.format==="BRACKET"){
        renderBracket(tournament);
    }else{
        renderResults(tournament);
    }

}

/* =========================================
   DRAFT
   ========================================= */

function renderDraft(tournament){

    draftContainer.innerHTML="";

    if(!tournament.roster?.length){
        draftContainer.innerHTML="<p>NO DRAFT DATA</p>";
        return;
    }

    tournament.roster.forEach((name,index)=>{

        const card=document.createElement("div");
        card.className="draft-card";

        card.innerHTML=`
            <a
                href="superstar.html?id=${createWrestlerId(name)}"
                style="text-decoration:none;color:inherit;"
            >
                <img
                    src="${getWrestlerImage(name)}"
                    alt="${name}"
                    class="draft-card-image"
                >
                <span class="draft-card-name">
                    ${name}
                </span>
            </a>
        `;

        draftContainer.appendChild(card);

    });

}

/* =========================================
   STANDINGS
   ========================================= */

function renderStandings(tournament){

    standingsBody.innerHTML="";

    tournament.standings.forEach((wrestler,index)=>{

        const row=document.createElement("tr");

        row.innerHTML=`
            <td>${index+1}</td>
            <td>${createWrestlerLink(wrestler.name)}</td>
            <td>${wrestler.played??0}</td>
            <td>${wrestler.wins??0}</td>
            <td>${wrestler.draws??0}</td>
            <td>${wrestler.losses??0}</td>
            <td>${wrestler.points??0}</td>
        `;

        standingsBody.appendChild(row);

    });

}

/* =========================================
   MATCH MATRIX
   ========================================= */

function renderMatrix(tournament){

    matrixTable.innerHTML="";

    if(!tournament.matrix?.length){
        return;
    }

    tournament.matrix.forEach((rowData,rowIndex)=>{

        const row=document.createElement("tr");

        rowData.forEach((value,columnIndex)=>{

            const cell=document.createElement(
                rowIndex===0||columnIndex===0
                    ?"th"
                    :"td"
            );

            cell.textContent=value;
            row.appendChild(cell);

        });

        matrixTable.appendChild(row);

    });

}

/* =========================================
   BRACKET
   ========================================= */

function renderBracket(tournament){

    const bracket=document.createElement("div");
    bracket.className="chamber-bracket";

    const matches=[];

    Object.entries(tournament.shows||{}).forEach(
        ([showId,show])=>{

            (show.matches||[]).forEach(match=>{

                matches.push({
                    showId,
                    date:show.date,
                    match
                });

            });

        }
    );

    const rounds=[
        {title:"QUARTERFINALS",count:4},
        {title:"SEMIFINALS",count:2},
        {title:"FINAL",count:1}
    ];

    let position=0;

    rounds.forEach(round=>{

        const column=document.createElement("div");
        column.className="bracket-round";

        const heading=document.createElement("h3");
        heading.textContent=round.title;
        column.appendChild(heading);

        for(let i=0;i<round.count;i++){

            const item=matches[position++];

            if(!item){
                continue;
            }

            column.appendChild(
                createMatchCard(
                    item.match,
                    item.showId,
                    item.date
                )
            );

        }

        bracket.appendChild(column);

    });

    resultsContainer.appendChild(bracket);

    if(
        tournament.finalEvent&&
        tournament.finalMatches?.length
    ){

        const heading=document.createElement("div");
        heading.className="results-date";
        heading.textContent=tournament.finalEvent
            .replace(/-/g," ")
            .toUpperCase();

        resultsContainer.appendChild(heading);

        tournament.finalMatches.forEach(match=>{

            resultsContainer.appendChild(
                createMatchCard(match)
            );

        });

    }

}

/* =========================================
   RESULTS
   ========================================= */

function renderResults(tournament){

    Object.entries(tournament.shows||{}).forEach(
        ([showId,show])=>{

            const heading=document.createElement("div");
            heading.className="results-date";
            heading.textContent=showId.toUpperCase();

            resultsContainer.appendChild(heading);

            (show.matches||[]).forEach(match=>{

                resultsContainer.appendChild(
                    createMatchCard(
                        match,
                        showId,
                        show.date
                    )
                );

            });

        }
    );

}

/* =========================================
   MATCH CARD
   ========================================= */

function createMatchCard(match,showId,date){

    const [
        wrestler1,
        wrestler2,
        score1,
        score2
    ]=match;

    const card=document.createElement("div");
    card.className="bracket-match";

    const winner1=score1>score2;
    const winner2=score2>score1;

    card.innerHTML=`
        <div class="${winner1?"winner":""}">
            ${createWrestlerLink(wrestler1)}
            <span>${score1}</span>
        </div>

        <div class="${winner2?"winner":""}">
            ${createWrestlerLink(wrestler2)}
            <span>${score2}</span>
        </div>
    `;

    return card;

}
