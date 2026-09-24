/* =========================================
   MI WRESTLING
   EVENT PAGE
   ========================================= */

const eventTitle=document.getElementById("event-title");
const eventDate=document.getElementById("event-date");
const eventBrand=document.getElementById("event-brand");
const eventResults=document.getElementById("event-results");
const eventChronology=document.getElementById("event-chronology");

const params=new URLSearchParams(window.location.search);
const eventId=params.get("id");


/* =========================================
   SHOW BRAND
   ========================================= */

function getShowBrand(id){

const show=String(id||"").split("-")[0].toLowerCase();

const brands={
raw:"RAW",
smackdown:"SMACKDOWN",
nxt:"NXT",
speed:"SPEED",
aaa:"AAA",
aew:"AEW",
tna:"TNA",
cmll:"CMLL"
};

return brands[show]||"";

}


/* =========================================
   GET TOURNAMENT EVENT
   ========================================= */

function getTournamentEvent(id){

if(typeof tournamentData==="undefined")return null;


/* =====================================
   WEEKLY
   RAW + SMACKDOWN
   ===================================== */

const weeklyMatch=id.match(/^weekly-(\d+)$/);

if(weeklyMatch){

const number=Number(weeklyMatch[1]);

if(number<1||number>1000)return null;

const showIds=[
"raw-"+number,
"smackdown-"+number
];

const results=[];
const dates=[];

for(const tournamentId in tournamentData){

const data=tournamentData[tournamentId];

if(!data)continue;

for(const showId of showIds){

let show=null;


/* NEW SHOWS */

if(data.shows&&data.shows[showId]){
show=data.shows[showId];
}


/* OLD WEEKLY */

if(!show&&data.weekly&&data.weekly[showId]){
show=data.weekly[showId];
}


/* OLD MATCHES */

if(
!show&&
data.matches&&
!Array.isArray(data.matches)&&
data.matches[showId]
){
show=data.matches[showId];
}

if(!show)continue;

if(show.date)dates.push(show.date);

const matches=
show.matches||
show.results||
[];

results.push(
...convertTournamentResults(
matches,
showId
)
);

}

}

if(!results.length)return null;

let date="";

if(dates.length){

dates.sort((a,b)=>
parseDate(a)-parseDate(b)
);

date=dates[0];

}

return{
id:id,
title:"WEEKLY #"+number,
date:date,
brand:"",
type:"WEEKLY",
source:"tournamentData",
results:results
};

}


/* =====================================
   INDIVIDUAL SHOW
   RAW / SMACKDOWN / NXT / SPEED /
   AAA / AEW / TNA
   ===================================== */

const showMatch=
id.match(/^(raw|smackdown|nxt|speed|aaa|aew|tna|cmll)-(\d+)$/i);

if(showMatch){

const showId=id.toLowerCase();
const number=Number(showMatch[2]);
const brand=getShowBrand(showId);

if(number<1||number>10000)return null;


/* =================================
   SEARCH ONLY THIS SHOW
   ================================= */

for(const tournamentId in tournamentData){

const data=tournamentData[tournamentId];

if(!data)continue;

let show=null;


/* NEW SHOWS */

if(data.shows&&data.shows[showId]){
show=data.shows[showId];
}


/* OLD WEEKLY */

if(!show&&data.weekly&&data.weekly[showId]){
show=data.weekly[showId];
}


/* OLD MATCHES */

if(
!show&&
data.matches&&
!Array.isArray(data.matches)&&
data.matches[showId]
){
show=data.matches[showId];
}

if(!show)continue;

const matches=
show.matches||
show.results||
[];

return{
id:id,
title:brand+" #"+number,
date:show.date||"",
brand:brand,
type:brand==="NXT"?"NXT":"WEEKLY",
source:"tournamentData",
results:convertTournamentResults(
matches,
showId
)
};

}

return null;

}

return null;

}


/* =========================================
   TOURNAMENT RESULT ADAPTER
   ========================================= */

function convertTournamentResults(
results,
showId=""
){

if(!Array.isArray(results))return[];

const brand=getShowBrand(showId);

return results.map(match=>{

const wrestler1=
Array.isArray(match)
?match[0]
:match.wrestler1||
match.a||
match.player1||
match.p1||
"";

const wrestler2=
Array.isArray(match)
?match[1]
:match.wrestler2||
match.b||
match.player2||
match.p2||
"";

const score1=
Array.isArray(match)
?match[2]
:match.score1!==undefined
?match.score1
:match.scoreA!==undefined
?match.scoreA
:"";

const score2=
Array.isArray(match)
?match[3]
:match.score2!==undefined
?match.score2
:match.scoreB!==undefined
?match.scoreB
:"";

let winner=
!Array.isArray(match)
?match.winner||null
:null;

if(!winner){

const s1=Number(score1);
const s2=Number(score2);

if(!isNaN(s1)&&!isNaN(s2)){

if(s1>s2)winner=wrestler1;
else if(s2>s1)winner=wrestler2;

}

}

return{
type:"NORMAL",
wrestler1:wrestler1,
wrestler2:wrestler2,
score1:score1,
score2:score2,
winner:winner,
source:"tournamentData",
brand:brand
};

});

}


/* =========================================
   GET OUTSIDER EVENT
   SPEED / AEW / TNA / AAA / CMLL
   ========================================= */

function getOutsiderEvent(id){

if(typeof outsiderData==="undefined")return null;

for(const tournamentId in outsiderData){

const data=outsiderData[tournamentId];

if(!data||!data.shows)continue;

const show=data.shows[id];

if(!show)continue;

const brand=data.brand||getShowBrand(id);

const matches=
show.matches||
show.results||
[];

return{

id:id,

title:
show.title||
brand+" #"+id.split("-").pop(),

date:
show.date||"",

brand:brand,

type:brand,

source:"outsiderData",

results:
convertOutsiderResults(
matches,
id,
brand
)

};

}

return null;

}


/* =========================================
   OUTSIDER RESULT ADAPTER
   ========================================= */

function convertOutsiderResults(
results,
showId="",
brand=""
){

if(!Array.isArray(results))return[];

return results.map(match=>{

const wrestler1=
Array.isArray(match)
?match[0]
:"";

const wrestler2=
Array.isArray(match)
?match[1]
:"";

const score1=
Array.isArray(match)
?match[2]
:"";

const score2=
Array.isArray(match)
?match[3]
:"";

let winner=null;

const s1=Number(score1);
const s2=Number(score2);

if(!isNaN(s1)&&!isNaN(s2)){

if(s1>s2){

winner=wrestler1;

}else if(s2>s1){

winner=wrestler2;

}

}

return{

type:"NORMAL",

wrestler1:wrestler1,

wrestler2:wrestler2,

score1:score1,

score2:score2,

winner:winner,

source:"outsiderData",

brand:brand

};

});

}


/* =========================================
   DATE HELPER
   ========================================= */

function parseDate(date){

if(!date)return 0;

const parts=String(date).split("/");

if(parts.length!==3)return 0;

const day=Number(parts[0]);
const month=Number(parts[1]);
const year=Number(parts[2]);

return new Date(
year,
month-1,
day
).getTime();

}


/* =========================================
   GET EVENT
   ========================================= */

let event=null;


/* =========================================
   1. EVENT DATA
   ========================================= */

if(
typeof eventData!=="undefined"&&
eventData[eventId]
){

event=eventData[eventId];

}


/* =========================================
   2. TOURNAMENT DATA
   ========================================= */

if(!event){

event=getTournamentEvent(eventId);

}


/* =========================================
   3. OUTSIDER DATA
   ========================================= */

if(!event){

event=getOutsiderEvent(eventId);

}


/* =========================================
   EVENT
   ========================================= */

if(!event){

eventTitle.textContent="EVENT NOT FOUND";
eventDate.textContent="";
eventBrand.textContent="";

eventResults.innerHTML=
"<p>THE REQUESTED EVENT COULD NOT BE FOUND.</p>";

}else{

eventTitle.textContent=
event.title||"EVENT";

eventDate.textContent=
event.date||"";

eventBrand.textContent=
event.brand||"";

const type=
document.querySelector(
".event-header .event-type"
);

if(type){

type.textContent=
event.type==="PLE"
?"SPECIAL EVENT"
:event.type||"EVENT";

}

renderResults(event.results||[]);
renderChronology(event);

}


/* =========================================
   RENDER RESULTS
   ========================================= */

function renderResults(results){

eventResults.innerHTML="";

if(!results.length){

eventResults.innerHTML=`
<div class="result-card">
<div class="match-winner">
NO RESULTS AVAILABLE.
</div>
</div>`;

return;

}

results.forEach(result=>{

const card=document.createElement("div");

const source=
result.source||
event.source||
"eventData";

const brand=
result.brand||
event.brand||
"";

card.className=
`result-card source-${source.toLowerCase()} brand-${brand
.toLowerCase()
.replace(/\s+/g,"-")}`;

let html="";


/* =====================================
   POSITION
   ===================================== */

if(result.position){

html+=`
<div class="match-name">
${result.position}
</div>`;

}


/* =====================================
   CHAMPIONSHIP
   ===================================== */

if(result.championship){

html+=`
<div class="match-championship">
${formatChampionshipName(result.championship)}
${result.type&&result.type!=="SINGLES"&&result.type!=="TAG TEAM"
?`<small>${result.type} MATCH</small>`
:""}
</div>`;

}


/* =====================================
   MULTI PARTICIPANT
   ===================================== */

if([
"TRIPLE THREAT",
"FATAL 4-WAY",
"5-WAY",
"6-WAY",
"8-WAY",
"LADDER",
].includes(result.type)){

const participants=result.participants||[
result.wrestler1,
result.wrestler2,
result.wrestler3,
result.wrestler4,
result.wrestler5,
result.wrestler6,
result.wrestler7,
result.wrestler8
].filter(Boolean);

const scores=result.scores||[
result.score1,
result.score2,
result.score3,
result.score4,
result.score5,
result.score6,
result.score7,
result.score8
].filter(score=>score!==undefined);

html+=`
<div class="match-name">
${result.match||result.type}
</div>

<div class="match">

<div class="team">

${participants
.map((name,index)=>
createWrestlerWithScore(
name,
scores[index],
result.images?.[name]
))
.join("")}

</div>

<div class="vs">

<span>FINAL</span>

${createMultiScore(scores)}

</div>

</div>`;

}


/* =====================================
   TAG TEAM
   ===================================== */

else if(result.type==="TAG TEAM"){

html+=`
<div class="match-name">
TAG TEAM
</div>

<div class="match">

<div class="team">

${(result.team1||[])
.map(name=>createWrestler(
name,
result.images?.[name]
))
.join("")}

</div>

<div class="vs">

<span>VS</span>

${createScore(
result.score1,
result.score2
)}

</div>

<div class="team">

${(result.team2||[])
.map(name=>createWrestler(
name,
result.images?.[name]
))
.join("")}

</div>

</div>`;

}


/* =====================================
   MULTI TEAM
   ===================================== */

else if([
"3 VS 3",
"4 VS 4",
"5 VS 5",
"6 VS 6",
"7 VS 7",
"8 VS 8",
"WARGAMES",
"SURVIVOR SERIES"
].includes(result.type)){

html+=`
<div class="match-name">
${result.match||result.type}
</div>

<div class="match">

<div class="team">

${(result.team1||[])
.flat()
.map(name=>createWrestler(
name,
result.images?.[name]
))
.join("")}

</div>

<div class="vs">

<span>VS</span>

${
result.score1!==undefined
?createScore(
result.score1,
result.score2
)
:""
}

</div>

<div class="team">

${(result.team2||[])
.flat()
.map(name=>createWrestler(
name,
result.images?.[name]
))
.join("")}

</div>

</div>`;

}


/* =====================================
   ELIMINATION CHAMBER TAG TEAM
   ===================================== */

else if(
result.type==="ELIMINATION CHAMBER"&&
result.team1&&
result.team2&&
result.team3&&
result.team4&&
result.team5&&
result.team6
){

const teams=[
result.team1,
result.team2,
result.team3,
result.team4,
result.team5,
result.team6
];

html+=`
<div class="match-name">
${result.match||"ELIMINATION CHAMBER TAG TEAM"}
</div>

<div class="chamber-teams">

${teams.map((team,index)=>`

<div class="chamber-team">

<div class="chamber-team-number">
TEAM ${index+1}
</div>

${(team||[])
.flat()
.map(name=>createWrestler(
name,
result.images?.[name]
))
.join("")}

</div>

`).join("")}

</div>`;

}
   else if(result.type==="ELIMINATION CHAMBER"){

const participants=result.participants||[];

html+=`
<div class="match-name">
${result.match||"ELIMINATION CHAMBER"}
</div>

<div class="match">

<div class="team">

${participants
.map((name,index)=>
createWrestlerWithScore(
name,
result.scores?.[index],
result.images?.[name]
))
.join("")}

</div>

<div class="vs">

<span>FINAL</span>

${createMultiScore(result.scores||[])}

</div>

</div>`;

   }


/* =====================================
   LADDER TAG
   ===================================== */

else if(result.type==="LADDER TAG"){

html+=`
<div class="match-name">
LADDER TAG
</div>

<div class="match">

<div class="team">

${(result.team1||[])
.flat()
.map(name=>createWrestler(
name,
result.images?.[name]
))
.join("")}

</div>

<div class="vs">

<span>FINAL</span>

${
result.score!==undefined
?createSingleScore(result.score)
:""
}

</div>

<div class="team">

${(result.team2||[])
.flat()
.map(name=>createWrestler(
name,
result.images?.[name]
))
.join("")}

</div>

</div>`;

}


/* =====================================
   BATTLE ROYALE
   ===================================== */

else if(result.type==="BATTLE ROYALE"){

html+=`
<div class="match-name">
BATTLE ROYALE
</div>

<div class="match">

<div class="team">

${(result.participants||[])
.map(name=>createWrestler(
name,
result.images?.[name]
))
.join("")}

</div>

</div>`;

}


/* =====================================
   ROYAL RUMBLE
   ===================================== */

else if(result.type==="ROYAL RUMBLE"){

html+=`
<div class="match-name">
ROYAL RUMBLE
</div>

<div class="match">

<div class="team">

${(result.participants||[])
.map(name=>createWrestler(
name,
result.images?.[name]
))
.join("")}

</div>

</div>`;

}


/* =====================================
   NORMAL MATCH
   ===================================== */

else{

html+=`
<div class="match">

<div class="team">

${createWrestler(
result.wrestler1,
result.image1
)}

</div>

<div class="vs">

<span>VS</span>

${createScore(
result.score1,
result.score2
)}

</div>

<div class="team">

${createWrestler(
result.wrestler2,
result.image2
)}

</div>

</div>`;

}


/* =====================================
   WINNER
   ===================================== */

if(result.winner){

html+=`
<div class="match-winner">
WINNER:
<strong>${result.winner}</strong>
</div>`;

}


/* =====================================
   WINNER - MULTI
   ===================================== */

else if(
Array.isArray(result.participants)&&
Array.isArray(result.scores)&&
result.participants.length===
result.scores.length
){

const scores=result.scores.map(Number);
const highest=Math.max(...scores);
const winnerIndexes=[];

scores.forEach((score,index)=>{

if(score===highest){
winnerIndexes.push(index);
}

});

if(winnerIndexes.length===1){

const winner=
result.participants[
winnerIndexes[0]
];

html+=`
<div class="match-winner">
WINNER:
<strong>${winner}</strong>
</div>`;

}else{

html+=`
<div class="match-winner">
WINNER:
<strong>DRAW</strong>
</div>`;

}

}


/* =====================================
   WINNER - NORMAL
   ===================================== */

else{

const s1=Number(result.score1);
const s2=Number(result.score2);

if(!isNaN(s1)&&!isNaN(s2)){

let winner="DRAW";

if(s1>s2){

winner=
result.type==="TAG TEAM"||
(result.team1&&result.team2)
?(result.team1||[]).join(" + ")
:result.wrestler1;

}

if(s2>s1){

winner=
result.type==="TAG TEAM"||
(result.team1&&result.team2)
?(result.team2||[]).join(" + ")
:result.wrestler2;

}

html+=`
<div class="match-winner">
WINNER:
<strong>${winner}</strong>
</div>`;

}

}

card.innerHTML=html;

eventResults.appendChild(card);

});

}


/* =========================================
   CHAMPIONSHIP NAME
   ========================================= */

function formatChampionshipName(name){

const championships={

"wwe-championship":
"WWE Championship",

"world-heavyweight-championship":
"World Heavyweight Championship",

"wwe-undisputed-championship":
"WWE Undisputed Championship",

"undisputed-wwe-championship":
"Undisputed WWE Championship",

"universal-championship":
"Universal Championship",

"wwe-universal-championship":
"WWE Universal Championship",

"intercontinental-championship":
"Intercontinental Championship",

"united-states-championship":
"United States Championship",

"wwe-womens-championship":
"WWE Women's Championship",

"womens-world-championship":
"Women's World Championship",

"womens-united-states-championship":
"Women's United States Championship",

"womens-intercontinental-championship":
"Women's Intercontinental Championship",

"world-tag-team-championship":
"World Tag Team Championship",

"wwe-tag-team-championship":
"WWE Tag Team Championship",

"world-womens-tag-team-championship":
"World Women's Tag Team Championship",

"wwe-womens-tag-team-championship":
"WWE Women's Tag Team Championship"

};

if(championships[name]){
return championships[name];
}

return String(name)
.replace(/-/g," ")
.replace(/\b\w/g,char=>char.toUpperCase());

}


/* =========================================
   WRESTLER HELPERS
   ========================================= */

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
normalizeName(w.name)===
normalizeName(name)
)||null;

}


function getEventWrestlerImage(
name,
customImage
){

if(customImage)return customImage;

const wrestler=getWrestler(name);

if(wrestler?.image){
return wrestler.image;
}

return"images/Vacante.jpg";

}


/* =========================================
   CREATE WRESTLER
   ========================================= */

function createWrestler(
name,
customImage
){

if(!name)return"";

const wrestler=getWrestler(name);

const id=
wrestler?.id||
name
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-")
.replace(/^-|-$/g,"");

const image=
getEventWrestlerImage(
name,
customImage
);

return`
<a
href="superstar.html?id=${encodeURIComponent(id)}"
class="wrestler-link"
>

<div
class="wrestler"
tabindex="0"
>

<img
src="${image}"
alt="${name}"
loading="lazy"
>

<span>
${name}
</span>

</div>

</a>`;

}


function createWrestlerWithScore(
name,
score,
customImage
){

if(!name)return"";

const wrestler=getWrestler(name);

const id=
wrestler?.id||
name
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-")
.replace(/^-|-$/g,"");

const image=
getEventWrestlerImage(
name,
customImage
);

return`
<a
href="superstar.html?id=${encodeURIComponent(id)}"
class="wrestler-link"
>

<div
class="wrestler"
tabindex="0"
>

<img
src="${image}"
alt="${name}"
loading="lazy"
>

<span>
${name}
</span>

${
score!==undefined
?`<small class="wrestler-score">${score}</small>`
:""
}

</div>

</a>`;

}


/* =========================================
   SCORE HELPERS
   ========================================= */

function createScore(score1,score2){

return`
<div class="match-score">
<span>${score1??""}</span>
<span>-</span>
<span>${score2??""}</span>
</div>`;

}


function createSingleScore(score){

if(
score===undefined||
score===null||
score===""
)return"";

return`
<div class="match-score">
<span>${score}</span>
</div>`;

}


function createMultiScore(scores){

if(!Array.isArray(scores)||!scores.length){
return"";
}

return`
<div class="match-score multi-score">
${scores.map(score=>`<span>${score}</span>`).join("")}
</div>`;

}
























/* =========================================
   EVENT CHRONOLOGY
   ========================================= */


/* =========================================
   GET SHOW FROM TOURNAMENT DATA
   ========================================= */

function getChronologyTournamentShow(showId){

    if(typeof tournamentData==="undefined") return null;

    for(const tournamentId in tournamentData){

        const data=tournamentData[tournamentId];

        if(!data) continue;

        let show=null;

        if(data.shows && data.shows[showId]){
            show=data.shows[showId];
        }

        if(!show && data.weekly && data.weekly[showId]){
            show=data.weekly[showId];
        }

        if(
            !show &&
            data.matches &&
            !Array.isArray(data.matches) &&
            data.matches[showId]
        ){
            show=data.matches[showId];
        }

        if(show){
            return {
                show:show,
                tournamentId:tournamentId
            };
        }

    }

    return null;

}


/* =========================================
   GET ALL CHRONOLOGY EVENTS
   ========================================= */

function getAllChronologyEvents(){

    const events=[];


    /* =====================================
       WEEKLY
       RAW + SMACKDOWN = WEEKLY
       ===================================== */

    const weeklyNumbers={};

    if(typeof tournamentData!=="undefined"){

        for(const tournamentId in tournamentData){

            const data=tournamentData[tournamentId];

            if(!data) continue;

            const containers=[
                data.shows,
                data.weekly,
                (!Array.isArray(data.matches)
                    ?data.matches
                    :null)
            ];

            containers.forEach(container=>{

                if(!container) return;

                Object.keys(container).forEach(id=>{

                    const match=id.match(
                        /^(raw|smackdown)-(\d+)$/i
                    );

                    if(!match) return;

                    const number=match[2];

                    if(!weeklyNumbers[number]){
                        weeklyNumbers[number]={
                            raw:null,
                            smackdown:null
                        };
                    }

                    const type=
                        match[1].toLowerCase();

                    weeklyNumbers[number][type]={
                        show:container[id],
                        tournamentId:tournamentId
                    };

                });

            });

        }

    }


    Object.entries(weeklyNumbers).forEach(
        ([number,data])=>{

            const raw=data.raw
                ?data.raw.show
                :null;

            const smackdown=data.smackdown
                ?data.smackdown.show
                :null;

            const dates=[];

            if(raw && raw.date){
                dates.push(raw.date);
            }

            if(smackdown && smackdown.date){
                dates.push(smackdown.date);
            }

            if(!dates.length) return;

            dates.sort(
                (a,b)=>parseDate(a)-parseDate(b)
            );

            events.push({

                id:"weekly-"+number,

                title:"WEEKLY #"+number,

                date:dates[0],

                type:"WEEKLY",

                source:"tournamentData",

                category:"WEEKLY",

                image:
                    (raw && raw.image) ||
                    (smackdown && smackdown.image) ||
                    "",

                brand:"",

                raw:raw,

                smackdown:smackdown

            });

        }
    );


    /* =====================================
       NXT
       tournamentData
       ===================================== */

    const nxtSeen={};

    if(typeof tournamentData!=="undefined"){

        for(const tournamentId in tournamentData){

            const data=tournamentData[tournamentId];

            if(!data) continue;

            const containers=[
                data.shows,
                data.weekly,
                (!Array.isArray(data.matches)
                    ?data.matches
                    :null)
            ];

            containers.forEach(container=>{

                if(!container) return;

                Object.entries(container).forEach(
                    ([id,show])=>{

                        const match=id.match(
                            /^nxt-(\d+)$/i
                        );

                        if(!match || !show || !show.date){
                            return;
                        }

                        const number=match[1];

                        if(nxtSeen[number]){
                            return;
                        }

                        nxtSeen[number]=true;

                        events.push({

                            id:id.toLowerCase(),

                            title:
                                show.title ||
                                "NXT #"+number,

                            date:show.date,

                            type:"NXT",

                            source:"tournamentData",

                            category:"NXT",

                            image:show.image || "",

                            brand:"NXT",

                            tournamentId:tournamentId

                        });

                    }
                );

            });

        }

    }


    /* =====================================
       PLE + TAKEOVER
       eventData / addPLE
       ===================================== */

    if(
        typeof eventData!=="undefined" &&
        eventData &&
        typeof eventData==="object"
    ){

        Object.entries(eventData).forEach(
            ([id,event])=>{

                if(!event || !event.date) return;

                const type=
                    String(event.type || "")
                    .toUpperCase();

                if(type!=="PLE"){
                    return;
                }

                const text=(
                    String(event.title || "")+
                    " "+
                    String(id || "")
                ).toLowerCase();

                const takeover=
                    text.includes("takeover") ||
                    text.includes("take over");

                events.push({

                    id:id,

                    title:
                        event.title ||
                        id.toUpperCase(),

                    date:event.date,

                    type:"PLE",

                    source:"eventData",

                    category:
                        takeover
                        ?"TAKEOVER"
                        :"PLE",

                    image:event.image || "",

                    brand:event.brand || "",

                    original:event,

                    takeover:takeover

                });

            }
        );

    }


    /* =====================================
       OUTSIDERS
       SPEED / AEW / AAA / CMLL / TNA
       ===================================== */

    if(
        typeof outsiderData!=="undefined" &&
        outsiderData &&
        typeof outsiderData==="object"
    ){

        Object.entries(outsiderData).forEach(
            ([tournamentId,tournament])=>{

                if(
                    !tournament ||
                    !tournament.shows
                ){
                    return;
                }

                Object.entries(
                    tournament.shows
                ).forEach(
                    ([id,show])=>{

                        if(!show || !show.date){
                            return;
                        }

                        const brand=String(
                            tournament.brand ||
                            getShowBrand(id) ||
                            show.brand ||
                            show.type ||
                            ""
                        ).toUpperCase();

                        if(
                            ![
                                "SPEED",
                                "AEW",
                                "AAA",
                                "CMLL",
                                "TNA"
                            ].includes(brand)
                        ){
                            return;
                        }

                        events.push({

                            id:id,

                            title:
                                show.title ||
                                brand+" #"+
                                id.split("-").pop(),

                            date:show.date,

                            type:brand,

                            source:"outsiderData",

                            category:brand,

                            image:show.image || "",

                            brand:brand,

                            tournamentId:tournamentId

                        });

                    }
                );

            }
        );

    }


    /* =====================================
       ELIMINAR DUPLICADOS
       ===================================== */

    const unique={};

    events.forEach(event=>{

        const key=
            String(event.id || "")
            .toLowerCase();

        if(!key) return;

        /*
         * Si hay un duplicado,
         * conservamos el primero.
         */

        if(!unique[key]){
            unique[key]=event;
        }

    });


    const result=Object.values(unique);


    /* =====================================
       ORDEN GENERAL POR FECHA
       ===================================== */

    result.sort((a,b)=>{

        const dateA=parseDate(a.date);
        const dateB=parseDate(b.date);

        if(dateA!==dateB){
            return dateA-dateB;
        }

        return String(a.id)
            .localeCompare(String(b.id));

    });


    return result;

}


/* =========================================
   IDENTIFICAR TAKEOVER
   ========================================= */

function isTakeOver(event){

    if(!event) return false;

    if(event.category==="TAKEOVER"){
        return true;
    }

    const text=(
        String(event.title || "")+
        " "+
        String(event.id || "")
    ).toLowerCase();

    return(
        text.includes("takeover") ||
        text.includes("take over")
    );

}


/* =========================================
   IDENTIFICAR PLE
   ========================================= */

function isPLE(event){

    if(!event) return false;

    return(
        event.source==="eventData" &&
        String(event.type || "")
        .toUpperCase()==="PLE" &&
        !isTakeOver(event)
    );

}


/* =========================================
   IDENTIFICAR WEEKLY
   ========================================= */

function isWeekly(event){

    if(!event) return false;

    return(
        String(event.type || "")
        .toUpperCase()==="WEEKLY" &&
        event.id &&
        String(event.id)
        .toLowerCase()
        .startsWith("weekly-")
    );

}


/* =========================================
   IDENTIFICAR NXT
   ========================================= */

function isNXT(event){

    if(!event) return false;

    return(
        String(event.type || "")
        .toUpperCase()==="NXT"
    );

}


/* =========================================
   IDENTIFICAR OUTSIDER
   ========================================= */

function isOutsider(event){

    if(!event) return false;

    return(
        event.source==="outsiderData"
    );

}


/* =========================================
   SAGA PLE
   ========================================= */

function getChronologySaga(event){

    if(!event) return null;

    const text=(
        String(event.title || "")+
        " "+
        String(event.id || "")
    ).toLowerCase();


    const sagas=[

        "wrestlemania",

        "royal rumble",

        "summerslam",
        "summer slam",

        "money in the bank",

        "night of champions",

        "survivor series",

        "backlash",

        "extreme rules",

        "hell in a cell",

        "elimination chamber",

        "clash of champions",

        "king of the ring",

        "crown jewel",

        "fastlane",

        "payback",

        "tlc",

        "worlds collide",

        "clash at the castle",

        "clash in italy"

    ];


    for(const saga of sagas){

        if(text.includes(saga)){
            return saga;
        }

    }


    return null;

}


/* =========================================
   ID DE COMPARACIÓN
   ========================================= */

function getChronologyCurrentId(event){

    if(!event) return null;

    return String(
        event.id || ""
    ).toLowerCase();

}


/* =========================================
   EVENTO EQUIVALENTE PARA GENERAL
   ========================================= */

function getGeneralEquivalent(event,events){

    if(!event) return null;

    const id=
        String(event.id || "")
        .toLowerCase();


    /* ================================
       RAW / SMACKDOWN
       ================================ */

    const rawMatch=
        id.match(
            /^(raw|smackdown)-(\d+)$/
        );


    if(rawMatch){

        const weeklyId=
            "weekly-"+rawMatch[2];

        const weekly=
            events.find(
                e =>
                    String(e.id)
                    .toLowerCase()===weeklyId
            );

        if(weekly){
            return weekly;
        }

    }


    /* ================================
       WEEKLY
       ================================ */

    if(
        id.startsWith("weekly-")
    ){
        return event;
    }


    return event;

}


/* =========================================
   ENCONTRAR EVENTO ACTUAL
   ========================================= */

function findChronologyIndex(
    list,
    event
){

    if(!event || !list.length){
        return -1;
    }

    const id=
        getChronologyCurrentId(event);


    let index=list.findIndex(
        e =>
            getChronologyCurrentId(e)===id
    );


    if(index!==-1){
        return index;
    }


    /*
     * SEGURIDAD EXTRA:
     * si el ID no coincide,
     * buscamos por fecha + título.
     */

    index=list.findIndex(
        e =>
            parseDate(e.date)===parseDate(event.date) &&
            String(e.title || "")
            .toLowerCase()===
            String(event.title || "")
            .toLowerCase()
    );


    return index;

}


/* =========================================
   CARD LINK
   ========================================= */

function chronologyLink(
    event,
    current=false
){

    if(!event){

        return `
            <div class="chronology-card chronology-empty">
                —
            </div>
        `;

    }


    const id=
        getChronologyCurrentId(event);


    let href;


    if(current){

        /*
         * EL EVENTO CENTRAL
         * SIEMPRE RECARGA LA URL ACTUAL.
         */

        href=window.location.href;

    }else{

        href=
            "event.html?id="+
            encodeURIComponent(id);

    }


    return `
        <a
            class="chronology-link"
            href="${href}"
        >

            <div class="chronology-card">

                ${
                    event.image
                    ?
                    `
                    <img
                        class="chronology-image"
                        src="${event.image}"
                        alt="${event.title || ""}"
                        onerror="this.style.display='none'"
                    >
                    `
                    :
                    ""
                }

                <div class="chronology-title">
                    ${event.title || id}
                </div>

                ${
                    event.date
                    ?
                    `
                    <div class="chronology-date">
                        ${event.date}
                    </div>
                    `
                    :
                    ""
                }

            </div>

        </a>
    `;

}


/* =========================================
   CREAR FILA
   SIEMPRE 3 COLUMNAS
   ========================================= */

function createChronologyRow(
    title,
    previous,
    current,
    next
){

    return `
        <div class="chronology-block">

            <h3>${title}</h3>

            <div class="chronology-row">

                <div class="chronology-column">
                    ${chronologyLink(
                        previous,
                        false
                    )}
                </div>

                <div class="chronology-column chronology-current">
                    ${chronologyLink(
                        current,
                        true
                    )}
                </div>

                <div class="chronology-column">
                    ${chronologyLink(
                        next,
                        false
                    )}
                </div>

            </div>

        </div>
    `;

}


/* =========================================
   GENERAL
   TODOS LOS EVENTOS
   ========================================= */

function renderGeneralChronology(
    events,
    event
){

    const list=
        events
        .filter(e=>e.date)
        .sort(
            (a,b)=>
                parseDate(a.date)-
                parseDate(b.date)
        );


    const current=
        getGeneralEquivalent(
            event,
            events
        );


    if(!current){

        return `
            <div class="chronology-block">
                <h3>GENERAL</h3>
                <div class="chronology-row">

                    <div class="chronology-column">
                        ${chronologyLink(null,false)}
                    </div>

                    <div class="chronology-column chronology-current">
                        ${chronologyLink(null,true)}
                    </div>

                    <div class="chronology-column">
                        ${chronologyLink(null,false)}
                    </div>

                </div>
            </div>
        `;

    }


    const index=
        findChronologyIndex(
            list,
            current
        );


    if(index===-1){

        return createChronologyRow(
            "GENERAL",
            null,
            current,
            null
        );

    }


    return createChronologyRow(

        "GENERAL",

        list[index-1] || null,

        list[index],

        list[index+1] || null

    );

}


/* =========================================
   WEEKLY
   ========================================= */

function renderWeeklyChronology(
    events,
    event
){

    const list=
        events
        .filter(e=>isWeekly(e))
        .sort(
            (a,b)=>
                parseDate(a.date)-
                parseDate(b.date)
        );


    const id=
        String(event.id || "")
        .toLowerCase();


    let current=event;


    /*
     * RAW-X / SMACKDOWN-X
     * -> WEEKLY-X
     */

    const rawMatch=
        id.match(
            /^(raw|smackdown)-(\d+)$/
        );


    if(rawMatch){

        const weeklyId=
            "weekly-"+rawMatch[2];

        current=
            list.find(
                e =>
                    String(e.id)
                    .toLowerCase()===weeklyId
            ) || event;

    }


    /*
     * Si entramos por weekly-X
     */

    if(id.startsWith("weekly-")){

        current=
            list.find(
                e =>
                    String(e.id)
                    .toLowerCase()===id
            ) || event;

    }


    const index=
        findChronologyIndex(
            list,
            current
        );


    if(index===-1){

        return createChronologyRow(
            "WEEKLY",
            null,
            current,
            null
        );

    }


    return createChronologyRow(

        "WEEKLY",

        list[index-1] || null,

        list[index],

        list[index+1] || null

    );

}


/* =========================================
   NXT
   ========================================= */

function renderNXTChronology(
    events,
    event
){

    const list=
        events
        .filter(
            e =>
                isNXT(e) &&
                !isTakeOver(e)
        )
        .sort(
            (a,b)=>
                parseDate(a.date)-
                parseDate(b.date)
        );


    const index=
        findChronologyIndex(
            list,
            event
        );


    if(index===-1){

        return createChronologyRow(
            "NXT",
            null,
            event,
            null
        );

    }


    return createChronologyRow(

        "NXT",

        list[index-1] || null,

        list[index],

        list[index+1] || null

    );

}


/* =========================================
   TAKEOVER
   ========================================= */

function renderTakeOverChronology(
    events,
    event
){

    const list=
        events
        .filter(
            e => isTakeOver(e)
        )
        .sort(
            (a,b)=>
                parseDate(a.date)-
                parseDate(b.date)
        );


    const index=
        findChronologyIndex(
            list,
            event
        );


    if(index===-1){

        return createChronologyRow(
            "TAKEOVER",
            null,
            event,
            null
        );

    }


    return createChronologyRow(

        "TAKEOVER",

        list[index-1] || null,

        list[index],

        list[index+1] || null

    );

}


/* =========================================
   OUTSIDER
   ========================================= */

function renderOutsiderChronology(
    events,
    event
){

    const category=
        String(
            event.category ||
            event.type ||
            ""
        ).toUpperCase();


    const list=
        events
        .filter(
            e =>
                isOutsider(e) &&
                String(
                    e.category ||
                    e.type ||
                    ""
                ).toUpperCase()===category
        )
        .sort(
            (a,b)=>
                parseDate(a.date)-
                parseDate(b.date)
        );


    const index=
        findChronologyIndex(
            list,
            event
        );


    if(index===-1){

        return createChronologyRow(
            category,
            null,
            event,
            null
        );

    }


    return createChronologyRow(

        category,

        list[index-1] || null,

        list[index],

        list[index+1] || null

    );

}


/* =========================================
   PLE
   ========================================= */

function renderPLEChronology(
    events,
    event
){

    const list=
        events
        .filter(
            e =>
                isPLE(e)
        )
        .sort(
            (a,b)=>
                parseDate(a.date)-
                parseDate(b.date)
        );


    const index=
        findChronologyIndex(
            list,
            event
        );


    if(index===-1){

        return createChronologyRow(
            "PLE",
            null,
            event,
            null
        );

    }


    return createChronologyRow(

        "PLE",

        list[index-1] || null,

        list[index],

        list[index+1] || null

    );

}


/* =========================================
   SAGA PLE
   ========================================= */

function renderSagaChronology(
    events,
    event
){

    const saga=
        getChronologySaga(event);


    /*
     * Si no pudimos identificar saga,
     * dejamos igualmente la fila.
     */

    if(!saga){

        return createChronologyRow(
            "SAGA",
            null,
            event,
            null
        );

    }


    const list=
        events
        .filter(
            e =>
                isPLE(e) &&
                getChronologySaga(e)===saga
        )
        .sort(
            (a,b)=>
                parseDate(a.date)-
                parseDate(b.date)
        );


    const index=
        findChronologyIndex(
            list,
            event
        );


    if(index===-1){

        return createChronologyRow(
            "SAGA",
            null,
            event,
            null
        );

    }


    return createChronologyRow(

        "SAGA",

        list[index-1] || null,

        list[index],

        list[index+1] || null

    );

}


/* =========================================
   RENDER CHRONOLOGY
   ========================================= */

function renderChronology(event){

    const container=
        document.getElementById(
            "event-chronology"
        );


    if(!container || !event){
        return;
    }


    const events=
        getAllChronologyEvents();


    let html="";


    /* =====================================
       GENERAL
       ===================================== */

    html+=
        renderGeneralChronology(
            events,
            event
        );


    /* =====================================
       PLE
       GENERAL + SAGA + PLE
       ===================================== */

    if(
        isPLE(event)
    ){

        html+=
            renderSagaChronology(
                events,
                event
            );

        html+=
            renderPLEChronology(
                events,
                event
            );

    }


    /* =====================================
       TAKEOVER
       GENERAL + TAKEOVER
       ===================================== */

    else if(
        isTakeOver(event)
    ){

        html+=
            renderTakeOverChronology(
                events,
                event
            );

    }


    /* =====================================
       WEEKLY
       GENERAL + WEEKLY
       ===================================== */

    else if(
        isWeekly(event) ||
        /^(raw|smackdown)-\d+$/i.test(
            String(event.id || "")
        )
    ){

        html+=
            renderWeeklyChronology(
                events,
                event
            );

    }


    /* =====================================
       NXT
       GENERAL + NXT
       ===================================== */

    else if(
        isNXT(event)
    ){

        html+=
            renderNXTChronology(
                events,
                event
            );

    }


    /* =====================================
       OUTSIDERS
       GENERAL + CATEGORY
       ===================================== */

    else if(
        isOutsider(event)
    ){

        html+=
            renderOutsiderChronology(
                events,
                event
            );

    }


    container.innerHTML=html;

}



