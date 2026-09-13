const params=new URLSearchParams(window.location.search);
const tournamentId=params.get("id");
const container=document.getElementById("tournament-container");

if(!container){
    console.error("No se encontró tournament-container");
}

const tournament=outsiderData[tournamentId];

if(!tournament){
    container.innerHTML="<p>TORNEO NO ENCONTRADO</p>";
}else{

    const title=document.createElement("h1");
    title.textContent=`${tournament.brand} — ${tournamentId}`;
    container.appendChild(title);

    if(tournament.format==="BRACKET"){
        renderBracket(tournament,container);
    }else{
        renderCustom(tournament,container);
    }

}

function renderBracket(tournament,container){

    const bracket=document.createElement("div");
    bracket.className="chamber-bracket";

    const rounds=[];

    Object.entries(tournament.shows||{}).forEach(([showId,show])=>{

        const matches=show.matches||[];

        if(!matches.length)return;

        rounds.push({
            showId,
            date:show.date,
            matches
        });

    });

    rounds.forEach((round,index)=>{

        const column=document.createElement("div");
        column.className="bracket-round";

        const heading=document.createElement("h3");
        heading.textContent=round.showId.toUpperCase();
        column.appendChild(heading);

        round.matches.forEach(match=>{

            const [wrestler1,wrestler2,score1,score2]=match;

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

            column.appendChild(card);

        });

        bracket.appendChild(column);

    });

    container.appendChild(bracket);

    if(tournament.finalEvent&&tournament.finalMatches?.length){

        const heading=document.createElement("div");
        heading.className="results-date";
        heading.textContent=tournament.finalEvent
            .replace(/-/g," ")
            .toUpperCase();

        container.appendChild(heading);

        tournament.finalMatches.forEach(match=>{

            const [wrestler1,wrestler2,score1,score2]=match;

            const card=document.createElement("div");
            card.className="bracket-match final-match";

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

            container.appendChild(card);

        });

    }

}

function renderCustom(tournament,container){

    const message=document.createElement("p");
    message.textContent="FORMATO PERSONALIZADO";
    container.appendChild(message);

}

function createWrestlerLink(name){

    return `<a href="../wrestler.html?name=${encodeURIComponent(name)}">${name}</a>`;

}
