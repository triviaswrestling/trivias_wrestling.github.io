/* =========================================
   MI WRESTLING
   EVENT DATA
   ========================================= */

const eventData={};

/* =========================================
   WEEKLY FROM TOURNAMENTS
   ========================================= */

const weeklyDates=[
    "06/09/2026","13/09/2026","20/09/2026","27/09/2026",
    "04/10/2026","11/10/2026","18/10/2026",
    "25/10/2026","01/11/2026","08/11/2026","15/11/2026",
    "22/11/2026","29/11/2026","06/12/2026",
    "13/12/2026","20/12/2026","27/12/2026","03/01/2027",
    "10/01/2027","17/01/2027","24/01/2027",
    "31/01/2027","07/02/2027","14/02/2027","21/02/2027",
    "28/02/2027","07/03/2027"
];

function createWeeklyData(){
    if(typeof tournamentData==="undefined")return;

    for(let weekly=1;weekly<=28;weekly++){

        const tournamentNumber=Math.floor((weekly-1)/7)+1;
        const round=((weekly-1)%7)+1;

        const raw=tournamentData[`raw-${tournamentNumber}`];
        const smackdown=tournamentData[`smackdown-${tournamentNumber}`];

        const results=[];

        [raw,smackdown].forEach(tournament=>{
            if(!tournament?.matches)return;

            tournament.matches
                .filter(match=>Number(match.round)===round)
                .forEach(match=>{

                    results.push({
                        match:`${tournament.brand} - MATCH ${results.length+1}`,
                        type:"SINGLES",
                        championship:"",
                        wrestler1:[match.wrestler1],
                        wrestler2:[match.wrestler2],
                        score1:match.score1,
                        score2:match.score2,
                        winner:
                            match.score1>match.score2
                                ?match.wrestler1
                                :match.score2>match.score1
                                    ?match.wrestler2
                                    :"Draw"
                    });

                });
        });

        eventData[`weekly-${weekly}`]={
            type:"WEEKLY",
            title:`WEEKLY #${weekly}`,
            date:weeklyDates[weekly-1]||"",
            brand:"RAW & SMACKDOWN",
            results
        };
    }
}

createWeeklyData();

/* =========================================
   NXT 1
   ========================================= */

eventData["nxt-1"]={
    type:"NXT",
    title:"NXT #1",
    date:"08/09/2026",
    brand:"NXT",
    results:[
        {
            match:"MATCH 1",
            type:"SINGLES",
            championship:"",
            wrestler1:["Wrestler A"],
            wrestler2:["Wrestler B"],
            winner:"Wrestler A"
        }
    ]
};

/* =========================================
   NXT 2
   ========================================= */

eventData["nxt-2"]={
    type:"NXT",
    title:"NXT #2",
    date:"15/09/2026",
    brand:"NXT",
    results:[
        {
            match:"MATCH 1",
            type:"SINGLES",
            championship:"",
            wrestler1:["Wrestler C"],
            wrestler2:["Wrestler D"],
            winner:"Wrestler D"
        }
    ]
};

/* =========================================
   SUMMERSLAM 2026
   ========================================= */

eventData["summerslam-2026"]={
    type:"SPECIAL",
    title:"SUMMERSLAM 2026",
    date:"23/08/2026",
    brand:"SPECIAL EVENT",
    results:[
        {
            match:"MATCH 1",
            type:"SINGLES",
            championship:"",
            wrestler1:["Wrestler A"],
            wrestler2:["Wrestler B"],
            winner:"Wrestler A"
        },
        {
            match:"WWE CHAMPIONSHIP",
            type:"SINGLES",
            championship:"WWE CHAMPIONSHIP",
            wrestler1:["Champion"],
            wrestler2:["Challenger"],
            winner:"Challenger"
        },
        {
            match:"MAIN EVENT",
            type:"6-MAN TAG TEAM",
            championship:"",
            wrestler1:["Wrestler A","Wrestler B","Wrestler C"],
            wrestler2:["Wrestler D","Wrestler E","Wrestler F"],
            winner:"Team 2"
        }
    ]
};

/* =========================================
   NIGHT OF CHAMPIONS 2026
   ========================================= */

eventData["night-of-champions-2026"]={
    type:"SPECIAL",
    title:"NIGHT OF CHAMPIONS 2026",
    date:"26/07/2026",
    brand:"SPECIAL EVENT",
    results:[
        {
            match:"CHAMPIONSHIP MATCH",
            type:"SINGLES",
            championship:"CHAMPIONSHIP",
            wrestler1:["Champion"],
            wrestler2:["Challenger"],
            winner:"Challenger"
        }
    ]
};
