/* =========================================
   MI WRESTLING
   SUPERSTAR PAGE
   ========================================= */

const params=new URLSearchParams(location.search);
const wrestlerId=params.get("id");

const nameEl=document.getElementById("superstar-name");
const nicknameEl=document.getElementById("superstar-nickname");
const brandEl=document.getElementById("superstar-brand");
const imageEl=document.getElementById("superstar-image");
const winsEl=document.getElementById("wins");
const lossesEl=document.getElementById("losses");
const drawsEl=document.getElementById("draws");
const singlesEl=document.getElementById("singles-record");
const tagEl=document.getElementById("tag-record");
const sixManEl=document.getElementById("six-man-record");
const historyEl=document.getElementById("match-history");

function slug(name){
    return String(name)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g,"-")
        .replace(/^-|-$/g,"");
}

function findWrestler(){
    if(typeof wrestlers==="undefined")return null;
    return wrestlers.find(w=>slug(w.name)===wrestlerId);
}

const wrestler=findWrestler();

if(!wrestler){
    nameEl.textContent="SUPERSTAR NOT FOUND";
}else{
    nameEl.textContent=wrestler.name||"";
    nicknameEl.textContent=wrestler.nickname||"";
    brandEl.textContent=wrestler.brand||"";
    imageEl.src=wrestler.image||"images/Vacante.jpg";
    imageEl.alt=wrestler.name||"";
    renderRecords();
}

/* =========================================
   PARTICIPANTS
   ========================================= */

function participants(result){

    let list=[];

    if(result.wrestler1)list.push(result.wrestler1);
    if(result.wrestler2)list.push(result.wrestler2);

    if(Array.isArray(result.team1))
        list.push(...result.team1.flat());

    if(Array.isArray(result.team2))
        list.push(...result.team2.flat());

    if(Array.isArray(result.team3))
        list.push(...result.team3.flat());

    if(Array.isArray(result.team4))
        list.push(...result.team4.flat());

    if(Array.isArray(result.team5))
        list.push(...result.team5.flat());

    if(Array.isArray(result.team6))
        list.push(...result.team6.flat());

    if(Array.isArray(result.participants))
        list.push(...result.participants);

    return[...new Set(list.filter(Boolean))];

}

function isThisWrestler(name){
    return name&&slug(name)===wrestlerId;
}

function rivals(result){
    return participants(result)
        .filter(n=>!isThisWrestler(n));
}

/* =========================================
   OUTCOME
   ========================================= */

function outcome(result){

    const people=participants(result);

    if(!people.some(isThisWrestler))
        return null;

    /* =====================================
       ELIMINATION CHAMBER TAG TEAM
       ===================================== */

    if(
        result.type==="ELIMINATION CHAMBER"&&
        result.team1&&
        result.team2&&
        result.team3&&
        result.team4&&
        result.team5&&
        result.team6&&
        result.winner
    ){

        const teams=[
            result.team1,
            result.team2,
            result.team3,
            result.team4,
            result.team5,
            result.team6
        ];

        const winnerText=
            String(result.winner)
            .toLowerCase();

        const winningTeam=
            teams.find(team=>
                team
                .flat()
                .some(name=>
                    winnerText.includes(
                        String(name).toLowerCase()
                    )
                )
            );

        if(!winningTeam)
            return null;

        return winningTeam
            .flat()
            .some(isThisWrestler)
                ?"WIN"
                :"LOSS";
    }

    /* =====================================
       WINNER NORMAL
       ===================================== */

    if(result.winner){
        return isThisWrestler(result.winner)
            ?"WIN"
            :"LOSS";
    }

    /* =====================================
       MULTI PARTICIPANT CON SCORES
       ===================================== */

    if(
        Array.isArray(result.participants)&&
        Array.isArray(result.scores)&&
        result.participants.length===result.scores.length
    ){

        const scores=result.scores.map(Number);

        if(scores.some(isNaN))
            return null;

        const highest=Math.max(...scores);
        const winnerIndexes=[];

        scores.forEach((score,index)=>{
            if(score===highest)
                winnerIndexes.push(index);
        });

        const thisIndex=
            result.participants.findIndex(isThisWrestler);

        if(winnerIndexes.length!==1){
            return winnerIndexes.includes(thisIndex)
                ?"WIN"
                :"DRAW";
        }

        return isThisWrestler(
            result.participants[winnerIndexes[0]]
        )
            ?"WIN"
            :"LOSS";
    }

    /* =====================================
       SCORE 1 VS SCORE 2
       ===================================== */

    if(
        result.score1===undefined||
        result.score2===undefined
    )
        return null;

    const a=Number(result.score1);
    const b=Number(result.score2);

    if(isNaN(a)||isNaN(b))
        return null;

    if(
        result.wrestler1&&
        isThisWrestler(result.wrestler1)
    ){
        if(a>b)return"WIN";
        if(a<b)return"LOSS";
        return"DRAW";
    }

    if(
        result.wrestler2&&
        isThisWrestler(result.wrestler2)
    ){
        if(b>a)return"WIN";
        if(b<a)return"LOSS";
        return"DRAW";
    }

    if(
        Array.isArray(result.team1)&&
        result.team1.flat().some(isThisWrestler)
    ){
        if(a>b)return"WIN";
        if(a<b)return"LOSS";
        return"DRAW";
    }

    if(
        Array.isArray(result.team2)&&
        result.team2.flat().some(isThisWrestler)
    ){
        if(b>a)return"WIN";
        if(b<a)return"LOSS";
        return"DRAW";
    }

    return null;
}

/* =========================================
   CATEGORY
   ========================================= */

function category(result){

    const type=(result.type||"").toUpperCase();

    if(
        type==="TAG TEAM"||
        type==="LADDER TAG"||
        type==="ELIMINATION CHAMBER TAG TEAM"||
        type==="TRIPLE THREAT TAG"||
        type==="4-WAY TAG"
    )
        return"TAG";

    if(
        type==="6 VS 6"||
        type==="6-MAN TAG TEAM"||
        type==="WARGAMES"
    )
        return"SIX";

    return"SINGLES";
}

/* =========================================
   TOURNAMENT LINK
   ========================================= */

function tournamentId(event,result){

    if(!result.tournament)
        return null;

    const n=
        (String(result.tournament).match(/\d+/)||["1"])[0];

    const brand=
        (result.brand||event.brand||"").toUpperCase();

    if(brand==="RAW")
        return`raw-${n}`;

    if(brand==="SMACKDOWN")
        return`smackdown-${n}`;

    if(brand==="NXT")
        return`nxt-${n}`;

    return null;
}

function matchLink(event,result,index){

    if(event.outsiderKey){

        return`outsiderRoad.html?id=${
            encodeURIComponent(event.outsiderKey)
        }`;

    }

    const tournament=
        tournamentId(event,result);

    if(tournament){

        return`torneoroad.html?id=${
            encodeURIComponent(tournament)
        }`;

    }

    return`event.html?id=${
        encodeURIComponent(event.id)
    }&match=${index}`;
}

function matchLabel(result){
    return result.match||result.type||"SINGLES";
}

/* =========================================
   DATE
   ========================================= */

function parseDate(date){

    if(!date)return 0;

    const[
        day,
        month,
        year
    ]=String(date).split("/");

    return new Date(
        Number(year),
        Number(month)-1,
        Number(day)
    ).getTime()||0;
}

/* =========================================
   ADAPT TOURNAMENT RESULT
   ========================================= */

function adaptTournamentResult(result){

    if(!result)
        return null;

    if(Array.isArray(result)){

        const wrestler1=result[0]||"";
        const wrestler2=result[1]||"";
        const score1=result[2]??"";
        const score2=result[3]??"";

        let winner=null;

        const s1=Number(score1);
        const s2=Number(score2);

        if(!isNaN(s1)&&!isNaN(s2)){

            if(s1>s2)
                winner=wrestler1;

            else if(s2>s1)
                winner=wrestler2;

        }

        return{
            type:"SINGLES",
            wrestler1,
            wrestler2,
            score1,
            score2,
            winner
        };
    }

    const wrestler1=
        result.wrestler1||
        result.a||
        result.player1||
        result.p1||
        "";

    const wrestler2=
        result.wrestler2||
        result.b||
        result.player2||
        result.p2||
        "";

    const score1=
        result.score1!==undefined
            ?result.score1
            :result.scoreA!==undefined
                ?result.scoreA
                :"";

    const score2=
        result.score2!==undefined
            ?result.score2
            :result.scoreB!==undefined
                ?result.scoreB
                :"";

    let winner=result.winner||null;

    if(!winner){

        const s1=Number(score1);
        const s2=Number(score2);

        if(!isNaN(s1)&&!isNaN(s2)){

            if(s1>s2)
                winner=wrestler1;

            else if(s2>s1)
                winner=wrestler2;

        }
    }

    return{
        type:result.type||"SINGLES",
        wrestler1,
        wrestler2,
        score1,
        score2,
        winner
    };
}

/* =========================================
   TOURNAMENT EVENTS
   ========================================= */

function getTournamentEvents(){

    const list=[];

    if(typeof tournamentData==="undefined")
        return list;

    const added=new Set();

    Object.entries(tournamentData)
    .forEach(([tournamentKey,data])=>{

        if(!data)return;

        function addEvent(id,event,results){

            if(!event)return;

            if(
                !/^raw-\d+$/.test(id)&&
                !/^smackdown-\d+$/.test(id)&&
                !/^nxt-\d+$/.test(id)
            )
                return;

            const uniqueKey=
                `${id}-${tournamentKey}`;

            if(added.has(uniqueKey))
                return;

            added.add(uniqueKey);

            list.push({

                id,

                title:
                    id.startsWith("nxt-")
                        ?"NXT #"+id.split("-")[1]
                        :id.startsWith("raw-")
                            ?"RAW #"+id.split("-")[1]
                            :"SMACKDOWN #"+id.split("-")[1],

                date:event.date||"",

                brand:
                    id.startsWith("nxt-")
                        ?"NXT"
                        :id.startsWith("raw-")
                            ?"RAW"
                            :"SMACKDOWN",

                type:
                    id.startsWith("nxt-")
                        ?"NXT"
                        :"WEEKLY",

                results:(results||[])
                    .map(adaptTournamentResult)
                    .filter(Boolean),

                tournamentSource:true,
                tournamentKey

            });
        }

        if(data.weekly){

            Object.entries(data.weekly)
            .forEach(([id,event])=>{

                addEvent(
                    id,
                    event,
                    event.results||[]
                );

            });

        }

        if(
            data.matches&&
            !Array.isArray(data.matches)
        ){

            Object.entries(data.matches)
            .forEach(([id,event])=>{

                addEvent(
                    id,
                    event,
                    event.results||[]
                );

            });

        }

        if(data.shows){

            Object.entries(data.shows)
            .forEach(([id,event])=>{

                addEvent(
                    id,
                    event,
                    event.matches||[]
                );

            });

        }

    });

    return list;
}

/* =========================================
   OUTSIDER EVENTS
   ========================================= */

function getOutsiderEvents(){

    const list=[];

    if(typeof outsiderData==="undefined")
        return list;

    Object.entries(outsiderData)
    .forEach(([tournamentKey,data])=>{

        if(!data)return;

        const brand=
            (data.brand||"OUTSIDER").toUpperCase();

        const title=
            data.title||
            tournamentKey
                .replace(/^outsider-/,"")
                .replace(/-/g," ")
                .toUpperCase();

        if(data.shows){

            Object.entries(data.shows)
            .forEach(([showId,event])=>{

                if(!event)return;

                list.push({

                    id:showId,

                    title:
                        showId
                            .replace(/-/g," ")
                            .toUpperCase(),

                    date:event.date||"",

                    brand,

                    type:brand,

                    results:(event.matches||[])
                        .map(adaptTournamentResult)
                        .filter(Boolean),

                    outsiderSource:true,
                    outsiderKey:tournamentKey,
                    tournamentKey,
                    tournamentTitle:title

                });

            });

        }

        if(data.finalMatches){

            const finalDate=
                data.finalDate||
                data.date||
                "";

            list.push({

                id:
                    data.finalEvent||
                    tournamentKey+"-final",

                title:
                    (data.finalEvent||
                    title)
                    .replace(/-/g," ")
                    .toUpperCase(),

                date:finalDate,

                brand,

                type:"SPECIAL EVENT",

                results:data.finalMatches
                    .map(adaptTournamentResult)
                    .filter(Boolean),

                outsiderSource:true,
                outsiderKey:tournamentKey,
                tournamentKey,
                tournamentTitle:title,
                finalEvent:true

            });

        }

    });

    return list;
}

/* =========================================
   RECORDS
   ========================================= */

function renderRecords(){

    let wins=0;
    let losses=0;
    let draws=0;

    let singles={w:0,l:0,d:0};
    let tag={w:0,l:0,d:0};
    let six={w:0,l:0,d:0};

    let history=[];

    /* =====================================
       PROCESS RESULT
       ===================================== */

    function processResult(
        eventId,
        event,
        result,
        index
    ){

        if(
            !participants(result)
            .some(isThisWrestler)
        )
            return;

        const resultOutcome=
            outcome(result);

        if(!resultOutcome)
            return;

        if(resultOutcome==="WIN")
            wins++;

        if(resultOutcome==="LOSS")
            losses++;

        if(resultOutcome==="DRAW")
            draws++;

        const cat=category(result);

        const target=
            cat==="TAG"
                ?tag
                :cat==="SIX"
                    ?six
                    :singles;

        if(resultOutcome==="WIN")
            target.w++;

        if(resultOutcome==="LOSS")
            target.l++;

        if(resultOutcome==="DRAW")
            target.d++;

        history.push({

            eventId,
            event,
            result,
            index,
            outcome:resultOutcome,
            rivals:rivals(result),

            link:matchLink(
                {
                    id:eventId,
                    ...event
                },
                result,
                index
            )

        });

    }

    /* =====================================
       EVENT DATA
       ===================================== */

    if(typeof eventData!=="undefined"){

        Object.entries(eventData)
        .forEach(([eventId,event])=>{

            (event.results||[])
            .forEach((result,index)=>{

                processResult(
                    eventId,
                    event,
                    result,
                    index
                );

            });

        });

    }

    /* =====================================
       TOURNAMENT DATA
       ===================================== */

    getTournamentEvents()
    .forEach(event=>{

        (event.results||[])
        .forEach((result,index)=>{

            processResult(
                event.id,
                event,
                result,
                index
            );

        });

    });

    /* =====================================
       OUTSIDER DATA
       ===================================== */

    getOutsiderEvents()
    .forEach(event=>{

        (event.results||[])
        .forEach((result,index)=>{

            processResult(
                event.id,
                event,
                result,
                index
            );

        });

    });

    /* =====================================
       DISPLAY RECORD
       ===================================== */

    winsEl.textContent=wins;
    lossesEl.textContent=losses;
    drawsEl.textContent=draws;

    singlesEl.textContent=
        `${singles.w} - ${singles.d} - ${singles.l}`;

    tagEl.textContent=
        `${tag.w} - ${tag.d} - ${tag.l}`;

    sixManEl.textContent=
        `${six.w} - ${six.d} - ${six.l}`;

    history.sort((a,b)=>
        parseDate(b.event.date)-
        parseDate(a.event.date)
    );

    renderHistory(history);
}

/* =========================================
   MATCH HISTORY
   SEARCH + PAGINATION
   ========================================= */

function renderHistory(history){

    const searchInput=
        document.getElementById("history-search");

    const pagesContainer=
        document.getElementById("history-pages");

    let currentHistoryPage=1;

    const matchesPerPage=20;

    function getFilteredHistory(){

        const search=
            (searchInput?.value||"")
            .trim()
            .toLowerCase();

        if(!search)
            return history;

        return history.filter(item=>{

            const eventTitle=
                item.event?.title||"";

            const eventType=
                item.event?.type||"";

            const match=
                matchLabel(item.result)||"";

            const rivalsText=
                (item.rivals||[]).join(" ");

            const outcomeText=
                item.outcome||"";

            const date=
                item.event?.date||"";

            const text=
                `${eventTitle}
                ${eventType}
                ${match}
                ${rivalsText}
                ${outcomeText}
                ${date}`
                .toLowerCase();

            return text.includes(search);

        });

    }

    function createPageButtons(totalPages){

        pagesContainer.innerHTML="";

        for(
            let i=1;
            i<=totalPages;
            i++
        ){

            const button=
                document.createElement("button");

            button.className="history-page";

            if(i===currentHistoryPage)
                button.classList.add("active");

            button.textContent=`PART ${i}`;

            button.addEventListener(
                "click",
                ()=>{
                    currentHistoryPage=i;
                    renderPage();
                }
            );

            pagesContainer.appendChild(button);

        }

    }

    function renderPage(){

        const filtered=
            getFilteredHistory();

        const totalPages=
            Math.max(
                1,
                Math.ceil(
                    filtered.length/
                    matchesPerPage
                )
            );

        if(currentHistoryPage>totalPages)
            currentHistoryPage=totalPages;

        const start=
            (currentHistoryPage-1)*
            matchesPerPage;

        const end=
            start+matchesPerPage;

        const pageItems=
            filtered.slice(start,end);

        historyEl.innerHTML="";

        if(!filtered.length){

            historyEl.innerHTML=
                "<p>NO MATCHES FOUND.</p>";

            pagesContainer.innerHTML="";

            return;
        }

        pageItems.forEach(item=>{

            const rivalText=
                item.rivals.length
                    ?item.rivals.join(" / ")
                    :"NO RIVAL";

            const div=
                document.createElement("a");

            div.className=
                `history-item result-${item.outcome.toLowerCase()}`;

            div.href=item.link;

            div.innerHTML=`

                <div class="history-top">

                    <div class="history-event">
                        ${item.event.title||"EVENT"}
                    </div>

                    <div class="history-date">
                        ${item.event.date||""}
                    </div>

                </div>

                <div class="history-type">

                    ${
                        item.event.type==="PLE"
                            ?"SPECIAL EVENT"
                            :item.event.type||"EVENT"
                    }

                    · ${matchLabel(item.result)}

                </div>

                <div class="history-rivals">

                    <span>RIVAL</span>

                    ${rivalText}

                </div>

                <div class="history-result">
                    ${item.outcome}
                </div>

            `;

            historyEl.appendChild(div);

        });

        createPageButtons(totalPages);

    }

    if(searchInput){

        searchInput.addEventListener(
            "input",
            ()=>{
                currentHistoryPage=1;
                renderPage();
            }
        );

    }

    renderPage();

}
