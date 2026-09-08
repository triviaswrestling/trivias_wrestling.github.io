const eventData={};

function createWeeklyData(){
    if(typeof tournamentData==="undefined")return;

    for(let weekly=1;weekly<=28;weekly++){
        const tournamentNumber=Math.floor((weekly-1)/7)+1;
        const date=((weekly-1)%7)+1;

        const raw=tournamentData[`raw-${tournamentNumber}`];
        const smackdown=tournamentData[`smackdown-${tournamentNumber}`];

        const results=[];

        if(raw&&raw.matches){
            raw.matches
                .filter(match=>Number(match.date)===date)
                .forEach(match=>{
                    results.push({
                        type:"SINGLES",
                        wrestler1:match.wrestler1,
                        wrestler2:match.wrestler2,
                        score1:match.score1,
                        score2:match.score2
                    });
                });
        }

        if(smackdown&&smackdown.matches){
            smackdown.matches
                .filter(match=>Number(match.date)===date)
                .forEach(match=>{
                    results.push({
                        type:"SINGLES",
                        wrestler1:match.wrestler1,
                        wrestler2:match.wrestler2,
                        score1:match.score1,
                        score2:match.score2
                    });
                });
        }

        eventData[`weekly-${weekly}`]={
            type:"WEEKLY",
            title:`WEEKLY #${weekly}`,
            date:raw?.startDate||smackdown?.startDate||"",
            brand:"WEEKLY",
            results:results
        };
    }
}

function createNXTData(){
    if(typeof tournamentData==="undefined")return;

    const nxtTournaments=Object.keys(tournamentData)
        .filter(id=>id.startsWith("nxt-"))
        .sort((a,b)=>Number(a.split("-")[1])-Number(b.split("-")[1]));

    let globalNXTNumber=1;

    nxtTournaments.forEach(id=>{
        const tournament=tournamentData[id];

        if(!tournament||!tournament.matches)return;

        const dates=[...new Set(
            tournament.matches
                .map(match=>Number(match.date))
                .filter(date=>!isNaN(date))
        )].sort((a,b)=>a-b);

        dates.forEach(date=>{
            const results=tournament.matches
                .filter(match=>Number(match.date)===date)
                .map(match=>({
                    type:"SINGLES",
                    wrestler1:match.wrestler1,
                    wrestler2:match.wrestler2,
                    score1:match.score1,
                    score2:match.score2
                }));

            eventData[`nxt-${globalNXTNumber}`]={
                type:"NXT",
                title:`NXT #${globalNXTNumber}`,
                date:tournament.startDate||"",
                brand:"NXT",
                results:results
            };

            globalNXTNumber++;
        });
    });
}

createWeeklyData();
createNXTData();

eventData["summerslam-2026"]={
    type:"SPECIAL",
    title:"SUMMERSLAM 2026",
    date:"2026",
    brand:"SPECIAL EVENT",
    results:[]
};

eventData["night-of-champions-2026"]={
    type:"SPECIAL",
    title:"NIGHT OF CHAMPIONS 2026",
    date:"2026",
    brand:"SPECIAL EVENT",
    results:[]
};
