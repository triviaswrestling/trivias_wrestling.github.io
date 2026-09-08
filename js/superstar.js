/* =========================================
   MI WRESTLING
   SUPERSTAR
   MATCH HISTORY
   ========================================= */

const urlParams=new URLSearchParams(window.location.search);
const wrestlerId=urlParams.get("id");

const imageElement=document.getElementById("superstar-image");
const nameElement=document.getElementById("superstar-name");
const nicknameElement=document.getElementById("superstar-nickname");
const brandElement=document.getElementById("superstar-brand");
const winsElement=document.getElementById("wins");
const lossesElement=document.getElementById("losses");
const drawsElement=document.getElementById("draws");
const singlesRecordElement=document.getElementById("singles-record");
const tagRecordElement=document.getElementById("tag-record");
const sixManRecordElement=document.getElementById("six-man-record");
const championshipsElement=document.getElementById("championships");
const matchHistoryElement=document.getElementById("match-history");

function createWrestlerId(name){
    return name.toLowerCase().trim().replace(/\s+/g,"-");
}

function normalizeName(name){
    return name.toLowerCase().trim();
}

const superstar=wrestlers.find(wrestler=>{
    return createWrestlerId(wrestler.name)===wrestlerId;
});

if(!superstar){
    nameElement.textContent="SUPERSTAR NOT FOUND";
    nicknameElement.textContent="";
    brandElement.textContent="";
    matchHistoryElement.innerHTML=`<p>This superstar does not exist.</p>`;
}else{

    imageElement.src=superstar.image||"images/Vacante.jpg";
    imageElement.alt=superstar.name;
    nameElement.textContent=superstar.name;
    nicknameElement.textContent=superstar.nickname||"";
    brandElement.textContent=superstar.brand||"NO BRAND";

    championshipsElement.innerHTML="";

    if(superstar.achievements&&superstar.achievements.length>0){
        superstar.achievements.forEach(achievement=>{
            const item=document.createElement("p");
            item.textContent=achievement;
            championshipsElement.appendChild(item);
        });
    }else{
        championshipsElement.innerHTML=`<p>NO CHAMPIONSHIPS</p>`;
    }

    const matchHistory=[];

    function addMatch(match){
        matchHistory.push(match);
    }

    const wrestlerName=normalizeName(superstar.name);

    function getEventCategory(eventId,event){

        const id=normalizeName(eventId);
        const title=normalizeName(event.title||"");

        if(event.type==="WEEKLY"||id.startsWith("weekly-")){
            return "WEEKLY";
        }

        if(event.type==="NXT"||id.startsWith("nxt-")){
            return "NXT";
        }

        const pleNames=[
            "wrestlemania",
            "summer slam",
            "summerslam",
            "royal rumble",
            "night of champions",
            "money in the bank",
            "survivor series",
            "backlash",
            "crown jewel",
            "king of the ring",
            "queen of the ring"
        ];

        if(pleNames.some(name=>title.includes(name))){
            return "PLE";
        }

        return "SPECIAL";
    }

    if(typeof eventData!=="undefined"){

        Object.entries(eventData).forEach(([eventId,event])=>{

            if(!event.results)return;

            const category=getEventCategory(eventId,event);

            event.results.forEach(result=>{

                const wrestler1=result.wrestler1||[];
                const wrestler2=result.wrestler2||[];

                const inTeam1=wrestler1.some(name=>normalizeName(name)===wrestlerName);
                const inTeam2=wrestler2.some(name=>normalizeName(name)===wrestlerName);

                if(!inTeam1&&!inTeam2)return;

                let resultStatus="DRAW";
                const winner=normalizeName(result.winner||"");

                if(winner==="draw"){
                    resultStatus="DRAW";
                }else if(result.type==="SINGLES"){
                    resultStatus=winner===wrestlerName?"WIN":"LOSS";
                }else if(result.type==="TAG TEAM"||result.type==="6-MAN TAG TEAM"){
                    if(inTeam1){
                        resultStatus=winner==="team 1"?"WIN":"LOSS";
                    }else if(inTeam2){
                        resultStatus=winner==="team 2"?"WIN":"LOSS";
                    }
                }

                const opponents=inTeam1?wrestler2:wrestler1;

                addMatch({
                    source:"EVENT",
                    category:category,
                    title:event.title,
                    date:event.date,
                    type:result.type,
                    match:result.match,
                    opponents:opponents,
                    status:resultStatus,
                    url:`event.html?id=${eventId}`
                });
            });
        });
    }

    if(typeof tournamentData!=="undefined"){

        Object.entries(tournamentData).forEach(([tournamentId,tournament])=>{

            if(!tournament.matches)return;

            let category="SPECIAL";
            const tournamentIdLower=tournamentId.toLowerCase();

            if(
                tournamentIdLower.startsWith("raw-")||
                tournamentIdLower.startsWith("smackdown-")
            ){
                category="WEEKLY";
            }else if(
                tournamentIdLower.startsWith("nxt-")||
                tournamentIdLower.startsWith("speed-")
            ){
                category="NXT";
            }

            tournament.matches.forEach(match=>{

                const isWrestler1=normalizeName(match.wrestler1)===wrestlerName;
                const isWrestler2=normalizeName(match.wrestler2)===wrestlerName;

                if(!isWrestler1&&!isWrestler2)return;

                let resultStatus="DRAW";

                if(match.score1>match.score2){
                    resultStatus=isWrestler1?"WIN":"LOSS";
                }else if(match.score1<match.score2){
                    resultStatus=isWrestler2?"WIN":"LOSS";
                }

                const opponent=isWrestler1?match.wrestler2:match.wrestler1;

                let tournamentTitle=tournamentId;

                if(tournamentIdLower.startsWith("raw-")){
                    tournamentTitle=tournamentId.replace("raw-","RAW ");
                }else if(tournamentIdLower.startsWith("smackdown-")){
                    tournamentTitle=tournamentId.replace("smackdown-","SMACKDOWN ");
                }else if(tournamentIdLower.startsWith("nxt-")){
                    tournamentTitle=tournamentId.replace("nxt-","NXT ");
                }else if(tournamentIdLower.startsWith("speed-")){
                    tournamentTitle=tournamentId.replace("speed-","SPEED ");
                }

                addMatch({
                    source:"TOURNAMENT",
                    category:category,
                    title:tournamentTitle,
                    date:`ROUND ${match.date}`,
                    type:"SINGLES",
                    match:"TOURNAMENT MATCH",
                    opponents:[opponent],
                    status:resultStatus,
                    url:`torneoroad.html?id=${tournamentId}`
                });
            });
        });
    }

    let totalWins=0,totalLosses=0,totalDraws=0;

    matchHistory.forEach(match=>{
        if(match.status==="WIN")totalWins++;
        else if(match.status==="LOSS")totalLosses++;
        else if(match.status==="DRAW")totalDraws++;
    });

    winsElement.textContent=totalWins;
    lossesElement.textContent=totalLosses;
    drawsElement.textContent=totalDraws;

    let singlesWins=0,singlesLosses=0,singlesDraws=0;
    let tagWins=0,tagLosses=0,tagDraws=0;
    let sixManWins=0,sixManLosses=0,sixManDraws=0;

    matchHistory.forEach(match=>{

        if(match.type==="SINGLES"){
            if(match.status==="WIN")singlesWins++;
            else if(match.status==="LOSS")singlesLosses++;
            else singlesDraws++;
        }else if(match.type==="TAG TEAM"){
            if(match.status==="WIN")tagWins++;
            else if(match.status==="LOSS")tagLosses++;
            else tagDraws++;
        }else if(match.type==="6-MAN TAG TEAM"){
            if(match.status==="WIN")sixManWins++;
            else if(match.status==="LOSS")sixManLosses++;
            else sixManDraws++;
        }
    });

    singlesRecordElement.textContent=`${singlesWins} - ${singlesLosses} - ${singlesDraws}`;
    tagRecordElement.textContent=`${tagWins} - ${tagLosses} - ${tagDraws}`;
    sixManRecordElement.textContent=`${sixManWins} - ${sixManLosses} - ${sixManDraws}`;

    if(matchHistory.length===0){

        matchHistoryElement.innerHTML=`<p>NO MATCHES</p>`;

    }else{

        matchHistoryElement.innerHTML="";

        const categories=["WEEKLY","NXT","PLE","SPECIAL"];

        categories.forEach(category=>{

            const categoryMatches=matchHistory.filter(
                match=>match.category===category
            );

            if(categoryMatches.length===0)return;

            const categoryTitle=document.createElement("div");

            categoryTitle.className="match-history-category";
            categoryTitle.textContent=category;

            matchHistoryElement.appendChild(categoryTitle);

            categoryMatches.forEach(match=>{

                const row=document.createElement("div");

                row.className="match-history-row";

                row.addEventListener("click",()=>{

                    if(match.url){
                        window.location.href=match.url;
                    }

                });

                const opponentsText=match.opponents.join(" & ");

                row.innerHTML=`
                    <div class="match-history-info">

                        <div class="match-history-source">
                            ${match.source}
                        </div>

                        <div class="match-history-title">
                            ${match.title}
                        </div>

                        <div class="match-history-match">
                            ${match.match}
                        </div>

                        <div class="match-history-opponent">
                            VS ${opponentsText}
                        </div>

                        <div class="match-history-date">
                            ${match.date} · ${match.type}
                        </div>

                    </div>

                    <div class="match-history-result ${match.status.toLowerCase()}">
                        ${match.status}
                    </div>
                `;

                matchHistoryElement.appendChild(row);

            });
        });
    }
}
