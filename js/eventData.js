const eventData={};

function createWeeklyData(){
    if(typeof tournamentData==="undefined")return;

    for(let weekly=1;weekly<=28;weekly++){
        const tournamentNumber=Math.floor((weekly-1)/7)+1;
        const date=((weekly-1)%7)+1;
        const raw=tournamentData[`raw-${tournamentNumber}`];
        const smackdown=tournamentData[`smackdown-${tournamentNumber}`];
        const results=[];

        if(raw?.matches){
            raw.matches.filter(m=>Number(m.date)===date).forEach(m=>{
                results.push({
                    type:"SINGLES",
                    brand:"RAW",
                    wrestler1:m.wrestler1,
                    wrestler2:m.wrestler2,
                    score1:m.score1,
                    score2:m.score2
                });
            });
        }

        if(smackdown?.matches){
            smackdown.matches.filter(m=>Number(m.date)===date).forEach(m=>{
                results.push({
                    type:"SINGLES",
                    brand:"SMACKDOWN",
                    wrestler1:m.wrestler1,
                    wrestler2:m.wrestler2,
                    score1:m.score1,
                    score2:m.score2
                });
            });
        }

        eventData[`weekly-${weekly}`]={
            type:"WEEKLY",
            title:`WEEKLY #${weekly}`,
            date:raw?.startDate||smackdown?.startDate||"",
            brand:"WEEKLY",
            results
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
        if(!tournament?.matches)return;

        const dates=[...new Set(
            tournament.matches
                .map(m=>Number(m.date))
                .filter(d=>!isNaN(d))
        )].sort((a,b)=>a-b);

        dates.forEach(date=>{
            const results=tournament.matches
                .filter(m=>Number(m.date)===date)
                .map(m=>({
                    type:"SINGLES",
                    brand:"NXT",
                    wrestler1:m.wrestler1,
                    wrestler2:m.wrestler2,
                    score1:m.score1,
                    score2:m.score2
                }));

            eventData[`nxt-${globalNXTNumber}`]={
                type:"NXT",
                title:`NXT #${globalNXTNumber}`,
                date:tournament.startDate||"",
                brand:"NXT",
                results
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
    brand:"PLE",
    results:[]
};

eventData["night-of-champions-2026"]={
    type:"SPECIAL",
    title:"NIGHT OF CHAMPIONS 2026",
    date:"2026",
    brand:"PLE",
    results:[]
};
