console.log("ROSTER.JS CARGADO");

const rosterContainer=document.getElementById("roster");
const nxtRosterContainer=document.getElementById("nxt-roster");

/* =========================================
   SLUG
   ========================================= */

function slug(name){
    return String(name)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g,"-")
        .replace(/^-|-$/g,"");
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

    return[
        ...new Set(
            list.filter(Boolean)
        )
    ];

}


/* =========================================
   ADAPT TOURNAMENT RESULT
   MISMA LOGICA QUE SUPERSTAR
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
        ...result,

        type:
            result.type||
            "SINGLES",

        wrestler1,
        wrestler2,

        score1,
        score2,

        winner
    };

}


/* =========================================
   GET RECORD
   MISMA LOGICA QUE SUPERSTAR
   ========================================= */

function getRecord(name,fromYear=null){

    let w=0;
    let d=0;
    let l=0;

    const id=slug(name);


    /* =====================================
       IS THIS WRESTLER
       ===================================== */

    function isThisWrestler(wrestlerName){

        return(
            wrestlerName&&
            slug(wrestlerName)===id
        );

    }


    /* =====================================
       OUTCOME
       ===================================== */

    function outcome(result){

        const people=participants(result);

        if(!people.some(isThisWrestler))
            return null;


        /* =================================
           ELIMINATION CHAMBER TAG TEAM
           ================================= */

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
                            String(name)
                            .toLowerCase()
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


        /* =================================
           NORMAL WINNER
           ================================= */

        if(result.winner){

            return isThisWrestler(result.winner)
                ?"WIN"
                :"LOSS";

        }


        /* =================================
           MULTI PARTICIPANT + SCORES
           ================================= */

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

            if(winnerIndexes.length!==1){

                return winnerIndexes.includes(thisIndex)
                    ?"WIN"
                    :"DRAW";

            }

            return isThisWrestler(
                result.participants[
                    winnerIndexes[0]
                ]
            )

                ?"WIN"
                :"LOSS";

        }


        /* =================================
           SCORE 1 VS SCORE 2
           ================================= */

        if(
            result.score1===undefined||
            result.score2===undefined
        )
            return null;

        const a=Number(result.score1);
        const b=Number(result.score2);

        if(isNaN(a)||isNaN(b))
            return null;


        /* =================================
           WRESTLER 1
           ================================= */

        if(
            result.wrestler1&&
            isThisWrestler(result.wrestler1)
        ){

            if(a>b)
                return"WIN";

            if(a<b)
                return"LOSS";

            return"DRAW";

        }


        /* =================================
           WRESTLER 2
           ================================= */

        if(
            result.wrestler2&&
            isThisWrestler(result.wrestler2)
        ){

            if(b>a)
                return"WIN";

            if(b<a)
                return"LOSS";

            return"DRAW";

        }


        /* =================================
           TEAM 1
           ================================= */

        if(
            Array.isArray(result.team1)&&
            result.team1
                .flat()
                .some(isThisWrestler)
        ){

            if(a>b)
                return"WIN";

            if(a<b)
                return"LOSS";

            return"DRAW";

        }


        /* =================================
           TEAM 2
           ================================= */

        if(
            Array.isArray(result.team2)&&
            result.team2
                .flat()
                .some(isThisWrestler)
        ){

            if(b>a)
                return"WIN";

            if(b<a)
                return"LOSS";

            return"DRAW";

        }

        return null;

    }


    /* =========================================
       PROCESS RESULT
       ========================================= */

    function processResult(result){

        const adapted=
            adaptTournamentResult(result);

        if(!adapted)
            return;

        const resultOutcome=
            outcome(adapted);

        if(resultOutcome==="WIN")
            w++;

        if(resultOutcome==="LOSS")
            l++;

        if(resultOutcome==="DRAW")
            d++;

    }


    /* =========================================
       DATE FILTER
       ========================================= */

    function validDate(date){

        if(fromYear===null)
            return true;

        const year=
            Number(
                String(date||"")
                .split("/")[2]
            );

        if(!year)
            return false;

        return year>=fromYear;

    }


    /* =========================================
       EVENT DATA
       ========================================= */

    if(typeof eventData!=="undefined"){

        Object.entries(eventData)
        .forEach(([eventId,event])=>{

            if(!event)
                return;

            if(!validDate(event.date))
                return;

            (event.results||[])
            .forEach(processResult);

        });

    }


    /* =========================================
       TOURNAMENT DATA
       ========================================= */

    if(typeof tournamentData!=="undefined"){

        const added=new Set();

        Object.entries(tournamentData)
        .forEach(([tournamentKey,data])=>{

            if(!data)
                return;


            function processTournamentEvent(
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

                if(!validDate(event.date))
                    return;

                (results||[])
                .forEach(processResult);

            }


            /* =============================
               WEEKLY
               ============================= */

            if(data.weekly){

                Object.entries(data.weekly)
                .forEach(([id,event])=>{

                    processTournamentEvent(
                        id,
                        event,
                        event.results||[]
                    );

                });

            }


            /* =============================
               MATCHES
               ============================= */

            if(
                data.matches&&
                !Array.isArray(data.matches)
            ){

                Object.entries(data.matches)
                .forEach(([id,event])=>{

                    processTournamentEvent(
                        id,
                        event,
                        event.results||[]
                    );

                });

            }


            /* =============================
               SHOWS
               ============================= */

            if(data.shows){

                Object.entries(data.shows)
                .forEach(([id,event])=>{

                    processTournamentEvent(
                        id,
                        event,
                        event.matches||[]
                    );

                });

            }

        });

    }


    /* =========================================
       OUTSIDER DATA
       ========================================= */

    if(typeof outsiderData!=="undefined"){

        Object.entries(outsiderData)
        .forEach(([tournamentKey,data])=>{

            if(!data)
                return;


            /* =============================
               SHOWS
               ============================= */

            if(data.shows){

                Object.entries(data.shows)
                .forEach(([showId,event])=>{

                    if(!event)
                        return;

                    if(!validDate(event.date))
                        return;

                    (event.matches||[])
                    .forEach(processResult);

                });

            }


            /* =============================
               FINAL MATCHES
               ============================= */

            if(data.finalMatches){

                const finalDate=
                    data.finalDate||
                    data.date||
                    "";

                if(validDate(finalDate)){

                    data.finalMatches
                    .forEach(processResult);

                }

            }

        });

    }


    /* =========================================
       RETURN
       ========================================= */

    return`${w} - ${d} - ${l}`;

}


/* =========================================
   CREATE WRESTLER CARD
   ========================================= */

function createWrestlerCard(wrestler,index){

    const card=
        document.createElement("div");

    card.className="wrestler";


    if(wrestler.brand){

        card.classList.add(
            wrestler.brand
            .toLowerCase()
            .replace(" ","-")
        );

    }


    card.onclick=function(){

        openModal(index);

    };


    const image=
        document.createElement("img");

    image.src=
        wrestler.image;

    image.alt=
        wrestler.name;

    image.loading=
        "lazy";


    const nickname=
        document.createElement("p");

    nickname.textContent=
        wrestler.nickname||"";


    const name=
        document.createElement("h2");

    name.textContent=
        wrestler.name;


    const stable=
        document.createElement("p");

    stable.textContent=
        wrestler.stable||"";


    /* =========================================
       2026 RECORD
       ========================================= */

    const record2026=
        document.createElement("div");

    record2026.className=
        "record";

    record2026.innerHTML=
        "<span>2026 Overall</span><strong>"+
        getRecord(
            wrestler.name,
            2026
        )+
        "</strong>";


    /* =========================================
       CAREER RECORD
       ========================================= */

    const careerRecord=
        document.createElement("div");

    careerRecord.className=
        "record";

    careerRecord.innerHTML=
        "<span>Career Overall</span><strong>"+
        getRecord(
            wrestler.name
        )+
        "</strong>";


    card.appendChild(image);
    card.appendChild(nickname);
    card.appendChild(name);
    card.appendChild(stable);
    card.appendChild(record2026);
    card.appendChild(careerRecord);

    return card;

}


/* =========================================
   MAIN ROSTER
   ========================================= */

function loadMainRoster(status){

    if(!rosterContainer)
        return;

    rosterContainer.innerHTML="";

    wrestlers.forEach(
        function(wrestler,index){

            if(
                wrestler.status===status&&
                wrestler.division!=="NXT"
            ){

                rosterContainer.appendChild(
                    createWrestlerCard(
                        wrestler,
                        index
                    )
                );

            }

        }
    );

}


/* =========================================
   NXT ROSTER
   ========================================= */

function loadNXTRoster(status){

    if(!nxtRosterContainer)
        return;

    nxtRosterContainer.innerHTML="";

    wrestlers.forEach(
        function(wrestler,index){

            if(
                wrestler.status===status&&
                wrestler.division==="NXT"
            ){

                nxtRosterContainer.appendChild(
                    createWrestlerCard(
                        wrestler,
                        index
                    )
                );

            }

        }
    );

}


/* =========================================
   INITIALIZE
   ========================================= */

const main=
    document.querySelector("main");

if(main){

    const status=
        main.dataset.rosterStatus;

    loadMainRoster(status);
    loadNXTRoster(status);

}
