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
    return String(name||"").toLowerCase().trim().replace(/\s+/g,"-");
}

function normalizeName(name){
    return String(name||"").toLowerCase().trim();
}

function getWrestler(name){
    if(typeof wrestlers==="undefined")return null;
    return wrestlers.find(w=>normalizeName(w.name)===normalizeName(name))||null;
}

function getWrestlerImage(name){
    return getWrestler(name)?.image||"images/Vacante.jpg";
}

function createWrestlerLink(name){
    return `<a href="superstar.html?id=${createWrestlerId(name)}" class="table-wrestler-link">${name}</a>`;
}

function hideSection(element){
    if(!element)return;
    const section=element.closest("section")||element.closest(".section")||element.parentElement;
    if(section)section.style.display="none";
}

function showSection(element){
    if(!element)return;
    const section=element.closest("section")||element.closest(".section")||element.parentElement;
    if(section)section.style.display="";
}

/* =========================================
   EVENT REFERENCE
   ========================================= */

function resolveEventReference(match){

    if(!match||match.type!=="EVENT_REFERENCE")
        return match;

    if(typeof eventData==="undefined")
        return null;

    const event=eventData[match.eventId];

    if(!event)
        return null;

    let result=null;
    const index=Number(match.matchIndex??0);

    /* FORMATO DIRECTO */
    if(Array.isArray(event.results))
        result=event.results[index];

    /* FORMATO MATCHES */
    if(!result&&Array.isArray(event.matches))
        result=event.matches[index];

    /* FORMATO SHOWS */
    if(!result&&event.shows){

        const shows=Object.values(event.shows);

        for(const show of shows){

            const list=
                show.matches||
                show.results||
                [];

            if(Array.isArray(list)&&list[index]){
                result=list[index];
                break;
            }

        }

    }

    /* FORMATO RESULTS DENTRO DE SHOW */
    if(!result&&Array.isArray(event.results)){

        for(const item of event.results){

            if(item?.matches?.[index]){
                result=item.matches[index];
                break;
            }

        }

    }

    if(!result)
        return null;

    /* ARRAY: [wrestler1,wrestler2,score1,score2,meta] */
    if(Array.isArray(result)){

        const meta=result[4]||{};

        return{
            wrestler1:result[0],
            wrestler2:result[1],
            score1:result[2]??0,
            score2:result[3]??0,
            championship:match.championship||meta.championship,
            championshipColor:match.championshipColor||meta.championshipColor,
            championshipImage:match.championshipImage||meta.championshipImage,
            champion:match.champion||meta.champion
        };

    }

    /* OBJETO */
    return{
        wrestler1:result.wrestler1||result.player1||result.winner1,
        wrestler2:result.wrestler2||result.player2||result.winner2,
        score1:result.score1??result.player1Score??result.scoreA??0,
        score2:result.score2??result.player2Score??result.scoreB??0,
        championship:
            match.championship||
            result.championship,
        championshipColor:
            match.championshipColor||
            result.championshipColor,
        championshipImage:
            match.championshipImage||
            result.championshipImage,
        champion:
            match.champion||
            result.champion
    };

}

/* =========================================
   MATCH DATA
   ========================================= */

function getMatchData(match){

    if(match?.type==="EVENT_REFERENCE")
        return resolveEventReference(match);

    if(!Array.isArray(match))
        return match;

    const meta=match[4]||{};

    return{
        wrestler1:match[0],
        wrestler2:match[1],
        score1:match[2],
        score2:match[3],
        championship:meta.championship,
        championshipColor:meta.championshipColor,
        championshipImage:meta.championshipImage,
        champion:meta.champion
    };

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

    if(tournament.leagues){

        renderLeaguesTournament(tournament);

    }else{

        if(tournament.standings?.length)
            renderStandings(tournament);
        else{
            standingsBody.innerHTML="";
            hideSection(standingsBody);
        }

        if(tournament.matrix?.length)
            renderMatrix(tournament);
        else{
            matrixTable.innerHTML="";
            hideSection(matrixTable);
        }

        if(tournament.format==="BRACKET")
            renderBracket(tournament);
        else
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

    tournament.roster.forEach(name=>{

        const card=document.createElement("div");
        card.className="draft-card";

        card.innerHTML=`
            <a href="superstar.html?id=${createWrestlerId(name)}" style="text-decoration:none;color:inherit;">
                <img src="${getWrestlerImage(name)}" alt="${name}" class="draft-card-image">
                <span class="draft-card-name">${name}</span>
            </a>
        `;

        draftContainer.appendChild(card);

    });

}

/* =========================================
   STANDINGS
   ========================================= */

function buildStandings(participants,matches){

    const standings={};

    participants.forEach(name=>{
        standings[name]={
            name,
            played:0,
            wins:0,
            draws:0,
            losses:0,
            points:0
        };
    });

    matches.forEach(match=>{

        if(!match)return;

        const a=standings[match.wrestler1];
        const b=standings[match.wrestler2];

        if(!a||!b)return;

        a.played++;
        b.played++;

        if(match.score1>match.score2){

            a.wins++;
            a.points+=3;
            b.losses++;

        }else if(match.score1<match.score2){

            b.wins++;
            b.points+=3;
            a.losses++;

        }else{

            a.draws++;
            b.draws++;
            a.points++;
            b.points++;

        }

    });

    return Object.values(standings).sort((a,b)=>{
        if(b.points!==a.points)return b.points-a.points;
        if(b.wins!==a.wins)return b.wins-a.wins;
        return 0;
    });

}

function renderStandings(tournament){

    standingsBody.innerHTML="";

    const list=tournament.standings||[];

    if(!list.length){
        hideSection(standingsBody);
        return;
    }

    showSection(standingsBody);

    list.forEach((wrestler,index)=>{

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

        if(index===0)row.classList.add("champion");
        if(index===list.length-1)row.classList.add("relegation");

        standingsBody.appendChild(row);

    });

}

/* =========================================
   MATCH MATRIX
   ========================================= */

function renderMatrix(tournament){

    matrixTable.innerHTML="";

    if(!tournament.matrix?.length){
        hideSection(matrixTable);
        return;
    }

    showSection(matrixTable);

    tournament.matrix.forEach((rowData,rowIndex)=>{

        const row=document.createElement("tr");

        rowData.forEach((value,columnIndex)=>{

            const cell=document.createElement(
                rowIndex===0||columnIndex===0?"th":"td"
            );

            cell.textContent=value;

            if(value==="W")cell.classList.add("matrix-win");
            if(value==="L")cell.classList.add("matrix-loss");

            row.appendChild(cell);

        });

        matrixTable.appendChild(row);

    });

}

/* =========================================
   LEAGUE MATRIX
   ========================================= */

function renderLeagueMatrix(participants,matches){

    participants.forEach(name=>{

        const row=document.createElement("tr");

        const nameCell=document.createElement("td");
        nameCell.innerHTML=createWrestlerLink(name);
        row.appendChild(nameCell);

        participants.forEach(opponent=>{

            const cell=document.createElement("td");

            if(name===opponent){

                cell.textContent="—";

            }else{

                const match=matches.find(m=>
                    (m.wrestler1===name&&m.wrestler2===opponent)||
                    (m.wrestler1===opponent&&m.wrestler2===name)
                );

                if(!match){

                    cell.textContent="·";

                }else if(match.score1===match.score2){

                    cell.textContent="D";

                }else{

                    const first=match.wrestler1===name;
                    const won=first
                        ?match.score1>match.score2
                        :match.score2>match.score1;

                    cell.textContent=won?"W":"L";
                    cell.classList.add(won?"matrix-win":"matrix-loss");

                }

            }

            row.appendChild(cell);

        });

        matrixTable.appendChild(row);

    });

}

/* =========================================
   LEAGUES
   ========================================= */

function renderLeaguesTournament(tournament){

    resultsContainer.innerHTML="";
    standingsBody.innerHTML="";
    matrixTable.innerHTML="";

    const leagues=tournament.leagues||[];

    if(!leagues.length){

        hideSection(standingsBody);
        hideSection(matrixTable);
        return;

    }

    let hasStandings=false;
    let hasMatrix=false;

    leagues.forEach((league,index)=>{

        const participants=league.participants||league.roster||[];
        const matches=[];

        Object.entries(league.shows||{}).forEach(([showId,show])=>{

            (show.matches||[]).forEach(match=>{

                const data=getMatchData(match);

                if(data)
                    matches.push({
                        ...data,
                        date:show.date,
                        show:showId
                    });

            });

        });

        if(participants.length){

            hasStandings=true;

            const title=document.createElement("tr");

            title.innerHTML=`
                <th colspan="7">${league.name||`LEAGUE ${index+1}`}</th>
            `;

            standingsBody.appendChild(title);

            buildStandings(participants,matches)
                .forEach((w,index)=>{

                    const row=document.createElement("tr");

                    row.innerHTML=`
                        <td>${index+1}</td>
                        <td>${createWrestlerLink(w.name)}</td>
                        <td>${w.played}</td>
                        <td>${w.wins}</td>
                        <td>${w.draws}</td>
                        <td>${w.losses}</td>
                        <td>${w.points}</td>
                    `;

                    if(index===0)row.classList.add("champion");
                    if(index===participants.length-1)row.classList.add("relegation");

                    standingsBody.appendChild(row);

                });

        }

        if(participants.length){

            hasMatrix=true;

            const title=document.createElement("tr");

            title.innerHTML=`
                <th colspan="${participants.length+1}">
                    ${league.name||`LEAGUE ${index+1}`}
                </th>
            `;

            matrixTable.appendChild(title);

            const header=document.createElement("tr");

            header.innerHTML="<th>WRESTLER</th>";

            participants.forEach(name=>{

                const th=document.createElement("th");
                th.textContent=name;
                header.appendChild(th);

            });

            matrixTable.appendChild(header);

            renderLeagueMatrix(participants,matches);

        }

        Object.entries(league.shows||{}).forEach(([showId,show])=>{

            renderPhase(
                `${league.name||"LEAGUE"} — ${showId.replace(/-/g," ").toUpperCase()}`,
                (show.matches||[]).map(getMatchData).filter(Boolean)
            );

        });

        if(league.finalMatches?.length&&league.bracketFormat){

            renderBracketMatches(
                league.finalMatches.map(getMatchData).filter(Boolean),
                resultsContainer,
                league.bracketFormat,
                league.bracketTitle
            );

        }

    });

    if(tournament.finalMatches?.length&&tournament.bracketFormat){

        renderBracketMatches(
            tournament.finalMatches.map(getMatchData).filter(Boolean),
            resultsContainer,
            tournament.bracketFormat,
            tournament.bracketTitle
        );

    }

    if(hasStandings)showSection(standingsBody);
    else hideSection(standingsBody);

    if(hasMatrix)showSection(matrixTable);
    else hideSection(matrixTable);

}

/* =========================================
   PHASE
   ========================================= */

function renderPhase(title,matches){

    matches=matches.filter(Boolean);

    if(!matches.length)return;

    const section=document.createElement("div");
    section.className="championship-phase";

    const heading=document.createElement("div");
    heading.className="results-date";
    heading.textContent=title;

    section.appendChild(heading);

    matches.forEach(match=>{
        section.appendChild(createMatchCard(match));
    });

    resultsContainer.appendChild(section);

}

/* =========================================
   BRACKET
   ========================================= */

function renderBracket(tournament){

    const matches=[];

    Object.entries(tournament.shows||{}).forEach(([showId,show])=>{

        (show.matches||[]).forEach(match=>{

            const data=getMatchData(match);

            if(data)
                matches.push({
                    ...data,
                    showId,
                    date:show.date
                });

        });

    });

    (tournament.finalMatches||[]).forEach(match=>{

        const data=getMatchData(match);

        if(data)
            matches.push(data);

    });

    renderBracketMatches(
        matches,
        resultsContainer,
        tournament.bracketFormat||"QUARTERS_SEMIFINALS_FINAL",
        tournament.bracketTitle||"BRACKET"
    );

}

/* =========================================
   GENERIC BRACKET
   ========================================= */

function renderBracketMatches(matches,container,format,title){

    const valid=matches.filter(match=>
        match?.wrestler1&&
        match?.wrestler2&&
        match?.score1!==undefined&&
        match?.score2!==undefined
    );

    if(!valid.length)return;

    const heading=document.createElement("div");
    heading.className="results-date";
    heading.textContent=title||"BRACKET";

    container.appendChild(heading);

    const bracket=document.createElement("div");
    bracket.className="chamber-bracket";

    let rounds=[];

    if(format==="QUARTERS_SEMIFINALS_FINAL"){

        rounds=[
            {title:"QUARTERFINALS",matches:valid.slice(0,4)},
            {title:"SEMIFINALS",matches:valid.slice(4,6)},
            {title:"FINAL",matches:valid.slice(6,7)}
        ];

    }else if(format==="SEMIFINALS_FINAL"){

        rounds=[
            {title:"SEMIFINALS",matches:valid.slice(0,2)},
            {title:"FINAL",matches:valid.slice(2,3)}
        ];

    }else if(format==="SEMIFINALS_FINAL_CHAMPION"){

        rounds=[
            {title:"SEMIFINALS",matches:valid.slice(0,2)},
            {title:"FINAL",matches:valid.slice(2,3)},
            {title:"CHAMPIONSHIP MATCH",matches:valid.slice(3,4)}
        ];

    }else{

        rounds=[
            {title:"FINAL",matches:valid}
        ];

    }

    rounds.forEach(round=>{

        if(!round.matches.length)return;

        const column=document.createElement("div");
        column.className="bracket-round";

        const roundTitle=document.createElement("h3");
        roundTitle.textContent=round.title;

        column.appendChild(roundTitle);

        round.matches.forEach(match=>{
            column.appendChild(createBracketMatch(match));
        });

        bracket.appendChild(column);

    });

    container.appendChild(bracket);

}

/* =========================================
   BRACKET MATCH
   ========================================= */

function createBracketMatch(match){

    const card=document.createElement("div");
    card.className="bracket-match";

    addChampionshipHeader(card,match);

    if(match.wrestler3){

        const players=[
            [match.wrestler1,match.score1],
            [match.wrestler2,match.score2],
            [match.wrestler3,match.score3]
        ];

        const maxScore=Math.max(...players.map(p=>p[1]));

        players.forEach(player=>{

            const row=document.createElement("div");

            row.className=player[1]===maxScore?"winner":"";

            row.innerHTML=`
                ${createWrestlerLink(player[0])}
                <span>${player[1]}</span>
            `;

            card.appendChild(row);

        });

    }else{

        const winner1=match.score1>match.score2;
        const winner2=match.score2>match.score1;

        const row1=document.createElement("div");
        row1.className=winner1?"winner":"";
        row1.innerHTML=`
            ${createWrestlerLink(match.wrestler1)}
            <span>${match.score1}</span>
        `;

        const row2=document.createElement("div");
        row2.className=winner2?"winner":"";
        row2.innerHTML=`
            ${createWrestlerLink(match.wrestler2)}
            <span>${match.score2}</span>
        `;

        card.appendChild(row1);
        card.appendChild(row2);

    }

    return card;

}

/* =========================================
   CHAMPIONSHIP
   ========================================= */

function addChampionshipHeader(card,match){

    if(!match.championship)return;

    const championship=document.createElement("div");
    championship.className="bracket-championship";

    championship.innerHTML=`
        <div class="bracket-championship-title">
            ${match.championship}
        </div>

        ${
            match.champion&&match.championshipImage
            ?
            `
            <div class="bracket-champion">
                <img src="${match.championshipImage}" style="width:22px;height:22px;object-fit:contain;">
                ${createWrestlerLink(match.champion)}
            </div>
            `
            :""
        }
    `;

    championship.style.setProperty(
        "--championship-color",
        match.championshipColor||"#d4af37"
    );

    card.appendChild(championship);

}

/* =========================================
   RESULTS
   ========================================= */

function renderResults(tournament){

    resultsContainer.innerHTML="";

    Object.entries(tournament.shows||{}).forEach(([showId,show])=>{

        const matches=(show.matches||[])
            .map(getMatchData)
            .filter(Boolean);

        if(!matches.length)return;

        renderPhase(
            showId.replace(/-/g," ").toUpperCase(),
            matches
        );

    });

    if(tournament.finalMatches?.length&&tournament.bracketFormat){

        renderBracketMatches(
            tournament.finalMatches.map(getMatchData).filter(Boolean),
            resultsContainer,
            tournament.bracketFormat,
            tournament.bracketTitle
        );

    }

}

/* =========================================
   MATCH CARD
   ========================================= */

function createMatchCard(match){

    if(match?.type==="EVENT_REFERENCE")
        match=resolveEventReference(match);

    if(!match)return document.createElement("div");

    const card=document.createElement("div");
    card.className="result-card";

    const winner1=match.score1>match.score2;
    const winner2=match.score2>match.score1;

    if(winner1)
        card.classList.add("wrestler1-win");
    else if(winner2)
        card.classList.add("wrestler2-win");
    else
        card.classList.add("draw");

    if(match.championship){

        card.addEventListener("click",e=>{

            e.stopPropagation();

            document
                .querySelectorAll(".result-card.selected")
                .forEach(el=>el.classList.remove("selected"));

            card.classList.add("selected");

        });

        const championship=document.createElement("div");
        championship.className="bracket-championship";

        championship.innerHTML=`
            <div class="bracket-championship-title">
                ${match.championship}
            </div>

            ${
                match.champion&&match.championshipImage
                ?
                `
                <div class="bracket-champion">
                    <img src="${match.championshipImage}" style="width:22px;height:22px;object-fit:contain;">
                    ${createWrestlerLink(match.champion)}
                </div>
                `
                :""
            }
        `;

        championship.style.setProperty(
            "--championship-color",
            match.championshipColor||"#d4af37"
        );

        card.appendChild(championship);

    }else{

        card.addEventListener("click",()=>{

            document
                .querySelectorAll(".result-card.selected")
                .forEach(el=>el.classList.remove("selected"));

            card.classList.add("selected");

        });

    }

    card.innerHTML+=`
        <div class="result-wrestler">
            ${
                match.champion===match.wrestler1&&match.championshipImage
                ?
                `<img src="${match.championshipImage}" style="width:22px;height:22px;object-fit:contain;vertical-align:middle;margin-right:5px;">`
                :""
            }
            ${createWrestlerLink(match.wrestler1)}
        </div>

        <div class="result-score">
            ${match.score1} - ${match.score2}
        </div>

        <div class="result-wrestler">
            ${
                match.champion===match.wrestler2&&match.championshipImage
                ?
                `<img src="${match.championshipImage}" style="width:22px;height:22px;object-fit:contain;vertical-align:middle;margin-right:5px;">`
                :""
            }
            ${createWrestlerLink(match.wrestler2)}
        </div>
    `;

    return card;

}

/* =========================================
   CLEAR SELECTED
   ========================================= */

document.addEventListener("click",e=>{

    if(!e.target.closest(".result-card")){

        document
            .querySelectorAll(".result-card.selected")
            .forEach(el=>el.classList.remove("selected"));

    }

});
