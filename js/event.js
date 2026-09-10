/* =========================================
   MI WRESTLING
   EVENT PAGE
   ========================================= */

const eventTitle=document.getElementById("event-title");
const eventDate=document.getElementById("event-date");
const eventBrand=document.getElementById("event-brand");
const eventResults=document.getElementById("event-results");

const params=new URLSearchParams(window.location.search);
const eventId=params.get("id");
const event=eventData[eventId];

/* =========================================
   EVENT
   ========================================= */

if(!event){

    eventTitle.textContent="EVENT NOT FOUND";
    eventDate.textContent="";
    eventBrand.textContent="";
    eventResults.innerHTML="<p>THE REQUESTED EVENT COULD NOT BE FOUND.</p>";

}else{

    eventTitle.textContent=event.title||"EVENT";
    eventDate.textContent=event.date||"";
    eventBrand.textContent=event.brand||"";

    const eventType=document.querySelector(".event-header .event-type");

    if(eventType){
        eventType.textContent=
            event.type==="PLE"?"SPECIAL EVENT":
            event.type||"EVENT";
    }

    renderResults(event.results||[]);
}

/* =========================================
   RENDER RESULTS
   ========================================= */

function renderResults(results){

    eventResults.innerHTML="";

    if(!results.length){
        eventResults.innerHTML=`
            <div class="result-card">
                <div class="match-winner">NO RESULTS AVAILABLE.</div>
            </div>
        `;
        return;
    }

    results.forEach(result=>{

        const card=document.createElement("div");
        card.className=`result-card brand-${(result.brand||event.brand||"PLE").toLowerCase()}`;

        let html="";

        /* =====================================
           POSITION
           ===================================== */

        if(result.position){
            html+=`
                <div class="match-name">
                    ${result.position}
                </div>
            `;
        }

        /* =====================================
           CHAMPIONSHIP
           ===================================== */

        if(result.championship){
            html+=`
                <div class="championship-name">
                    ${result.championship}
                </div>
            `;
        }

        /* =====================================
           FATAL 4-WAY
           ===================================== */

        if(result.type==="FATAL 4-WAY"){

            html+=`
                <div class="match-name">
                    ${result.match||"FATAL 4-WAY MATCH"}
                </div>

                <div class="match">
                    <div class="team">
            `;

            (result.participants||[]).forEach((name,i)=>{

                const score=result.scores?.[i]??"";

                html+=`
                    <div class="wrestler">
                        <span>${name}</span>
                    </div>
                `;

            });

            html+=`
                    </div>

                    <div class="vs">
                        <div>FINAL</div>
                        <div class="match-score">
                            ${result.scores?.join(" - ")||""}
                        </div>
                    </div>
                </div>
            `;

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
                        ${createWrestler(result.wrestler1)}
                    </div>

                    <div class="vs">
                        <div>VS</div>
                        ${createScore(result.score1,result.score2)}
                    </div>

                    <div class="team">
                        ${createWrestler(result.wrestler2)}
                    </div>

                </div>
            `;

        }

        /* =====================================
           NORMAL MATCH
           ===================================== */

        else{

            html+=`
                <div class="match-name">
                    ${result.type||"SINGLES"}
                </div>

                <div class="match">

                    <div class="team">
                        ${createWrestler(result.wrestler1)}
                    </div>

                    <div class="vs">
                        <div>VS</div>
                        ${createScore(result.score1,result.score2)}
                    </div>

                    <div class="team">
                        ${createWrestler(result.wrestler2)}
                    </div>

                </div>
            `;

        }

        /* =====================================
           WINNER
           ===================================== */

        const score1=Number(result.score1);
        const score2=Number(result.score2);

        if(!isNaN(score1)&&!isNaN(score2)){

            let winner="DRAW";

            if(score1>score2)
                winner=result.wrestler1;

            else if(score2>score1)
                winner=result.wrestler2;

            html+=`
                <div class="match-winner">
                    WINNER:
                    <strong>${winner}</strong>
                </div>
            `;
        }

        card.innerHTML=html;
        eventResults.appendChild(card);
    });
}

/* =========================================
   WRESTLER
   ========================================= */

function createWrestler(name){

    if(!name)return"";

    return`
        <div class="wrestler" tabindex="0">
            <span>${name}</span>
        </div>
    `;
}

/* =========================================
   SCORE
   ========================================= */

function createScore(score1,score2){

    return`
        <div class="match-score">
            <span>${score1??""}</span>
            <span>-</span>
            <span>${score2??""}</span>
        </div>
    `;
}
