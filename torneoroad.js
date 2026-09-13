alert("TORNEOROAD.JS FUNCIONA");

const urlParams=new URLSearchParams(window.location.search);
const tournamentId=urlParams.get("id");
const tournaments=[];

/* =========================================
   TOURNAMENTS
   ========================================= */

for(let number=25;number>=1;number--){
    tournaments.push({
        id:`raw-${number}`,
        number,
        brand:"RAW",
        division:"FIRST DIVISION",
        title:`TOURNAMENT ${number}`
    });

    tournaments.push({
        id:`smackdown-${number}`,
        number,
        brand:"SMACKDOWN",
        division:"FIRST DIVISION",
        title:`TOURNAMENT ${number}`
    });
}

for(let number=18;number>=1;number--){
    tournaments.push({
        id:`nxt-${number}`,
        number,
        brand:"NXT",
        division:"SECOND DIVISION",
        title:`TOURNAMENT ${number}`
    });
}

/* =========================================
   SPECIAL CHAMPIONSHIPS
   ========================================= */

const specialChampionships={

    "campeonato-1":{
        brand:"CHAMPIONSHIP 1",
        title:"CHAMPIONSHIP 1",
        division:"LEAGUE / PLAY-IN / ELIMINATION CHAMBER"
    },

    "campeonato-2":{
        brand:"CHAMPIONSHIP 2",
        title:"CHAMPIONSHIP 2",
        division:"RAW / SMACKDOWN / WRESTLEMANIA"
    },

    "campeonato-3":{
        brand:"CHAMPIONSHIP 3",
        title:"CHAMPIONSHIP 3",
        division:"LEAGUE / BACKLASH"
    },

    "campeonato-4":{
        brand:"CHAMPIONSHIP 4",
        title:"CHAMPIONSHIP 4",
        division:"RAW / SMACKDOWN / NXT / NIGHT OF CHAMPIONS"
    }

};

const tournament=tournaments.find(item=>item.id===tournamentId);
const special=specialChampionships[tournamentId];

/* =========================================
   DOM
   ========================================= */

const tournamentBrand=document.getElementById("tournament-brand");
const tournamentTitle=document.getElementById("tournament-title");
const tournamentDivision=document.getElementById("tournament-division");

const draftContainer=document.getElementById("draft-container");
const standingsBody=document.getElementById("standings-body");
const matrixTable=document.getElementById("matrix-table");
const resultsContainer=document.getElementById("results-container");

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

    const data=
        typeof tournamentData!=="undefined"
            ? tournamentData[tournamentId]
            : null;

    const image=data?.images?.[name];

    if(image){
        return image;
    }

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

function clearSections(){

    draftContainer.innerHTML="";
    standingsBody.innerHTML="";
    matrixTable.innerHTML="";
    resultsContainer.innerHTML="";

}

function showEditing(){

    draftContainer.innerHTML="<p>EDITING</p>";

    standingsBody.innerHTML=
        `<tr><td colspan="7">EDITING</td></tr>`;

    matrixTable.innerHTML=
        "<tr><td>EDITING</td></tr>";

    resultsContainer.innerHTML=
        "<p>EDITING</p>";

}

function showComingSoon(){

    draftContainer.innerHTML=
        "<p>PARTICIPANTS COMING SOON</p>";

    standingsBody.innerHTML=
        `<tr><td colspan="7">STANDINGS COMING SOON</td></tr>`;

    matrixTable.innerHTML=
        "<tr><td>MATRIX COMING SOON</td></tr>";

    resultsContainer.innerHTML=
        "<p>RESULTS COMING SOON</p>";

}

/* =========================================
   DRAFT
   ========================================= */

function renderDraft(participants){

    draftContainer.innerHTML="";

    if(!participants.length){

        draftContainer.innerHTML=
            "<p>EDITING</p>";

        return;
    }

    participants.forEach(name=>{

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

function buildStandings(participants,matches){

    const standings={};

    participants.forEach(name=>{

        standings[name]={
            name,
            played:0,
            wins:0,
            draws:0,
            losses:0,
            points:0,
            scoreFor:0,
            scoreAgainst:0
        };

    });

    matches.forEach(match=>{

        const a=standings[match.wrestler1];
        const b=standings[match.wrestler2];

        if(!a||!b){
            return;
        }

        a.played++;
        b.played++;

        a.scoreFor+=Number(match.score1);
        a.scoreAgainst+=Number(match.score2);

        b.scoreFor+=Number(match.score2);
        b.scoreAgainst+=Number(match.score1);

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

        if(b.points!==a.points){
            return b.points-a.points;
        }

        if(b.wins!==a.wins){
            return b.wins-a.wins;
        }

        return(
            (b.scoreFor-b.scoreAgainst)-
            (a.scoreFor-a.scoreAgainst)
        );

    });

}

function renderStandings(participants,matches){

    const list=buildStandings(
        participants,
        matches
    );

    standingsBody.innerHTML="";

    if(!list.length){

        standingsBody.innerHTML=
            `<tr><td colspan="7">EDITING</td></tr>`;

        return;
    }

    list.forEach((w,index)=>{

        const row=document.createElement("tr");

        row.innerHTML=`
            <td>${index+1}</td>

            <td>
                ${createWrestlerLink(w.name)}
            </td>

            <td>${w.played}</td>
            <td>${w.wins}</td>
            <td>${w.draws}</td>
            <td>${w.losses}</td>
            <td>${w.points}</td>
        `;

        if(index===0){
            row.classList.add("champion");
        }

        if(index===list.length-1){
            row.classList.add("relegation");
        }

        standingsBody.appendChild(row);

    });

}

/* =========================================
   MATCH MATRIX
   ========================================= */

function renderMatrix(participants,matches){

    matrixTable.innerHTML="";

    if(!participants.length){

        matrixTable.innerHTML=
            "<tr><td>EDITING</td></tr>";

        return;
    }

    const header=document.createElement("tr");

    header.innerHTML=
        "<th>WRESTLER</th>";

    participants.forEach(name=>{

        const th=document.createElement("th");

        th.textContent=name;

        header.appendChild(th);

    });

    matrixTable.appendChild(header);

    participants.forEach(name=>{

        const row=document.createElement("tr");

        const nameCell=document.createElement("td");

        nameCell.innerHTML=
            createWrestlerLink(name);

        row.appendChild(nameCell);

        participants.forEach(opponent=>{

            const cell=document.createElement("td");

            if(name===opponent){

                cell.textContent="—";

                row.appendChild(cell);

                return;
            }

            const match=matches.find(m=>
                (
                    m.wrestler1===name &&
                    m.wrestler2===opponent
                )||
                (
                    m.wrestler1===opponent &&
                    m.wrestler2===name
                )
            );

            if(!match){

                cell.textContent="·";
                cell.classList.add("matrix-empty");

            }else if(
                match.score1===match.score2
            ){

                cell.textContent="D";
                cell.classList.add("matrix-draw");

            }else{

                const first=
                    match.wrestler1===name;

                const won=first
                    ?match.score1>match.score2
                    :match.score2>match.score1;

                cell.textContent=
                    won?"W":"L";

                cell.classList.add(
                    won
                        ?"matrix-win"
                        :"matrix-loss"
                );

            }

            row.appendChild(cell);

        });

        matrixTable.appendChild(row);

    });

}

/* =========================================
   NORMAL RESULTS
   ========================================= */

function renderResults(matches,phases){

    resultsContainer.innerHTML="";

    if(!matches.length){

        resultsContainer.innerHTML=
            "<p>EDITING</p>";

        return;
    }

    const grouped={};

    matches.forEach(match=>{

        const date=
            match.date??"OTHER";

        if(!grouped[date]){
            grouped[date]=[];
        }

        grouped[date].push(match);

    });

    Object.keys(grouped)
    .sort((a,b)=>{

        const na=parseInt(a);
        const nb=parseInt(b);

        if(!isNaN(na)&&!isNaN(nb)){
            return na-nb;
        }

        return String(a).localeCompare(
            String(b)
        );

    })
    .forEach(date=>{

        const title=
            document.createElement("div");

        title.className="results-date";

        title.textContent=
            phases&&phases[date-1]
                ?phases[date-1]
                :date==="OTHER"
                    ?"OTHER"
                    :`DATE ${date}`;

        resultsContainer.appendChild(title);

        grouped[date].forEach(match=>{

            const result=
                document.createElement("div");

            result.className="result-card";

            if(match.score1>match.score2){

                result.classList.add(
                    "wrestler1-win"
                );

            }else if(match.score1<match.score2){

                result.classList.add(
                    "wrestler2-win"
                );

            }else{

                result.classList.add(
                    "draw"
                );

            }

            result.innerHTML=`

                <div class="result-wrestler">
                    ${createWrestlerLink(match.wrestler1)}
                </div>

                <div class="result-score">
                    ${match.score1} - ${match.score2}
                </div>

                <div class="result-wrestler">
                    ${createWrestlerLink(match.wrestler2)}
                </div>

            `;

            resultsContainer.appendChild(result);

        });

    });

}

/* =========================================
   EVENT DATA
   ========================================= */

function getEventMatches(ids){

    if(!Array.isArray(ids)){
        return [];
    }

    return ids

        .flatMap(id=>
            eventData?.[id]?.results||[]
        )

        .filter(m=>
            m.wrestler1&&
            m.wrestler2&&
            m.score1!==undefined&&
            m.score2!==undefined
        );

}

/* =========================================
   CHAMPIONSHIP 1
   ELIMINATION CHAMBER BRACKET
   ========================================= */

function renderChamberBracket(matches,container){

    const chamberMatches=matches.filter(m=>
        m.wrestler1&&
        m.wrestler2&&
        m.score1!==undefined&&
        m.score2!==undefined
    );

    const heading=document.createElement("div");

    heading.className="results-date";

    heading.textContent=
        "ELIMINATION CHAMBER";

    container.appendChild(heading);

    if(!chamberMatches.length){

        const p=document.createElement("p");

        p.textContent="EDITING";

        container.appendChild(p);

        return;
    }

    const bracket=document.createElement("div");

    bracket.className="chamber-bracket";

    const rounds=[
        {
            title:"QUARTERFINALS",
            matches:chamberMatches.slice(0,4)
        },
        {
            title:"SEMIFINALS",
            matches:chamberMatches.slice(4,6)
        },
        {
            title:"FINAL",
            matches:chamberMatches.slice(6,7)
        }
    ];

    rounds.forEach(round=>{

        const column=
            document.createElement("div");

        column.className=
            "bracket-round";

        const title=
            document.createElement("h3");

        title.textContent=
            round.title;

        column.appendChild(title);

        round.matches.forEach(match=>{

            const card=
                document.createElement("div");

            card.className=
                "bracket-match";

            const winner1=
                match.score1>match.score2;

            const winner2=
                match.score2>match.score1;

            card.innerHTML=`

                <div class="${winner1?"winner":""}">
                    ${createWrestlerLink(match.wrestler1)}
                    <span>${match.score1}</span>
                </div>

                <div class="${winner2?"winner":""}">
                    ${createWrestlerLink(match.wrestler2)}
                    <span>${match.score2}</span>
                </div>

            `;

            column.appendChild(card);

        });

        bracket.appendChild(column);

    });

    container.appendChild(bracket);

}

/* =========================================
   GENERIC PHASE
   ========================================= */

function renderPhase(title,matches){

    if(!matches.length){
        return;
    }

    const section=
        document.createElement("div");

    section.className=
        "championship-phase";

    const heading=
        document.createElement("div");

    heading.className=
        "results-date";

    heading.textContent=title;

    section.appendChild(heading);

    matches.forEach(match=>{

        const card=
            document.createElement("div");

        card.className=
            "result-card";

        if(match.score1>match.score2){

            card.classList.add(
                "wrestler1-win"
            );

        }else if(match.score1<match.score2){

            card.classList.add(
                "wrestler2-win"
            );

        }else{

            card.classList.add(
                "draw"
            );

        }

        card.innerHTML=`

            <div class="result-wrestler">
                ${createWrestlerLink(match.wrestler1)}
            </div>

            <div class="result-score">
                ${match.score1} - ${match.score2}
            </div>

            <div class="result-wrestler">
                ${createWrestlerLink(match.wrestler2)}
            </div>

        `;

        section.appendChild(card);

    });

    resultsContainer.appendChild(section);

}

/* =========================================
   NORMAL TOURNAMENT
   ========================================= */

function renderNormalTournament(data){

    const participants=
        data.participants||[];

    const matches=
        Array.isArray(data.matches)
            ?data.matches
            :[];

    renderDraft(participants);

    renderStandings(
        participants,
        matches
    );

    renderMatrix(
        participants,
        matches
    );

    renderResults(
        matches
    );

}

/* =========================================
   CHAMPIONSHIP 1
   ========================================= */

function renderChampionship1(data){

    const participants=
        data.participants||[];

    const events=
        data.events||{};

    renderDraft(participants);

    /* LEAGUE */

    const leagueEvents=
        events.league||{};

    const leagueIds=
        Object.values(leagueEvents);

    const leagueMatches=
        getEventMatches(leagueIds);

    renderStandings(
        participants,
        leagueMatches
    );

    renderMatrix(
        participants,
        leagueMatches
    );

    /* RESULTS */

    resultsContainer.innerHTML="";

    /* ELIMINATION CHAMBER FIRST */

    renderChamberBracket(
        eventData?.[events.bracket]?.results||[],
        resultsContainer
    );

    /* PLAY-IN */

    renderPhase(
        "PLAY-IN",
        eventData?.[events.playIn]?.results||[]
    );

    /* LIVE 1-5 */

    const orderedLeague=
        Object.entries(leagueEvents);

    orderedLeague.forEach(([title,id])=>{

        renderPhase(
            title,
            eventData?.[id]?.results||[]
        );

    });

}

/* =========================================
   CHAMPIONSHIP 2
   ========================================= */

function renderChampionship2(data){

    const zones=
        data.zones||{};

    const participants=[

        ...(zones.RAW||[]),

        ...(zones.SMACKDOWN||[])

    ];

    renderDraft(participants);

    /* =====================================
       LEAGUE MATCHES
       ===================================== */

    const matches=[];

    Object.values(
        data.matches||{}
    ).forEach(event=>{

        if(!event?.results){
            return;
        }

        event.results.forEach(match=>{

            matches.push({
                ...match,
                date:event.date
            });

        });

    });

    renderStandings(
        participants,
        matches
    );

    renderMatrix(
        participants,
        matches
    );

    /* =====================================
       RESULTS
       ===================================== */

    resultsContainer.innerHTML="";

    /* WRESTLEMANIA FIRST */

    const finalMatches=
        eventData?.[
            data.events?.final
        ]?.results||[];

    if(finalMatches.length){

        renderChamberBracket(
            finalMatches,
            resultsContainer
        );

    }

    /* RAW + SMACKDOWN BY DATE */

    const orderedEvents=
        Object.entries(
            data.matches||{}
        ).sort((a,b)=>{

            const da=
                a[1].date
                    .split("/")
                    .reverse()
                    .join("");

            const db=
                b[1].date
                    .split("/")
                    .reverse()
                    .join("");

            return da.localeCompare(db);

        });

    orderedEvents.forEach(([id,event])=>{

        renderPhase(
            id
                .replace(/-/g," ")
                .toUpperCase(),

            event.results||[]
        );

    });

}

/* =========================================
   CHAMPIONSHIP 3
   ========================================= */

function renderChampionship3(data){

    const participants=
        data.participants||[];

    const weekly=
        data.weekly||{};

    renderDraft(participants);

    /* =====================================
       WEEKLY MATCHES FOR TABLE + MATRIX
       ===================================== */

    const matches=[];

    Object.values(weekly).forEach(event=>{

        if(!event?.results){
            return;
        }

        event.results.forEach(match=>{

            matches.push({
                ...match,
                date:event.date
            });

        });

    });

    /* CHRONOLOGICAL ORDER */

    matches.sort((a,b)=>{

        const da=
            a.date
                .split("/")
                .reverse()
                .join("");

        const db=
            b.date
                .split("/")
                .reverse()
                .join("");

        return da.localeCompare(db);

    });

    renderStandings(
        participants,
        matches
    );

    renderMatrix(
        participants,
        matches
    );

    /* =====================================
       RESULTS
       ===================================== */

    resultsContainer.innerHTML="";

    /* =====================================
       BACKLASH FIRST
       ===================================== */

    renderBacklashBracket(
        eventData?.[
            data.bracket
        ]?.results||[],
        resultsContainer
    );

    /* =====================================
       WEEKLY BY DATE
       ===================================== */

    const orderedWeekly=
        Object.entries(weekly)
        .sort((a,b)=>{

            const da=
                a[1].date
                    .split("/")
                    .reverse()
                    .join("");

            const db=
                b[1].date
                    .split("/")
                    .reverse()
                    .join("");

            return da.localeCompare(db);

        });

    orderedWeekly.forEach(([id,event])=>{

        renderPhase(
            id
                .replace(/-/g," ")
                .toUpperCase(),

            event.results||[]
        );

    });

}

/* =========================================
   CHAMPIONSHIP 3
   BACKLASH BRACKET
   ========================================= */

function renderBacklashBracket(matches,container){

    const backlashMatches=
        matches.filter(m=>
            m.wrestler1&&
            m.wrestler2&&
            m.score1!==undefined&&
            m.score2!==undefined
        );

    const heading=
        document.createElement("div");

    heading.className=
        "results-date";

    heading.textContent=
        "BACKLASH";

    container.appendChild(heading);

    if(!backlashMatches.length){

        const p=
            document.createElement("p");

        p.textContent=
            "EDITING";

        container.appendChild(p);

        return;
    }

    const bracket=
        document.createElement("div");

    bracket.className=
        "chamber-bracket";

    const rounds=[

        {
            title:"PLAY-IN 1",
            matches:backlashMatches.slice(0,1)
        },

        {
            title:"PLAY-IN 2",
            matches:backlashMatches.slice(1,2)
        },

        {
            title:"FINAL",
            matches:backlashMatches.slice(2,3)
        },

        {
            title:"UNDISPUTED CHAMPIONSHIP",
            matches:backlashMatches.slice(3,4)
        }

    ];

    rounds.forEach(round=>{

        const column=
            document.createElement("div");

        column.className=
            "bracket-round";

        const title=
            document.createElement("h3");

        title.textContent=
            round.title;

        column.appendChild(title);

        round.matches.forEach(match=>{

            const card=
                document.createElement("div");

            card.className=
                "bracket-match";

            const winner1=
                match.score1>match.score2;

            const winner2=
                match.score2>match.score1;

            card.innerHTML=`

                <div class="${winner1?"winner":""}">
                    ${createWrestlerLink(match.wrestler1)}
                    <span>${match.score1}</span>
                </div>

                <div class="${winner2?"winner":""}">
                    ${createWrestlerLink(match.wrestler2)}
                    <span>${match.score2}</span>
                </div>

            `;

            column.appendChild(card);

        });

        bracket.appendChild(column);

    });

    container.appendChild(bracket);

}

/* =========================================
   CHAMPIONSHIP 4
   ========================================= */

function renderChampionship4(data){

    const zones=
        data.zones||{};

    const participants=[

        ...(zones.RAW||[]),

        ...(zones.SMACKDOWN||[]),

        ...(zones["NXT A"]||[]),

        ...(zones["NXT B"]||[])

    ];

    renderDraft(participants);

    if(
        Array.isArray(data.matches) &&
        data.matches.length
    ){

        renderStandings(
            participants,
            data.matches
        );

        renderMatrix(
            participants,
            data.matches
        );

        renderResults(
            data.matches,
            data.phases
        );

    }else{

        standingsBody.innerHTML=
            `<tr><td colspan="7">EDITING</td></tr>`;

        matrixTable.innerHTML=
            "<tr><td>EDITING</td></tr>";

        resultsContainer.innerHTML=
            "<p>EDITING</p>";

    }

}

/* =========================================
   PAGE RENDER
   ========================================= */

alert("LLEGUE A SPECIAL");

if(special){

    tournamentBrand.textContent=
        special.brand;

    tournamentTitle.textContent=
        special.title;

    tournamentDivision.textContent=
        special.division;

    const page=
        document.querySelector(
            ".torneoroad-page"
        );

    if(page){

        page.classList.add(
            "championship"
        );

    }

    alert(
        "TOURNAMENT DATA: "+
        typeof tournamentData
    );

    const currentData=
        tournamentData[tournamentId];

    clearSections();

    if(currentData){

        if(
            currentData.format===
            "LEAGUE_PLAYIN_ELIMINATION"
        ){

            renderChampionship1(
                currentData
            );

        }else if(
            currentData.format===
            "TWO_ZONES_ELIMINATION"
        ){

            renderChampionship2(
                currentData
            );

        }else if(
            currentData.format===
            "LEAGUE_ELIMINATION"
        ){

            renderChampionship3(
                currentData
            );

        }else if(
            currentData.format===
            "FOUR_ZONES_ELIMINATION"
        ){

            renderChampionship4(
                currentData
            );

        }else{

            showEditing();

        }

    }else{

        showEditing();

    }

}else if(tournament){

    tournamentBrand.textContent=
        tournament.brand;

    tournamentTitle.textContent=
        tournament.title;

    tournamentDivision.textContent=
        tournament.division;

    const page=
        document.querySelector(
            ".torneoroad-page"
        );

    if(page){

        page.classList.remove(
            "championship"
        );

    }

    const data=
        typeof tournamentData!=="undefined"
            ?tournamentData[tournamentId]
            :null;

    clearSections();

    if(data){

        renderNormalTournament(
            data
        );

    }else{

        showComingSoon();

    }

}else{

    showEditing();

}
