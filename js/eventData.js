/* =========================================
   MI WRESTLING
   EVENT DATABASE
   ========================================= */

const eventData={};

/* =========================================
   DATE
   ========================================= */

function addDays(date,days){
const [d,m,y]=date.split("/").map(Number);
const result=new Date(y,m-1,d);
result.setDate(result.getDate()+days);
return String(result.getDate()).padStart(2,"0")+"/"+String(result.getMonth()+1).padStart(2,"0")+"/"+result.getFullYear();
}

/* =========================================
   WEEKLY
   ========================================= */

function createWeeklyData(){
if(typeof tournamentData==="undefined")return;
const startDate="06/09/2026";

for(let weekly=1;weekly<=28;weekly++){
const tournamentNumber=Math.floor((weekly-1)/7)+1;
const round=((weekly-1)%7)+1;
const raw=tournamentData[`raw-${tournamentNumber}`];
const smackdown=tournamentData[`smackdown-${tournamentNumber}`];

if(!raw&&!smackdown)continue;

const results=[];

[raw,smackdown].forEach((tournament,index)=>{
if(!tournament?.matches)return;

tournament.matches
.filter(m=>Number(m.date)===round)
.forEach(m=>{
results.push({
type:"SINGLES",
brand:index===0?"RAW":"SMACKDOWN",
tournament:`TOURNAMENT #${tournamentNumber}`,
round:`ROUND ${round}`,
wrestler1:m.wrestler1,
wrestler2:m.wrestler2,
score1:m.score1,
score2:m.score2
});
});
});

eventData[`weekly-${weekly}`]={
type:"WEEKLY",
title:`WEEKLY #${weekly}`,
date:addDays(startDate,(weekly-1)*7),
brand:"RAW & SMACKDOWN",
results
};
}
}

/* =========================================
   NXT
   ========================================= */

function createNXTData(){
if(typeof tournamentData==="undefined")return;

let eventNumber=1;

Object.keys(tournamentData)
.filter(id=>id.startsWith("nxt-"))
.sort((a,b)=>Number(a.split("-")[1])-Number(b.split("-")[1]))
.forEach(id=>{
const tournament=tournamentData[id];
if(!tournament?.matches)return;

const tournamentNumber=id.split("-")[1];
const startDate=tournament.startDate||"06/09/2026";

const rounds=[...new Set(
tournament.matches
.map(m=>Number(m.date))
.filter(n=>!isNaN(n))
)].sort((a,b)=>a-b);

rounds.forEach(round=>{
const results=tournament.matches
.filter(m=>Number(m.date)===round)
.map(m=>({
type:"SINGLES",
brand:"NXT",
tournament:`TOURNAMENT #${tournamentNumber}`,
round:`ROUND ${round}`,
wrestler1:m.wrestler1,
wrestler2:m.wrestler2,
score1:m.score1,
score2:m.score2
}));

if(!results.length)return;

eventData[`nxt-${eventNumber}`]={
type:"NXT",
title:`NXT #${eventNumber}`,
date:addDays(startDate,round-1),
brand:"NXT",
tournament:`TOURNAMENT #${tournamentNumber}`,
round:`ROUND ${round}`,
results
};

eventNumber++;
});
});
}

/* =========================================
   PLE
   ========================================= */

function addPLE(id,title,date,mode,image,results=[]){
eventData[id]={type:"PLE",title,date,mode,brand:"PLE",image,results};
}

/* =========================================
   2026
   ========================================= */

addPLE("survivor-series-wargames-2026","SURVIVOR SERIES: WARGAMES 2026","20/12/2026","BOOK","images/events/survivor-series-wargames-2026.jpg");
addPLE("crown-jewel-2026","CROWN JEWEL 2026","29/11/2026","BOOK","images/events/crown-jewel-2026.jpg");
addPLE("money-in-the-bank-2026","MONEY IN THE BANK 2026","25/10/2026","ROAD","images/events/money-in-the-bank-2026.jpg");
addPLE("worlds-collide-las-vegas-2026","WORLDS COLLIDE: LAS VEGAS 2026","27/09/2026","BOOK","images/events/worlds-collide-las-vegas-2026.jpg");

addPLE("summerslam-2026","SUMMERSLAM 2026","23/08/2026","ROAD","images/events/summerslam-2026.jpg",[
{type:"FATAL 4-WAY",position:"OPENER",match:"Fatal 4-Way Match",participants:["Bo Dallas","Charlie Dempsey","Je'Von Evans","Karrion Kross"],scores:[0,0,8,0]},
{type:"SINGLES",championship:"Intercontinental Championship",wrestler1:"Bryan Danielson",wrestler2:"Randy Orton",score1:0,score2:10},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Cody Rhodes",wrestler2:"Kyle O'Reilly",score1:6,score2:4},
{type:"TAG TEAM",championship:"WWE World Tag Team Championship",team1:["Bryan Danielson","Jon Moxley"],team2:["Bravo Americano","El Grande Americano"],score1:5,score2:0},
{type:"SINGLES",championship:"World Heavyweight Championship",wrestler1:"Bret Hart",wrestler2:"Axiom",score1:6,score2:2},
{type:"SINGLES",position:"MAIN EVENT",championship:"Undisputed WWE Championship",wrestler1:"Christian Cage",wrestler2:"Seth Rollins",score1:5,score2:5}
]);

addPLE("night-of-champions-2026","NIGHT OF CHAMPIONS 2026","26/07/2026","BOOK","images/events/night-of-champions-2026.jpg");
addPLE("clash-in-italy-2026","CLASH IN ITALY 2026","21/06/2026","ROAD","images/events/clash-in-italy-2026.jpg");
addPLE("backlash-tampa-2026","BACKLASH: TAMPA 2026","24/05/2026","BOOK","images/events/backlash-tampa-2026.jpg");
addPLE("wrestlemania-4-life","WRESTLEMANIA 4 LIFE","26/04/2026","ROAD","images/events/wrestlemania-4-life.jpg");
addPLE("elimination-chamber-2026","ELIMINATION CHAMBER 2026","29/03/2026","BOOK","images/events/elimination-chamber-2026.jpg");

addPLE("royal-rumble-2026","ROYAL RUMBLE 2026","23/02/2026","ROAD","images/events/royal-rumble-2026.jpg",[
{type:"SINGLES",position:"OPENER",championship:"World Heavyweight Championship",wrestler1:"Cody Rhodes",wrestler2:"Seth Rollins",score1:3,score2:4},
{type:"TAG TEAM",championship:"WWE World Tag Team Championship",team1:["Bron Breakker","Seth Rollins"],team2:["Cody Rhodes","Randy Orton"],score1:0,score2:3},
{type:"SINGLES",championship:"Undisputed WWE Championship",wrestler1:"Christian Cage",wrestler2:"Randy Orton",score1:6,score2:4},
{type:"ROYAL RUMBLE",position:"MAIN EVENT",participants:["Swerve Strickland","Trick Williams","R-Truth","Austin Theory","Ilja Dragunov","Kyle O'Reilly","Bo Dallas","CM Punk","JD Mcdonagh","Bret Hart","Alberto del Rio","Finn Balor","Rey Fenix","LA Knight","Karrion Kross","Rob Van Dam","Axiom","Wade Barrett","Randy Orton","Batista","Jon Moxley","Dezmond Xavier","Sheamus","Joe Hendry","Shawn Spears","Bron Breakker","Bryan Danielson","Jacob Fatu","Rey Mysterio","Chris Benoit"],winner:"Swerve Strickland"}
]);

addPLE("saturday-nights-main-event-2026","SATURDAY NIGHT'S MAIN EVENT 2026","24/01/2026","BOOK","images/events/saturday-nights-main-event-2026.jpg");

/* =========================================
   2025
   ========================================= */

addPLE("survivor-series-wargames-2025","SURVIVOR SERIES: WARGAMES 2025","20/12/2025","BOOK","images/events/survivor-series-wargames-2025.jpg");
addPLE("crown-jewel-2025","CROWN JEWEL 2025","22/11/2025","BOOK","images/events/crown-jewel-2025.jpg");
addPLE("wrestlepalooza-2025","WRESTLEPALOOZA 2025","26/10/2025","BOOK","images/events/wrestlepalooza-2025.jpg");
addPLE("clash-in-paris-2025","CLASH IN PARIS 2025","18/10/2025","ROAD","images/events/clash-in-paris-2025.jpg");
addPLE("summerslam-2025","SUMMERSLAM 2025","20/09/2025","BOOK","images/events/summerslam-2025.jpg");
addPLE("money-in-the-bank-2025","MONEY IN THE BANK 2025","23/08/2025","ROAD","images/events/money-in-the-bank-2025.jpg");
addPLE("night-of-champions-2025","NIGHT OF CHAMPIONS 2025","26/07/2025","BOOK","images/events/night-of-champions-2025.jpg");
addPLE("backlash-st-louis-2025","BACKLASH ST. LOUIS 2025","28/06/2025","BOOK","images/events/backlash-st-louis-2025.jpg");
addPLE("wrestlemania-iii-sunday","WRESTLEMANIA III SUNDAY","08/06/2025","BOOK","images/events/wrestlemania-iii-sunday.jpg");
addPLE("wrestlemania-iii-saturday","WRESTLEMANIA III SATURDAY","07/06/2025","BOOK","images/events/wrestlemania-iii-saturday.jpg");
addPLE("elimination-chamber-toronto-2025","ELIMINATION CHAMBER: TORONTO 2025","22/04/2025","ROAD","images/events/elimination-chamber-toronto-2025.jpg");
addPLE("royal-rumble-2025","ROYAL RUMBLE 2025","22/03/2025","BOOK","images/events/royal-rumble-2025.jpg");
addPLE("tlc-2025","TLC 2025","24/02/2025","ROAD","images/events/tlc-2025.jpg");
addPLE("saturday-nights-main-event-2025","SATURDAY NIGHT'S MAIN EVENT 2025","25/01/2025","BOOK","images/events/saturday-nights-main-event-2025.jpg");

/* =========================================
   2024
   ========================================= */

addPLE("survivor-series-wargames-2024","SURVIVOR SERIES: WARGAMES 2024","22/12/2024","BOOK","images/events/survivor-series-wargames-2024.jpg");
addPLE("crown-jewel-2024","CROWN JEWEL 2024","26/11/2024","BOOK","images/events/crown-jewel-2024.jpg");
addPLE("bad-blood-2024","BAD BLOOD 2024","27/10/2024","ROAD","images/events/bad-blood-2024.jpg");
addPLE("bash-in-berlin-2024","BASH IN BERLIN 2024","23/09/2024","BOOK","images/events/bash-in-berlin-2024.jpg");
addPLE("summerslam-2024","SUMMERSLAM 2024","25/08/2024","BOOK","images/events/summerslam-2024.jpg");
addPLE("money-in-the-bank-2024","MONEY IN THE BANK 2024","22/07/2024","ROAD","images/events/money-in-the-bank-2024.jpg");
addPLE("clash-at-the-castle-scotland-2024","CLASH AT THE CASTLE: SCOTLAND 2024","23/06/2024","BOOK","images/events/clash-at-the-castle-scotland-2024.jpg");
addPLE("backlash-france-2024","BACKLASH FRANCE 2024","20/05/2024","ROAD","images/events/backlash-france-2024.jpg");
addPLE("wrestlemania-ii","WRESTLEMANIA II","28/04/2024","BOOK","images/events/wrestlemania-ii.jpg");
addPLE("elimination-chamber-perth-2024","ELIMINATION CHAMBER: PERTH 2024","25/03/2024","ROAD","images/events/elimination-chamber-perth-2024.jpg");
addPLE("royal-rumble-2024","ROYAL RUMBLE 2024: 1ST ANNIVERSARY","25/02/2024","BOOK","images/events/royal-rumble-2024.jpg");
addPLE("tlc-2024","TLC 2024","22/01/2024","ROAD","images/events/tlc-2024.jpg");

/* =========================================
   2023
   ========================================= */

addPLE("survivor-series-wargames-2023","SURVIVOR SERIES: WARGAMES 2023","17/12/2023","BOOK","images/events/survivor-series-wargames-2023.jpg");
addPLE("crown-jewel-2023","CROWN JEWEL 2023","27/11/2023","ROAD","images/events/crown-jewel-2023.jpg");
addPLE("fastlane-2023","FASTLANE 2023","29/10/2023","BOOK","images/events/fastlane-2023.jpg");
addPLE("payback-2023","PAYBACK 2023","02/10/2023","ROAD","images/events/payback-2023.jpg");
addPLE("summerslam-2023","SUMMERSLAM 2023","03/09/2023","BOOK","images/events/summerslam-2023.jpg");
addPLE("money-in-the-bank-2023","MONEY IN THE BANK 2023","07/08/2023","ROAD","images/events/money-in-the-bank-2023.jpg");
addPLE("night-of-champions-2023","NIGHT OF CHAMPIONS 2023","12/06/2023","ROAD","images/events/night-of-champions-2023.jpg");
addPLE("backlash-2023","BACKLASH 2023","05/05/2023","ROAD","images/events/backlash-2023.jpg");
addPLE("wrestlemania-i","WRESTLEMANIA I","10/04/2023","ROAD","images/events/wrestlemania-i.jpg");

addPLE("elimination-chamber-2023","ELIMINATION CHAMBER 2023","19/03/2023","ROAD","images/events/elimination-chamber-2023.jpg",[
{type:"SINGLES",position:"OPENER",wrestler1:"Bryan Danielson",wrestler2:"Rob Van Dam",score1:5,score2:0},
{type:"SINGLES",wrestler1:"Roman Reigns",wrestler2:"John Cena",score1:5,score2:0},
{type:"SINGLES",wrestler1:"AJ Styles",wrestler2:"Adam Cole",score1:0,score2:3},
{type:"SINGLES",wrestler1:"Cody Rhodes",wrestler2:"RICOCHET",score1:4,score2:1},
{type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"Roman Reigns",score1:4,score2:1},
{type:"SINGLES",wrestler1:"Adam Cole",wrestler2:"Cody Rhodes",score1:1,score2:4},
{type:"SINGLES",position:"MAIN EVENT",championship:"Undisputed WWE Championship",wrestler1:"Bryan Danielson",wrestler2:"Cody Rhodes",score1:3,score2:2}
]);

/* =========================================
   START
   ========================================= */
eventData["live-6"]={type:"SPECIAL",title:"WWE LIVE #6",date:"15/03/2023",mode:"ROAD",brand:"LIVE",results:[{type:"SINGLES",position:"OPENER",wrestler1:"Rob Van Dam",wrestler2:"RICOCHET",score1:2,score2:1},{type:"SINGLES",wrestler1:"The Rock",wrestler2:"RICOCHET",score1:0,score2:5},{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Rob Van Dam",wrestler2:"The Rock",score1:5,score2:0}]};
eventData["live-5"]={type:"SPECIAL",title:"WWE LIVE #5",date:"13/03/2023",mode:"ROAD",brand:"LIVE",results:[{type:"SINGLES",position:"OPENER",wrestler1:"Adam Cole",wrestler2:"Damian Priest",score1:3,score2:0},{type:"SINGLES",wrestler1:"Cody Rhodes",wrestler2:"John Cena",score1:5,score2:0},{type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"RICOCHET",score1:2,score2:3},{type:"SINGLES",wrestler1:"The Rock",wrestler2:"Chris Jericho",score1:5,score2:0},{type:"SINGLES",wrestler1:"Kevin Owens",wrestler2:"Randy Orton",score1:0,score2:5},{type:"SINGLES",wrestler1:"AJ Styles",wrestler2:"Kofi Kingston",score1:4,score2:0},{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Roman Reigns",wrestler2:"Rob Van Dam",score1:4,score2:1}]};
eventData["live-4"]={type:"SPECIAL",title:"WWE LIVE #4",date:"08/03/2023",mode:"ROAD",brand:"LIVE",results:[{type:"SINGLES",position:"OPENER",wrestler1:"John Cena",wrestler2:"Adam Cole",score1:3,score2:0},{type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"The Rock",score1:5,score2:0},{type:"SINGLES",wrestler1:"Cody Rhodes",wrestler2:"Roman Reigns",score1:4,score2:1},{type:"SINGLES",wrestler1:"Kevin Owens",wrestler2:"Chris Jericho",score1:0,score2:0},{type:"SINGLES",wrestler1:"Damian Priest",wrestler2:"Seth Rollins",score1:5,score2:0},{type:"SINGLES",wrestler1:"AJ Styles",wrestler2:"Randy Orton",score1:5,score2:0},{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Rob Van Dam",wrestler2:"Kofi Kingston",score1:5,score2:0}]};
eventData["live-3"]={type:"SPECIAL",title:"WWE LIVE #3",date:"06/03/2023",mode:"ROAD",brand:"LIVE",results:[{type:"SINGLES",position:"OPENER",wrestler1:"Roman Reigns",wrestler2:"Adam Cole",score1:1,score2:4},{type:"SINGLES",wrestler1:"Seth Rollins",wrestler2:"John Cena",score1:0,score2:5},{type:"SINGLES",wrestler1:"Damian Priest",wrestler2:"The Rock",score1:0,score2:5},{type:"SINGLES",wrestler1:"Kevin Owens",wrestler2:"Bryan Danielson",score1:2,score2:3},{type:"SINGLES",wrestler1:"Chris Jericho",wrestler2:"AJ Styles",score1:0,score2:5},{type:"SINGLES",wrestler1:"Randy Orton",wrestler2:"Kofi Kingston",score1:2,score2:1},{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Cody Rhodes",wrestler2:"Rob Van Dam",score1:3,score2:2}]};
eventData["live-2"]={type:"SPECIAL",title:"WWE LIVE #2",date:"01/03/2023",mode:"ROAD",brand:"LIVE",results:[{type:"SINGLES",position:"OPENER",wrestler1:"Cody Rhodes",wrestler2:"Adam Cole",score1:3,score2:1},{type:"SINGLES",wrestler1:"Seth Rollins",wrestler2:"Roman Reigns",score1:0,score2:5},{type:"SINGLES",wrestler1:"The Rock",wrestler2:"John Cena",score1:0,score2:5},{type:"SINGLES",wrestler1:"Kevin Owens",wrestler2:"Damian Priest",score1:3,score2:2},{type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"AJ Styles",score1:5,score2:0},{type:"SINGLES",wrestler1:"Kofi Kingston",wrestler2:"Chris Jericho",score1:0,score2:5},{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Rob Van Dam",wrestler2:"Randy Orton",score1:5,score2:0}]};
eventData["live-1"]={type:"SPECIAL",title:"WWE LIVE #1",date:"27/02/2023",mode:"ROAD",brand:"LIVE",results:[{type:"SINGLES",position:"OPENER",wrestler1:"Cody Rhodes",wrestler2:"Seth Rollins",score1:3,score2:2},{type:"SINGLES",wrestler1:"Roman Reigns",wrestler2:"The Rock",score1:5,score2:0},{type:"SINGLES",wrestler1:"John Cena",wrestler2:"Kevin Owens",score1:0,score2:4},{type:"SINGLES",wrestler1:"Damian Priest",wrestler2:"AJ Styles",score1:0,score2:3},{type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"Kofi Kingston",score1:5,score2:0},{type:"SINGLES",wrestler1:"Chris Jericho",wrestler2:"Randy Orton",score1:0,score2:0},{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Adam Cole",wrestler2:"Rob Van Dam",score1:3,score2:2}]};
createWeeklyData();
createNXTData();
