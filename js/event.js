/* =========================================
   MI WRESTLING
   EVENT PAGE
   ========================================= */

const eventTitle=document.getElementById("event-title");
const eventDate=document.getElementById("event-date");
const eventBrand=document.getElementById("event-brand");
const eventResults=document.getElementById("event-results");

/* =========================================
   GET EVENT ID
   ========================================= */

const params=new URLSearchParams(window.location.search);
const eventId=params.get("id");

/* =========================================
   FIND EVENT
   ========================================= */

const event=eventData[eventId];

/* =========================================
   EVENT NOT FOUND
   ========================================= */

if(!event){

    eventTitle.textContent="EVENT NOT FOUND";
    eventDate.textContent="";
    eventBrand.textContent="";
    eventResults.innerHTML=`
        <p>THE REQUESTED EVENT COULD NOT BE FOUND.</p>
    `;

}else{

    /* =========================================
       EVENT HEADER
       ========================================= */

    eventTitle.textContent=event.title||"EVENT";
    eventDate.textContent=event.date||"";
    eventBrand.textContent=event.brand||"";

    /* =========================================
       EVENT TYPE
       ========================================= */

    const eventType=document.querySelector(".event-header .event-type");

    if(eventType){

        if(event.type==="WEEKLY")
            eventType.textContent="WEEKLY";

        else if(event.type==="NXT")
            eventType.textContent="NXT";

        else if(event.type==="PLE")
            eventType.textContent="SPECIAL EVENT";

        else
            eventType.textContent=event.type||"EVENT";
    }

    /* =========================================
       RESULTS
       ========================================= */

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
                <p>NO RESULTS AVAILABLE.</p>
            </div>
        `;

        return;
    }

    results.forEach((result,index)=>{

        const card=document.createElement("div");
        card.className="result-card";

        /* =====================================
           TAGS
           ===================================== */

        let tags="";

        if(result.position){

            tags+=`
                <div class="result-position">
                    ${result.position}
                </div>
            `;
        }

        if(result.brand){

            tags+=`
                <div class="result-brand ${result.brand.toLowerCase()}">
                    ${result.brand}
                </div>
            `;
        }

        if(result.championship){

            tags+=`
                <div class="result-championship">
                    ${result.championship}
                </div>
            `;
        }

        /* =====================================
           FATAL 4-WAY
           ===================================== */

        if(result.type==="FATAL 4-WAY"){

            let participants="";

            if(result.participants){

                result.participants.forEach((name,i)=>{

                    const score=result.scores?.[i]??"";

                    participants+=`
                        <div class="result-superstar">
                            <span>${name}</span>
                            <strong>${score}</strong>
                        </div>
                    `;
                });
            }

            card.innerHTML=`
                ${tags}

                <div class="result-type">
                    ${result.match||"FATAL 4-WAY MATCH"}
                </div>

                <div class="result-participants">
                    ${participants}
                </div>
            `;

            eventResults.appendChild(card);
            return;
        }

        /* =====================================
           TAG TEAM
           ===================================== */

        if(result.type==="TAG TEAM"){

            card.innerHTML=`
                ${tags}

                <div class="result-type">
                    TAG TEAM
                </div>

                <div class="result-match">

                    <div class="result-superstar">
                        <span>${result.wrestler1||""}</span>
                        <strong>${result.score1??""}</strong>
                    </div>

                    <div class="result-vs">
                        VS
                    </div>

                    <div class="result-superstar">
                        <span>${result.wrestler2||""}</span>
                        <strong>${result.score2??""}</strong>
                    </div>

                </div>
            `;

            eventResults.appendChild(card);
            return;
        }

        /* =====================================
           NORMAL MATCH
           ===================================== */

        card.innerHTML=`
            ${tags}

            <div class="result-type">
                ${result.type||"SINGLES"}
            </div>

            <div class="result-match">

                <div class="result-superstar">
                    <span>${result.wrestler1||""}</span>
                    <strong>${result.score1??""}</strong>
                </div>

                <div class="result-vs">
                    VS
                </div>

                <div class="result-superstar">
                    <span>${result.wrestler2||""}</span>
                    <strong>${result.score2??""}</strong>
                </div>

            </div>
        `;

        eventResults.appendChild(card);
    });
}
