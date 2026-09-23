/* =========================================
   MI WRESTLING
   RECORDS
   ========================================= */

const wrestlerRecords=wrestlers.map(wrestler=>{

    let wins=0;
    let losses=0;
    let draws=0;

    const slug=name=>
        String(name)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g,"-")
        .replace(/^-|-$/g,"");

    const wrestlerId=slug(wrestler.name);


    /* =========================================
       WRESTLER CHECK
       ========================================= */

    function isThisWrestler(name){

        return name&&slug(name)===wrestlerId;

    }


    /* =========================================
       PARTICIPANTS
       ========================================= */

    function participants(result){

        let list=[];

        if(result.wrestler1)
            list.push(result.wrestler1);

        if(result.wrestler2)
            list.push(result.wrestler2);

        if(result.wrestler3)
            list.push(result.wrestler3);

        if(result.wrestler4)
            list.push(result.wrestler4);

        if(result.wrestler5)
            list.push(result.wrestler5);

        if(result.wrestler6)
            list.push(result.wrestler6);

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
            list.push(...result.participants.flat());

        return[
            ...new Set(
                list.filter(Boolean)
            )
        ];

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
           EXPLICIT WINNER
           ===================================== */

        if(result.winner){

            return isThisWrestler(result.winner)
                ?"WIN"
                :"LOSS";

        }


        /* =====================================
           PARTICIPANTS + SCORES
           ===================================== */

        if(
            Array.isArray(result.participants)&&
            Array.isArray(result.scores)&&
            result.participants.length===
            result.scores.length
        ){

            const scores=
                result.scores.map(Number);

            if(scores.some(isNaN))
                return null;

            const highest=
                Math.max(...scores);

            const winnerIndexes=[];

            scores.forEach((score,index)=>{

                if(score===highest)
                    winnerIndexes.push(index);

            });

            const thisIndex=
                result.participants.findIndex(
                    isThisWrestler
                );

            if(thisIndex===-1)
                return null;

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


        /* WRESTLER 1 */

        if(
            result.wrestler1&&
            isThisWrestler(result.wrestler1)
        ){

            if(a>b)return"WIN";
            if(a<b)return"LOSS";

            return"DRAW";

        }


        /* WRESTLER 2 */

        if(
            result.wrestler2&&
            isThisWrestler(result.wrestler2)
        ){

            if(b>a)return"WIN";
            if(b<a)return"LOSS";

            return"DRAW";

        }


        /* TEAM 1 */

        if(
            Array.isArray(result.team1)&&
            result.team1.flat().some(isThisWrestler)
        ){

            if(a>b)return"WIN";
            if(a<b)return"LOSS";

            return"DRAW";

        }


        /* TEAM 2 */

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
       ADD OUTCOME
       ========================================= */

    function addOutcome(result){

        const resultOutcome=
            outcome(result);

        if(resultOutcome==="WIN")
            wins++;

        if(resultOutcome==="LOSS")
            losses++;

        if(resultOutcome==="DRAW")
            draws++;

    }


    /* =========================================
       ADAPT TOURNAMENT RESULT
       ========================================= */

    function adaptTournamentResult(result){

        if(!result)
            return null;


        if(Array.isArray(result)){

            const wrestler1=
                result[0]||"";

            const wrestler2=
                result[1]||"";

            const score1=
                result[2]??"";

            const score2=
                result[3]??"";


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

            ...result,

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


            function addEvent(
                id,
                event,
                results
            ){

                if(!event)
                    return;


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

            if(!data)
                return;


            const brand=
                (data.brand||"OUTSIDER")
                .toUpperCase();


            if(data.shows){

                Object.entries(data.shows)
                .forEach(([showId,event])=>{

                    if(!event)
                        return;


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

                        tournamentKey

                    });

                });

            }


            if(data.finalMatches){

                list.push({

                    id:
                        data.finalEvent||
                        tournamentKey+"-final",

                    title:
                        (
                            data.finalEvent||
                            tournamentKey
                        )
                        .replace(/-/g," ")
                        .toUpperCase(),

                    date:
                        data.finalDate||
                        data.date||
                        "",

                    brand,

                    type:"SPECIAL EVENT",

                    results:data.finalMatches
                        .map(adaptTournamentResult)
                        .filter(Boolean),

                    outsiderSource:true,

                    outsiderKey:tournamentKey,

                    tournamentKey,

                    finalEvent:true

                });

            }

        });


        return list;

    }


    /* =========================================
       EVENT DATA
       ========================================= */

    Object.values(eventData||{})
    .forEach(event=>{

        (event.results||[])
        .forEach(addOutcome);

    });


    /* =========================================
       TOURNAMENT DATA
       ========================================= */

    getTournamentEvents()
    .forEach(event=>{

        (event.results||[])
        .forEach(addOutcome);

    });


    /* =========================================
       OUTSIDER DATA
       ========================================= */

    getOutsiderEvents()
    .forEach(event=>{

        (event.results||[])
        .forEach(addOutcome);

    });


    /* =========================================
       RETURN
       ========================================= */

    return{

        id:wrestlerId,

        name:wrestler.name,

        brand:wrestler.brand||"NO BRAND",

        wins,

        losses,

        draws

    };

});


/* =========================================
   ELEMENTS
   ========================================= */

const recordsContainer=
    document.getElementById("records-container");

const searchInput=
    document.getElementById("record-search");

const filterButtons=
    document.querySelectorAll(".record-filter");

const pagesContainer=
    document.getElementById("record-pages");


/* =========================================
   SETTINGS
   ========================================= */

const wrestlersPerPage=20;

let currentPage=1;

let currentBrand="ALL";


/* =========================================
   RENDER RECORDS
   ========================================= */

function renderRecords(recordList){

    recordsContainer.innerHTML="";


    if(recordList.length===0){

        recordsContainer.innerHTML=`

            <div class="record-card">

                <div class="record-name">
                    NO WRESTLERS FOUND
                </div>

            </div>

        `;

        return;

    }


    const start=
        (currentPage-1)*
        wrestlersPerPage;

    const end=
        start+
        wrestlersPerPage;

    const pageRecords=
        recordList.slice(start,end);


    pageRecords.forEach(wrestler=>{

        const card=
            document.createElement("div");

        card.className="record-card";


        card.innerHTML=`

            <div class="record-top">

                <div class="record-name">
                    ${wrestler.name}
                </div>

                <div class="record-brand">
                    ${wrestler.brand}
                </div>

            </div>


            <div class="record-result">

                <span class="record-label">
                    RECORD
                </span>

                <span class="record-value">
                    ${wrestler.wins} -
                    ${wrestler.draws} -
                    ${wrestler.losses}
                </span>

            </div>

        `;


        card.addEventListener("click",()=>{

            window.location.href=
                `superstar.html?id=${wrestler.id}`;

        });


        recordsContainer.appendChild(card);

    });

}


/* =========================================
   FILTER RECORDS
   ========================================= */

function getFilteredRecords(){

    const search=
        searchInput.value
        .trim()
        .toLowerCase();


    return wrestlerRecords.filter(wrestler=>{

        const matchesSearch=
            wrestler.name
            .toLowerCase()
            .includes(search);


        const matchesBrand=
            currentBrand==="ALL"||
            wrestler.brand.toUpperCase()===
            currentBrand;


        return matchesSearch&&matchesBrand;

    });

}


/* =========================================
   CREATE PAGE BUTTONS
   ========================================= */

function createPageButtons(totalPages){

    pagesContainer.innerHTML="";


    for(
        let i=1;
        i<=totalPages;
        i++
    ){

        const button=
            document.createElement("button");

        button.className="record-page";


        if(i===currentPage)
            button.classList.add("active");


        button.dataset.page=i;

        button.textContent=
            `PART ${i}`;


        button.addEventListener("click",()=>{

            currentPage=i;

            updateRecords();

        });


        pagesContainer.appendChild(button);

    }

}


/* =========================================
   UPDATE RECORDS
   ========================================= */

function updateRecords(){

    const filteredRecords=
        getFilteredRecords();


    const totalPages=
        Math.max(
            1,
            Math.ceil(
                filteredRecords.length/
                wrestlersPerPage
            )
        );


    if(currentPage>totalPages)
        currentPage=totalPages;


    renderRecords(filteredRecords);

    createPageButtons(totalPages);

}


/* =========================================
   SEARCH
   ========================================= */

searchInput.addEventListener("input",()=>{

    currentPage=1;

    updateRecords();

});


/* =========================================
   BRAND FILTER
   ========================================= */

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        currentBrand=
            button.dataset.brand;

        currentPage=1;


        filterButtons.forEach(filter=>{

            filter.classList.remove("active");

        });


        button.classList.add("active");

        updateRecords();

    });

});


/* =========================================
   INITIAL RENDER
   ========================================= */

updateRecords();
