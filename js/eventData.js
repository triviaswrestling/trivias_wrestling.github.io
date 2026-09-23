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

addPLE("night-of-champions-2026","NIGHT OF CHAMPIONS 2026","26/07/2026","BOOK","images/events/night-of-champions-2026.jpg",[
{type:"SINGLES",position:"OPENER",championship:"Intercontinental Championship",wrestler1:"Bryan Danielson",wrestler2:"LA Knight",score1:7,score2:0},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Cody Rhodes",wrestler2:"Trick Williams",score1:6,score2:3},
{type:"SINGLES",championship:"Undisputed WWE Championship",wrestler1:"Christian Cage",wrestler2:"Seth Rollins",score1:7,score2:2},
{type:"STEEL CAGE",position:"MAIN EVENT",championship:"World Heavyweight Championship",wrestler1:"Bret Hart",wrestler2:"Jacob Fatu",score1:3,score2:0}
]);

addPLE("clash-in-italy-2026","CLASH IN ITALY 2026","21/06/2026","ROAD","images/events/clash-in-italy-2026.jpg",[
{type:"SINGLES",position:"OPENER",championship:"Intercontinental Championship",wrestler1:"Kyle O'Reilly",wrestler2:"Bryan Danielson",score1:4,score2:5},
{type:"SINGLES",championship:"NXT Championship",wrestler1:"Bron Breakker",wrestler2:"Bo Dallas",score1:3,score2:7},
{type:"SINGLES",championship:"World Heavyweight Championship",wrestler1:"Jacob Fatu",wrestler2:"Bret Hart",score1:1,score2:9},
{type:"TAG TEAM",championship:"WWE World Tag Team Championship",team1:["Bryan Danielson","Jon Moxley"],team2:["Leon Slater","Je'Von Evans"],score1:4,score2:0},
{type:"FATAL 4-WAY",championship:"Undisputed WWE Championship",participants:["Randy Orton","Axiom","Christian Cage","Seth Rollins"],scores:[1,0,5,3]},
{type:"SINGLES",position:"MAIN EVENT",championship:"United States Championship",wrestler1:"Trick Williams",wrestler2:"Cody Rhodes",score1:3,score2:4}
]);

addPLE("backlash-tampa-2026","BACKLASH: TAMPA 2026","24/05/2026","BOOK","images/events/backlash-tampa-2026.jpg",[
{type:"SINGLES",position:"OPENER",championship:"Undisputed WWE Championship",wrestler1:"Randy Orton",wrestler2:"Axiom",score1:5,score2:5},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Trick Williams",wrestler2:"Shawn Spears",score1:3,score2:3},
{type:"TAG TEAM",championship:"WWE World Tag Team Championship",team1:["Bryan Danielson","Jon Moxley"],team2:["Bron Breakker","Seth Rollins"],score1:3,score2:2},
{type:"SINGLES",championship:"Intercontinental Championship",wrestler1:"Kyle O'Reilly",wrestler2:"Rey Fenix",score1:7,score2:1},
{type:"SINGLES",championship:"World Heavyweight Championship",wrestler1:"Swerve Strickland",wrestler2:"Jacob Fatu",score1:0,score2:10},
{type:"SINGLES",match:"THREE STAGES OF HELL MATCH",position:"MAIN EVENT",wrestler1:"Bo Dallas",wrestler2:"Finn Balor",score1:2,score2:0}
]);

addPLE("wrestlemania-4-life","WRESTLEMANIA 4 LIFE","26/04/2026","ROAD","images/events/wrestlemania-4-life.jpg",[
{type:"SINGLES",position:"OPENER",championship:"United States Championship",wrestler1:"Bret Hart",wrestler2:"Trick Williams",score1:1,score2:4},
{type:"BATTLE ROYALE",match:"ANDRE THE GIANT MEMORIAL BATTLE ROYAL MATCH",participants:["Axiom","Ludwig Kaiser","Rey Fenix","Shawn Spears","Batista","Rey Mysterio"],winner:"Axiom"},
{type:"SINGLES",match:"UNSANCTIONED MATCH",championship:"NXT Championship",wrestler1:"Jacob Fatu",wrestler2:"Bron Breakker",score1:4,score2:6},
{type:"PITCH BLACK",wrestler1:"Bo Dallas",wrestler2:"Finn Balor",score1:2,score2:2},
{type:"TAG TEAM",championship:"WWE World Tag Team Championship",team1:["Cody Rhodes","Randy Orton"],team2:["Bryan Danielson","Jon Moxley"],score1:2,score2:3},
{type:"TAG TEAM",match:"LADDER MATCH",championship:"Intercontinental Championship",team1:["Sheamus"],team2:["Kyle O'Reilly"],score1:0,score2:7},
{type:"SINGLES",championship:"World Heavyweight Championship",wrestler1:"Seth Rollins",wrestler2:"Swerve Strickland",score1:2,score2:6},
{type:"SINGLES",position:"MAIN EVENT",championship:"Undisputed WWE Championship",wrestler1:"Christian Cage",wrestler2:"Randy Orton",score1:3,score2:7}
]);

addPLE("elimination-chamber-2026","ELIMINATION CHAMBER 2026","29/03/2026","BOOK","images/events/elimination-chamber-2026.jpg",[
{type:"ELIMINATION CHAMBER",position:"OPENER",match:"NXT CHAMPIONSHIP ELIMINATION CHAMBER MATCH",championship:"NXT Championship",participants:["Jacob Fatu","Jon Moxley","JD Mcdonagh","Karrion Kross","Joe Hendry","Bo Dallas"],winner:"Jacob Fatu"},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Bret Hart",wrestler2:"Bron Breakker",score1:6,score2:1},
{type:"SINGLES",championship:"Intercontinental Championship",wrestler1:"Sheamus",wrestler2:"Kyle O'Reilly",score1:3,score2:2},
{type:"ELIMINATION CHAMBER",position:"MAIN EVENT",participants:["Randy Orton","Bryan Danielson","Rey Fenix","Batista","LA Knight","Trick Williams"],winner:"Randy Orton"}
]);
addPLE("royal-rumble-2026","ROYAL RUMBLE 2026","23/02/2026","ROAD","images/events/royal-rumble-2026.jpg",[
{type:"SINGLES",position:"OPENER",championship:"World Heavyweight Championship",wrestler1:"Cody Rhodes",wrestler2:"Seth Rollins",score1:3,score2:4},
{type:"TAG TEAM",championship:"WWE World Tag Team Championship",team1:["Bron Breakker","Seth Rollins"],team2:["Cody Rhodes","Randy Orton"],score1:0,score2:3},
{type:"SINGLES",championship:"Undisputed WWE Championship",wrestler1:"Christian Cage",wrestler2:"Randy Orton",score1:6,score2:4},
{type:"ROYAL RUMBLE",position:"MAIN EVENT",participants:["Swerve Strickland","Trick Williams","R-Truth","Austin Theory","Ilja Dragunov","Kyle O'Reilly","Bo Dallas","CM Punk","JD Mcdonagh","Bret Hart","Alberto del Rio","Finn Balor","Rey Fenix","LA Knight","Karrion Kross","Rob Van Dam","Axiom","Wade Barrett","Randy Orton","Batista","Jon Moxley","Dezmond Xavier","Sheamus","Joe Hendry","Shawn Spears","Bron Breakker","Bryan Danielson","Jacob Fatu","Rey Mysterio","Chris Benoit"],winner:"Swerve Strickland"}
]);

addPLE("saturday-nights-main-event-2026","SATURDAY NIGHT'S MAIN EVENT 2026","24/01/2026","BOOK","images/events/saturday-nights-main-event-2026.jpg",[
{type:"SINGLES",position:"OPENER",championship:"NXT Championship",wrestler1:"Timothy Thatcher",wrestler2:"Jacob Fatu",score1:1,score2:3},
{type:"TAG TEAM",championship:"WWE World Tag Team Championship",team1:["Bron Breakker","Seth Rollins"],team2:["Rey Mysterio","Batista"],score1:3,score2:0},
{type:"SINGLES",championship:"Intercontinental Championship",wrestler1:"Kyle O'Reilly",wrestler2:"Sheamus",score1:4,score2:5},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Bret Hart",wrestler2:"Swerve Strickland",score1:10,score2:0},
{type:"SINGLES",championship:"Undisputed WWE Championship",wrestler1:"Trick Williams",wrestler2:"Christian Cage",score1:1,score2:9},
{type:"SINGLES",position:"MAIN EVENT",championship:"World Heavyweight Championship",wrestler1:"Cody Rhodes",wrestler2:"Seth Rollins",score1:7,score2:3}
]);

/* =========================================
   2025
   ========================================= */

addPLE("survivor-series-wargames-2025","SURVIVOR SERIES: WARGAMES 2025","20/12/2025","BOOK","images/events/survivor-series-wargames-2025.jpg",[
{type:"SINGLES",position:"OPENER",championship:"Speed Championship",wrestler1:"Jacob Fatu",wrestler2:"Rey Fenix",score1:3,score2:2},
{type:"TAG TEAM",team1:["Alberto del Rio","Wade Barrett"],team2:["Rey Mysterio","Batista"],score1:0,score2:5},
{type:"SINGLES",championship:"World Heavyweight Championship",wrestler1:"Cody Rhodes",wrestler2:"Sheamus",score1:4,score2:3},
{type:"SINGLES",championship:"Undisputed WWE Championship",wrestler1:"Randy Orton",wrestler2:"Trick Williams",score1:0,score2:1},
{type:"WARGAMES",position:"MAIN EVENT",team1:["Bret Hart","Jey Uso","Christian Cage","Chris Benoit"],team2:["Bron Breakker","Kyle O'Reilly","Seth Rollins","Shawn Michaels"],score1:0,score2:1}
]);
addPLE("crown-jewel-2025","CROWN JEWEL 2025","22/11/2025","BOOK","images/events/crown-jewel-2025.jpg",[
{type:"SINGLES",position:"OPENER",championship:"Speed Championship",wrestler1:"Rey Mysterio",wrestler2:"Jacob Fatu",score1:1,score2:4},
{type:"SINGLES",wrestler1:"Bron Breakker",wrestler2:"Jey Uso",score1:2,score2:3},
{type:"PITCH BLACK",wrestler1:"Chris Benoit",wrestler2:"Kyle O'Reilly",score1:0,score2:6},
{type:"STRAP MATCH",wrestler1:"Bret Hart",wrestler2:"Seth Rollins",score1:13,score2:10},
{type:"SINGLES",position:"MAIN EVENT",championship:"Crown Jewel Championship",wrestler1:"Cody Rhodes",wrestler2:"Randy Orton",score1:3,score2:6}
]);
addPLE("wrestlepalooza-2025","WRESTLEPALOOZA 2025","26/10/2025","BOOK","images/events/wrestlepalooza-2025.jpg",[
{type:"SINGLES",position:"OPENER",wrestler1:"OG Grande Americano",wrestler2:"Jacob Fatu",score1:2,score2:2},
{type:"TAG TEAM",championship:"WWE World Tag Team Championship",team1:["Pete Dunne","Sheamus"],team2:["Bron Breakker","Seth Rollins"],score1:1,score2:3},
{type:"EXTREME RULES",championship:"United States Championship",wrestler1:"Chris Benoit",wrestler2:"Finn Balor",score1:5,score2:0},
{type:"PITCH BLACK",wrestler1:"Bret Hart",wrestler2:"Kyle O'Reilly",score1:7,score2:0},
{type:"SINGLES",match:"FALLS COUNT ANYWHERE MATCH",position:"MAIN EVENT",championship:"World Heavyweight Championship",wrestler1:"Cody Rhodes",wrestler2:"Jon Moxley",score1:11,score2:1}
]);
addPLE("clash-in-paris-2025","CLASH IN PARIS 2025","18/10/2025","ROAD","images/events/clash-in-paris-2025.jpg",[
{type:"SINGLES",position:"OPENER",championship:"Speed Championship",wrestler1:"Rey Mysterio",wrestler2:"Axiom",score1:5,score2:0},
{type:"TAG TEAM",team1:["Alberto del Rio","Wade Barrett"],team2:["Bron Breakker","Seth Rollins"],score1:0,score2:1},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Chris Benoit",wrestler2:"Finn Balor",score1:5,score2:5},
{type:"SINGLES",championship:"Intercontinental Championship",wrestler1:"Kyle O'Reilly",wrestler2:"Pete Dunne",score1:10,score2:0},
{type:"SINGLES",championship:"Undisputed WWE Championship",wrestler1:"Randy Orton",wrestler2:"Christian Cage",score1:6,score2:3},
{type:"SINGLES",position:"MAIN EVENT",championship:"World Heavyweight Championship",wrestler1:"Cody Rhodes",wrestler2:"Bret Hart",score1:5,score2:4}
]);
addPLE("summerslam-2025","SUMMERSLAM 2025","20/09/2025","BOOK","images/events/summerslam-2025.jpg",[
{type:"SINGLES",position:"OPENER",championship:"Speed Championship",wrestler1:"Karrion Kross",wrestler2:"Rey Mysterio",score1:2,score2:3},
{type:"SINGLES",championship:"NXT Championship",wrestler1:"Trick Williams",wrestler2:"Timothy Thatcher",score1:5,score2:5},
{type:"FATAL 4-WAY",championship:"WWE World Tag Team Championship",team1:["Pete Dunne","Sheamus"],team2:["Rey Mysterio","Batista"],team3:["Bron Breakker","Seth Rollins"],team4:["AJ Styles","Finn Balor"],scores:[8,0,0,2]},
{type:"SINGLES",championship:"Undisputed WWE Championship",wrestler1:"Randy Orton",wrestler2:"LA Knight",score1:7,score2:2},
{type:"SINGLES",championship:"Intercontinental Championship",wrestler1:"Christian Cage",wrestler2:"Kyle O'Reilly",score1:2,score2:7},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Chris Benoit",wrestler2:"Jey Uso",score1:3,score2:1},
{type:"SINGLES",match:"FALLS COUNT ANYWHERE MATCH",position:"MAIN EVENT",championship:"World Heavyweight Championship",wrestler1:"Cody Rhodes",wrestler2:"Jacob Fatu",score1:8,score2:7}
]);
addPLE("money-in-the-bank-2025","MONEY IN THE BANK 2025","23/08/2025","ROAD","images/events/money-in-the-bank-2025.jpg",[
{type:"SINGLES",position:"OPENER",championship:"Speed Championship",wrestler1:"Trick Williams",wrestler2:"Sheamus",score1:3,score2:1},
{type:"SINGLES",championship:"World Heavyweight Championship",wrestler1:"Cody Rhodes",wrestler2:"Kyle O'Reilly",score1:6,score2:4},
{type:"SINGLES",championship:"Intercontinental Championship",wrestler1:"Christian Cage",wrestler2:"CM Punk",score1:9,score2:0},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Pete Dunne",wrestler2:"Chris Benoit",score1:3,score2:7},
{type:"TAG TEAM",championship:"WWE World Tag Team Championship",team1:["Bret Hart","Kyle O'Reilly"],team2:["Edge","Christian Cage"],score1:3,score2:2},
{type:"SINGLES",championship:"Undisputed WWE Championship",wrestler1:"Bret Hart",wrestler2:"Randy Orton",score1:2,score2:7},
{type:"LADDER",position:"MAIN EVENT",match:"MONEY IN THE BANK LADDER MATCH",participants:["Adam Cole","Finn Balor","Jacob Fatu","Karrion Kross","LA Knight","Sheamus"],scores:[6,0,0,1,3,2]}
]);
addPLE("night-of-champions-2025","NIGHT OF CHAMPIONS 2025","26/07/2025","BOOK","images/events/night-of-champions-2025.jpg",[
{type:"SINGLES",position:"OPENER",championship:"Speed Championship",wrestler1:"Jacob Fatu",wrestler2:"Trick Williams",score1:2,score2:3},
{type:"TAG TEAM",team1:["Cody Rhodes","Jon Moxley"],team2:["Edge","Christian Cage"],score1:2,score2:3},
{type:"SINGLES",championship:"Intercontinental Championship",wrestler1:"Christian Cage",wrestler2:"CM Punk",score1:10,score2:0},
{type:"TRIPLE THREAT",championship:"United States Championship",participants:["Tommaso Ciampa","Finn Balor","Pete Dunne"],scores:[2,1,7]},
{type:"SINGLES",championship:"NXT Championship",wrestler1:"Ethan Page",wrestler2:"Seth Rollins",score1:6,score2:4},
{type:"SINGLES",match:"2 OUT OF 3 FALLS MATCH",championship:"World Heavyweight Championship",wrestler1:"Cody Rhodes",wrestler2:"Jacob Fatu",score1:2,score2:0},
{type:"SINGLES",position:"MAIN EVENT",championship:"Undisputed WWE Championship",wrestler1:"Bret Hart",wrestler2:"Karrion Kross",score1:4,score2:0}
]);
addPLE("backlash-st-louis-2025","BACKLASH ST. LOUIS 2025","28/06/2025","ROAD","images/events/backlash-st-louis-2025.jpg",[
{type:"SINGLES",position:"OPENER",championship:"Speed Championship",wrestler1:"Jacob Fatu",wrestler2:"Trick Williams",score1:3,score2:2},
{type:"TAG TEAM",championship:"WWE World Tag Team Championship",team1:["Bret Hart","Kyle O'Reilly"],team2:["Trick Williams","Karrion Kross"],score1:4,score2:1},
{type:"SINGLES",wrestler1:"Edge",wrestler2:"Finn Balor",score1:2,score2:2},
{type:"SINGLES",championship:"Intercontinental Championship",wrestler1:"Christian Cage",wrestler2:"Adam Cole",score1:8,score2:1},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Tommaso Ciampa",wrestler2:"Pete Dunne",score1:5,score2:5},
{type:"SINGLES",championship:"World Heavyweight Championship",wrestler1:"Swerve Strickland",wrestler2:"Cody Rhodes",score1:4,score2:5},
{type:"TABLES",match:"TABLES MATCH",position:"MAIN EVENT",championship:"Undisputed WWE Championship",wrestler1:"Randy Orton",wrestler2:"Bret Hart",score1:0,score2:10}
]);
addPLE("wrestlemania-iii-sunday","WRESTLEMANIA III SUNDAY","08/06/2025","BOOK","images/events/wrestlemania-iii-sunday.jpg",[
{type:"SINGLES",position:"OPENER",championship:"NXT Championship",wrestler1:"Ethan Page",wrestler2:"Karrion Kross",score1:5,score2:2},
{type:"BATTLE ROYALE",match:"ANDRE THE GIANT MEMORIAL BATTLE ROYAL MATCH",participants:["Finn Balor","Seth Rollins","Sami Zayn","Alberto del Rio","Kane","LA Knight","Rob Van Dam","Rey Mysterio","Joe Hendry","Edge","Batista","CM Punk"],winner:"Finn Balor"},
{type:"TRIBAL COMBAT",wrestler1:"Jacob Fatu",wrestler2:"Jey Uso",score1:3,score2:3},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Tommaso Ciampa",wrestler2:"Bron Breakker",score1:5,score2:4},
{type:"DEATH MATCH",wrestler1:"Cody Rhodes",wrestler2:"Jeff Jarrett",score1:3,score2:4},
{type:"SINGLES",position:"MAIN EVENT",championship:"Undisputed WWE Championship",wrestler1:"Bret Hart",wrestler2:"Randy Orton",score1:3,score2:7}
]);
addPLE("wrestlemania-iii-saturday","WRESTLEMANIA III SATURDAY","07/06/2025","BOOK","images/events/wrestlemania-iii-saturday.jpg",[
{type:"SINGLES",position:"OPENER",championship:"Speed Championship",wrestler1:"Jacob Fatu",wrestler2:"Trick Williams",score1:3,score2:2},
{type:"TAG TEAM",championship:"WWE World Tag Team Championship",team1:["Bret Hart","Kyle O'Reilly"],team2:["Cody Rhodes","Jon Moxley"],score1:3,score2:1},
{type:"SINGLES",wrestler1:"AJ Styles",wrestler2:"R-Truth",score1:5,score2:0},
{type:"SINGLES",match:"ONLY-ONE-SHOT MATCH",wrestler1:"Drew McIntyre",wrestler2:"Sheamus",score1:0,score2:10},
{type:"SINGLES",championship:"Intercontinental Championship",wrestler1:"Christian Cage",wrestler2:"Adam Cole",score1:6,score2:3},
{type:"SINGLES",position:"MAIN EVENT",championship:"World Heavyweight Championship",wrestler1:"Pete Dunne",wrestler2:"Swerve Strickland",score1:4,score2:5}
]);

addPLE("elimination-chamber-toronto-2025","ELIMINATION CHAMBER: TORONTO 2025","22/04/2025","ROAD","images/events/elimination-chamber-toronto-2025.jpg",[
{type:"SINGLES",position:"OPENER",championship:"Speed Championship",wrestler1:"Jacob Fatu",wrestler2:"Trick Williams",score1:3,score2:2},
{type:"ELIMINATION CHAMBER",championship:"WWE World Tag Team Championship",team1:["Cody Rhodes","Jon Moxley"],team2:["Randy Orton","Christian Cage"],team3:["Jey Uso","Jacob Fatu"],team4:["Rey Mysterio","Batista"],team5:["Edge","Finn Balor"],team6:["Bron Breakker","Tommaso Ciampa"],winner:"Cody Rhodes & Jon Moxley"},
{type:"SINGLES",championship:"Undisputed WWE Championship",wrestler1:"Bret Hart",wrestler2:"Sheamus",score1:6,score2:4},
{type:"SINGLES",championship:"World Heavyweight Championship",wrestler1:"Cody Rhodes",wrestler2:"Pete Dunne",score1:3,score2:6},
{type:"ELIMINATION CHAMBER",position:"MAIN EVENT",participants:["Randy Orton","Cody Rhodes","Tama Tonga","Edge","Finn Balor","Adam Cole"],winner:"Randy Orton"}
]);
addPLE("royal-rumble-2025","ROYAL RUMBLE 2025","22/03/2025","BOOK","images/events/royal-rumble-2025.jpg",[
{type:"SINGLES",position:"OPENER",championship:"Speed Championship",wrestler1:"Jacob Fatu",wrestler2:"Trick Williams",score1:3,score2:2},
{type:"TAG TEAM",championship:"WWE World Tag Team Championship",team1:["Bret Hart","Kyle O'Reilly"],team2:["Pete Dunne","Sheamus"],score1:4,score2:1},
{type:"TABLES",championship:"United States Championship",wrestler1:"Tommaso Ciampa",wrestler2:"Tama Tonga",score1:7,score2:0},
{type:"STEEL CAGE",championship:"Intercontinental Championship",wrestler1:"Randy Orton",wrestler2:"Christian Cage",score1:9,score2:10},
{type:"ROYAL RUMBLE",position:"MAIN EVENT",participants:["Swerve Strickland","Tommaso Ciampa","Bron Breakker","Rey Mysterio","Finn Balor","Edge","Claudio Castagnoli","Batista","Jey Uso","LA Knight","Alberto del Rio","Adam Cole","Pete Dunne","MJF","Ethan Page","Trick Williams","CM Punk","Christian Cage","Shinsuke Nakamura","Jeff Jarrett","Zack Ryder","Rob Van Dam","Randy Orton","Jon Moxley","Jacob Fatu","Tama Tonga","Kane","Owen Hart","Kyle O'Reilly","R-Truth"],winner:"Swerve Strickland"}
]);
addPLE("tlc-2025","TLC 2025","24/02/2025","ROAD","images/events/tlc-2025.jpg",[
{type:"SINGLES",position:"OPENER",championship:"Speed Championship",wrestler1:"Bron Breakker",wrestler2:"Jacob Fatu",score1:2,score2:3},
{type:"TRIPLE THREAT",match:"TRIPLE THREAT MATCH",championship:"NXT Championship",participants:["Christian Cage","Sheamus","AJ Styles"],scores:[7,0,0]},
{type:"SINGLES",championship:"Intercontinental Championship",wrestler1:"Randy Orton",wrestler2:"Christian Cage",score1:7,score2:0},
{type:"TAG TEAM",match:"LADDER MATCH",championship:"WWE World Tag Team Championship",team1:["Bret Hart","Kyle O'Reilly"],team2:["Edge","Finn Balor"],score1:7,score2:0},
{type:"SINGLES",match:"TLC MATCH",championship:"Undisputed WWE Championship",wrestler1:"Jeff Jarrett",wrestler2:"Bret Hart",score1:7,score2:10},
{type:"SINGLES",match:"TLC MATCH",position:"MAIN EVENT",championship:"World Heavyweight Championship",wrestler1:"Adam Cole",wrestler2:"Cody Rhodes",score1:2,score2:10}
]);
addPLE("saturday-nights-main-event-2025","SATURDAY NIGHT'S MAIN EVENT 2025","25/01/2025","BOOK","images/events/saturday-nights-main-event-2025.jpg",[
{type:"SINGLES",position:"OPENER",championship:"Speed Championship",wrestler1:"Bron Breakker",wrestler2:"Edge",score1:3,score2:2},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Tama Tonga",wrestler2:"Tommaso Ciampa",score1:1,score2:3},
{type:"SINGLES",championship:"Intercontinental Championship",match:"STREET FIGHT MATCH",wrestler1:"Randy Orton",wrestler2:"Edge",score1:9,score2:1},
{type:"TAG TEAM",match:"TAG TEAM MATCH",championship:"WWE World Tag Team Championship",team1:["Cody Rhodes","Bryan Danielson"],team2:["Bret Hart","Kyle O'Reilly"],score1:1,score2:4},
{type:"SINGLES",championship:"Undisputed WWE Championship",wrestler1:"Jeff Jarrett",wrestler2:"Finn Balor",score1:9,score2:1},
{type:"SINGLES",position:"MAIN EVENT",championship:"World Heavyweight Championship",wrestler1:"Bryan Danielson",wrestler2:"Adam Cole",score1:2,score2:7}
]);
/* =========================================
   2024
   ========================================= */

addPLE("survivor-series-wargames-2024","SURVIVOR SERIES: WARGAMES 2024","22/12/2024","BOOK","images/events/survivor-series-wargames-2024.jpg",[
{type:"SINGLES",position:"OPENER",championship:"Speed Championship",wrestler1:"Bron Breakker",wrestler2:"Rey Mysterio",score1:4,score2:1},
{type:"SINGLES",wrestler1:"Jey Uso",wrestler2:"Finn Balor",score1:5,score2:0},
{type:"SINGLES",championship:"Intercontinental Championship",wrestler1:"Randy Orton",wrestler2:"Edge",score1:3,score2:0},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Tama Tonga",wrestler2:"Tommaso Ciampa",score1:3,score2:3},
{type:"SINGLES",championship:"Undisputed WWE Championship",wrestler1:"Jeff Jarrett",wrestler2:"Rob Van Dam",score1:7,score2:2},
{type:"WARGAMES",position:"MAIN EVENT",team1:["Cody Rhodes","Bryan Danielson","Jon Moxley","Jeff Hardy"],team2:["Adam Cole","Bret Hart","Kyle O'Reilly","Roderick Strong"],score1:0,score2:11}
]);
addPLE("crown-jewel-2024","CROWN JEWEL 2024","26/11/2024","ROAD","images/events/crown-jewel-2024.jpg",[
{type:"SINGLES",position:"OPENER",championship:"Speed Championship",wrestler1:"Edge",wrestler2:"Bron Breakker",score1:2,score2:3},
{type:"TAG TEAM",championship:"WWE World Tag Team Championship",team1:["Bryan Danielson","Jon Moxley"],team2:["Jey Uso","Jimmy Uso"],score1:4,score2:1},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Tama Tonga",wrestler2:"Adam Cole",score1:5,score2:4},
{type:"SINGLES",championship:"Intercontinental Championship",wrestler1:"Jimmy Uso",wrestler2:"Randy Orton",score1:1,score2:8},
{type:"SINGLES",championship:"World Heavyweight Championship",wrestler1:"Bryan Danielson",wrestler2:"Bret Hart",score1:5,score2:4},
{type:"SINGLES",position:"MAIN EVENT",championship:"Undisputed WWE Championship",wrestler1:"Cody Rhodes",wrestler2:"Jeff Jarrett",score1:3,score2:6}
]);

addPLE("bad-blood-2024","BAD BLOOD 2024","27/10/2024","ROAD","images/events/bad-blood-2024.jpg",[
{type:"SINGLES",position:"OPENER",championship:"Speed Championship",wrestler1:"Edge",wrestler2:"Roman Reigns",score1:4,score2:1},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Tama Tonga",wrestler2:"Finn Balor",score1:5,score2:3},
{type:"SINGLES",championship:"NXT Championship",wrestler1:"Kyle O'Reilly",wrestler2:"Adam Cole",score1:7,score2:3},
{type:"TAG TEAM",match:"SAMOAN TAG TEAM MATCH",team1:["Roman Reigns","Jacob Fatu"],team2:["Jey Uso","Jimmy Uso"],score1:2,score2:3},
{type:"TAG TEAM",match:"IRON MAN MATCH",championship:"WWE World Tag Team Championship",team1:["Bryan Danielson","Jon Moxley"],team2:["Drew McIntyre","Sheamus"],score1:5,score2:0},
{type:"DEATH MATCH",championship:"Undisputed WWE Championship",wrestler1:"Jeff Jarrett",wrestler2:"Cody Rhodes",score1:2,score2:3},
{type:"TRIPLE THREAT",match:"HELL IN A CELL",position:"MAIN EVENT",participants:["Bret Hart","Bron Breakker","Tommaso Ciampa"],scores:[11,1,6]}
]);

addPLE("bash-in-berlin-2024","BASH IN BERLIN 2024","23/09/2024","BOOK","images/events/bash-in-berlin-2024.jpg",[
{type:"SINGLES",position:"OPENER",championship:"Speed Championship",wrestler1:"Edge",wrestler2:"AJ Styles",score1:5,score2:0},
{type:"TRIBAL COMBAT",wrestler1:"Jey Uso",wrestler2:"Jacob Fatu",score1:2,score2:3},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Randy Orton",wrestler2:"Tama Tonga",score1:3,score2:6},
{type:"SINGLES",championship:"Intercontinental Championship",wrestler1:"Adam Cole",wrestler2:"Jimmy Uso",score1:3,score2:4},
{type:"SINGLES",championship:"World Heavyweight Championship",wrestler1:"Bret Hart",wrestler2:"Bryan Danielson",score1:2,score2:3},
{type:"SINGLES",position:"MAIN EVENT",championship:"Undisputed WWE Championship",wrestler1:"Jeff Jarrett",wrestler2:"Cody Rhodes",score1:5,score2:5}
]);
addPLE("summerslam-2024","SUMMERSLAM 2024","25/08/2024","BOOK","images/events/summerslam-2024.jpg",[
{type:"SINGLES",position:"OPENER",championship:"Speed Championship",wrestler1:"Edge",wrestler2:"Tommaso Ciampa",score1:3,score2:2},
{type:"SINGLES",championship:"NXT Championship",wrestler1:"Tama Tonga",wrestler2:"Shawn Spears",score1:5,score2:5},
{type:"TAG TEAM",match:"LADDER MATCH",championship:"WWE World Tag Team Championship",team1:["Bryan Danielson","Jon Moxley"],team2:["Bron Breakker","Tommaso Ciampa"],score1:2,score2:0},
{type:"SINGLES",championship:"Intercontinental Championship",wrestler1:"Adam Cole",wrestler2:"Claudio Castagnoli",score1:3,score2:2},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Randy Orton",wrestler2:"Cody Rhodes",score1:6,score2:2},
{type:"PITCH BLACK",championship:"World Heavyweight Championship",wrestler1:"Bret Hart",wrestler2:"Finn Balor",score1:8,score2:0},
{type:"TRIBAL COMBAT",wrestler1:"Roman Reigns",wrestler2:"Jey Uso",score1:3,score2:6},
{type:"2 OUT OF 3 FALLS",position:"MAIN EVENT",championship:"Undisputed WWE Championship",wrestler1:"Jeff Jarrett",wrestler2:"Pete Dunne",score1:2,score2:1}
]);
addPLE("money-in-the-bank-2024","MONEY IN THE BANK 2024","22/07/2024","ROAD","images/events/money-in-the-bank-2024.jpg",[
{type:"TAG TEAM",position:"OPENER",championship:"WWE World Tag Team Championship",team1:["Bryan Danielson","Jon Moxley"],team2:["Jey Uso","Tama Tonga"],score1:4,score2:1},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Randy Orton",wrestler2:"Jey Uso",score1:9,score2:0},
{type:"SINGLES",championship:"Intercontinental Championship",wrestler1:"Adam Cole",wrestler2:"Rob Van Dam",score1:6,score2:2},
{type:"SINGLES",championship:"World Heavyweight Championship",wrestler1:"Bret Hart",wrestler2:"Jimmy Uso",score1:5,score2:3},
{type:"SINGLES",championship:"Undisputed WWE Championship",wrestler1:"Pete Dunne",wrestler2:"Jeff Jarrett",score1:4,score2:6},
{type:"LADDER",position:"MAIN EVENT",match:"MONEY IN THE BANK LADDER MATCH",participants:["Bryan Danielson","MJF","Bron Breakker","Cody Rhodes","Finn Balor","Tommaso Ciampa"],scores:[1,6,0,4,0,0]}
]);
addPLE("clash-at-the-castle-scotland-2024","CLASH AT THE CASTLE: SCOTLAND 2024","23/06/2024","BOOK","images/events/clash-at-the-castle-scotland-2024.jpg",[
{type:"SINGLES",position:"OPENER",championship:"World Heavyweight Championship",wrestler1:"Bret Hart",wrestler2:"Rob Van Dam",score1:6,score2:2},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Randy Orton",wrestler2:"Alberto del Rio",score1:6,score2:2},
{type:"SINGLES",championship:"Intercontinental Championship",wrestler1:"Adam Cole",wrestler2:"Finn Balor",score1:9,score2:1},
{type:"TAG TEAM",championship:"WWE World Tag Team Championship",team1:["Bron Breakker","Tommaso Ciampa"],team2:["Bryan Danielson","Jon Moxley"],score1:1,score2:4},
{type:"SINGLES",position:"MAIN EVENT",championship:"Undisputed WWE Championship",wrestler1:"Jeff Jarrett",wrestler2:"Pete Dunne",score1:4,score2:4}
]);
addPLE("backlash-france-2024","BACKLASH FRANCE 2024","20/05/2024","ROAD","images/events/backlash-france-2024.jpg",[
{type:"DEATH MATCH",position:"OPENER",championship:"Intercontinental Championship",wrestler1:"MJF",wrestler2:"Adam Cole",score1:0,score2:1},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Logan Paul",wrestler2:"Randy Orton",score1:3,score2:6},
{type:"TAG TEAM",championship:"WWE World Tag Team Championship",team1:["Jey Uso","Tama Tonga"],team2:["Bron Breakker","Tommaso Ciampa"],score1:3,score2:4},
{type:"SINGLES",championship:"Undisputed WWE Championship",wrestler1:"Jeff Jarrett",wrestler2:"Pete Dunne",score1:5,score2:5},
{type:"SINGLES",position:"MAIN EVENT",championship:"World Heavyweight Championship",wrestler1:"Cody Rhodes",wrestler2:"Bret Hart",score1:4,score2:5}
]);

addPLE("wrestlemania-ii","WRESTLEMANIA II","28/04/2024","BOOK","images/events/wrestlemania-ii.jpg",[
{type:"SINGLES",position:"OPENER",championship:"NXT Championship",wrestler1:"Bret Hart",wrestler2:"Kevin Owens",score1:10,score2:0},
{type:"NO HOLDS BARRED",championship:"World Heavyweight Championship",wrestler1:"Cody Rhodes",wrestler2:"R-Truth",score1:8,score2:0},
{type:"STREET FIGHT",championship:"United States Championship",wrestler1:"Randy Orton",wrestler2:"Logan Paul",score1:6,score2:3},
{type:"UNDISPUTED ERA RULES",championship:"WWE World Tag Team Championship",team1:["Jey Uso","Bron Breakker"],team2:["Tommaso Ciampa","Johnny Gargano"],score1:7,score2:2},
{type:"BATTLE ROYALE",championship:"Intercontinental Championship",match:"ANDRE THE GIANT MEMORIAL BATTLE ROYAL",participants:["MJF","Claudio Castagnoli","Seth Rollins","Bray Wyatt","Rob Van Dam","Adam Cole","The Sandman","Alberto del Rio","Finn Balor","Rey Mysterio","AJ Styles","Tama Tonga"],winner:"MJF"},
{type:"SINGLES",position:"MAIN EVENT",championship:"Undisputed WWE Championship",wrestler1:"Bryan Danielson",wrestler2:"Jeff Jarrett",score1:3,score2:6}
]);

addPLE("elimination-chamber-perth-2024","ELIMINATION CHAMBER: PERTH 2024","25/03/2024","ROAD","images/events/elimination-chamber-perth-2024.jpg",[
{type:"SINGLES",position:"OPENER",championship:"Intercontinental Championship",wrestler1:"MJF",wrestler2:"Roman Reigns",score1:7,score2:1},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Randy Orton",wrestler2:"Bray Wyatt",score1:7,score2:3},
{type:"ELIMINATION CHAMBER",championship:"WWE World Tag Team Championship",team1:["Jey Uso","AJ Styles"],team2:["Finn Balor","Damian Priest"],team3:["Bryan Danielson","Jon Moxley"],team4:["Alberto del Rio","Andrade"],team5:["Tommaso Ciampa","Johnny Gargano"],team6:["Drew McIntyre","Sheamus"],winner:"Jey Uso & AJ Styles"},
{type:"ELIMINATION CHAMBER",position:"MAIN EVENT",participants:["Jeff Jarrett","Logan Paul","Bret Hart","Rob Van Dam","Adam Cole","Pete Dunne"],winner:"Jeff Jarrett"}
]);

addPLE("royal-rumble-2024","ROYAL RUMBLE 2024: 1ST ANNIVERSARY","25/02/2024","BOOK","images/events/royal-rumble-2024.jpg",[
{type:"OPENER",position:"EXTREME RULES",wrestler1:"Cody Rhodes",wrestler2:"MJF",score1:4,score2:1},
{type:"TAG TEAM",championship:"WWE World Tag Team Championship",team1:["Bryan Danielson","Jon Moxley"],team2:["Drew McIntyre","Sheamus"],score1:2,score2:3},
{type:"SINGLES",championship:"Undisputed WWE Championship",wrestler1:"Bryan Danielson",wrestler2:"Jon Moxley",score1:7,score2:1},
{type:"ROYAL RUMBLE",position:"MAIN EVENT",participants:["R-Truth","Adam Cole","Damian Priest","Claudio Castagnoli","Alberto del Rio","LA Knight","Seth Rollins","Rob Van Dam","Ilja Dragunov","Johnny Gargano","AJ Styles","Drew McIntyre","CM Punk","Jeff Jarrett","Finn Balor","Chad Gable","Logan Paul","Jon Moxley","Randy Orton","Tommaso Ciampa","Bret Hart","Sheamus","MJF","Roman Reigns","Jey Uso","Pete Dunne","Kevin Owens","GUNTHER","Solo Sikoa","Bron Breakker"],winner:"R-Truth"}
]);

addPLE("tlc-2024","TLC 2024","22/01/2024","ROAD","images/events/tlc-2024.jpg",[
{type:"TLC",position:"OPENER",championship:"World Heavyweight Championship",wrestler1:"Cody Rhodes",wrestler2:"Adam Cole",score1:10,score2:5},
{type:"SINGLES",wrestler1:"Drew McIntyre",wrestler2:"Claudio Castagnoli",score1:3,score2:1},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Logan Paul",wrestler2:"Randy Orton",score1:1,score2:8},
{type:"FATAL 4-WAY",championship:"Intercontinental Championship",participants:["Dominik Mysterio","Solo Sikoa","GUNTHER","MJF"],scores:[1,2,1,6]},
{type:"LADDER",championship:"WWE World Tag Team Championship",team1:["Bryan Danielson","Jon Moxley"],team2:["Roman Reigns","Axiom"],score1:7,score2:2},
{type:"TLC",position:"MAIN EVENT",championship:"Undisputed WWE Championship",wrestler1:"Jeff Jarrett",wrestler2:"Bryan Danielson",score1:9,score2:10}
]);

/* =========================================
   2023
   ========================================= */

addPLE("survivor-series-wargames-2023","SURVIVOR SERIES: WARGAMES 2023","17/12/2023","BOOK","images/events/survivor-series-wargames-2023.jpg",[
{type:"SINGLES",position:"OPENER",championship:"NXT Championship",wrestler1:"Bret Hart",wrestler2:"Pete Dunne",score1:5,score2:4},
{type:"TAG TEAM",championship:"WWE World Tag Team Championship",team1:["Bryan Danielson","Jon Moxley"],team2:["Adam Cole","MJF"],score1:3,score2:1},
{type:"SINGLES",wrestler1:"Logan Paul",wrestler2:"Dominik Mysterio",score1:7,score2:3},
{type:"TRIPLE THREAT",championship:"Undisputed WWE Championship",participants:["Jeff Jarrett","Bron Breakker","Randy Orton"],scores:[3,1,0]},
{type:"WARGAMES",position:"MAIN EVENT",team1:["Cody Rhodes","Bryan Danielson","Jon Moxley","Claudio Castagnoli","Sheamus"],team2:["AJ Styles","Roman Reigns","GUNTHER","Sami Zayn","Solo Sikoa"],score1:1,score2:0}
]);

addPLE("crown-jewel-2023","CROWN JEWEL 2023","27/11/2023","ROAD","images/events/crown-jewel-2023.jpg",[
{type:"TAG TEAM",position:"OPENER",championship:"WWE World Tag Team Championship",team1:["Bryan Danielson","Jon Moxley"],team2:["Pete Dunne","Tyler Bate"],score1:5,score2:0},
{type:"TRIPLE THREAT",championship:"United States Championship",participants:["Kevin Owens","Johnny Gargano","Logan Paul"],scores:[0,1,9]},
{type:"SINGLES",championship:"Intercontinental Championship",wrestler1:"Randy Orton",wrestler2:"Dominik Mysterio",score1:0,score2:10},
{type:"SINGLES",championship:"Undisputed WWE Championship",wrestler1:"Bryan Danielson",wrestler2:"Jeff Jarrett",score1:0,score2:8},
{type:"SINGLES",position:"MAIN EVENT",championship:"World Heavyweight Championship",wrestler1:"Cody Rhodes",wrestler2:"Adam Cole",score1:7,score2:3}
]);

addPLE("fastlane-2023","FASTLANE 2023","29/10/2023","BOOK","images/events/fastlane-2023.jpg",[
{type:"SINGLES",position:"OPENER",championship:"NXT Championship",wrestler1:"Bret Hart",wrestler2:"Roman Reigns",score1:5,score2:3},
{type:"TAG TEAM",team1:["Adam Cole","MJF"],team2:["Pete Dunne","Tyler Bate"],score1:0,score2:5},
{type:"SINGLES",championship:"Intercontinental Championship",wrestler1:"Chris Jericho",wrestler2:"Randy Orton",score1:3,score2:6},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Kevin Owens",wrestler2:"Johnny Gargano",score1:4,score2:4},
{type:"SINGLES",championship:"World Heavyweight Championship",wrestler1:"Cody Rhodes",wrestler2:"GUNTHER",score1:6,score2:4},
{type:"SINGLES",position:"MAIN EVENT",championship:"Undisputed WWE Championship",wrestler1:"Jeff Jarrett",wrestler2:"Bryan Danielson",score1:0,score2:10}
]);

addPLE("payback-2023","PAYBACK 2023","02/10/2023","ROAD","images/events/payback-2023.jpg",[
{type:"TAG TEAM",position:"OPENER",championship:"WWE World Tag Team Championship",team1:["Bryan Danielson","Jon Moxley"],team2:["Pete Dunne","Sheamus"],score1:3,score2:1},
{type:"SINGLES",championship:"World Heavyweight Championship",wrestler1:"Cody Rhodes",wrestler2:"GUNTHER",score1:8,score2:1},
{type:"SINGLES",championship:"Intercontinental Championship",wrestler1:"Chris Jericho",wrestler2:"Dominik Mysterio",score1:5,score2:3},
{type:"SINGLES",position:"MAIN EVENT",championship:"Undisputed WWE Championship",wrestler1:"Bryan Danielson",wrestler2:"Jeff Jarrett",score1:2,score2:5}
]);

addPLE("summerslam-2023","SUMMERSLAM 2023","03/09/2023","BOOK","images/events/summerslam-2023.jpg",[
{type:"SINGLES",position:"OPENER",championship:"NXT Championship",wrestler1:"Jeff Jarrett",wrestler2:"Karrion Kross",score1:6,score2:3},
{type:"TRIPLE THREAT",championship:"Intercontinental Championship",participants:["Chris Jericho","AJ Styles","GUNTHER"],scores:[8,1,1]},
{type:"SINGLES",championship:"United States Championship",wrestler1:"Adam Cole",wrestler2:"Jon Moxley",score1:5,score2:3},
{type:"SINGLES",championship:"World Heavyweight Championship",wrestler1:"Cody Rhodes",wrestler2:"RICOCHET",score1:6,score2:1},
{type:"SINGLES",position:"MAIN EVENT",championship:"Undisputed WWE Championship",wrestler1:"Bryan Danielson",wrestler2:"Kevin Owens",score1:6,score2:4}
]);

addPLE("money-in-the-bank-2023","MONEY IN THE BANK 2023","07/08/2023","ROAD","images/events/money-in-the-bank-2023.jpg",[
{type:"TAG TEAM",position:"OPENER",championship:"WWE World Tag Team Championship",team1:["Bryan Danielson","Finn Balor"],team2:["Bray Wyatt","The Undertaker"],score1:5,score2:0},
{type:"SINGLES",championship:"World Heavyweight Championship",wrestler1:"Cody Rhodes",wrestler2:"Chris Jericho",score1:6,score2:4},
{type:"SINGLES",championship:"Undisputed WWE Championship",wrestler1:"Adam Cole",wrestler2:"Kevin Owens",score1:2,score2:8},
{type:"LADDER",position:"MAIN EVENT",match:"MONEY IN THE BANK LADDER MATCH",participants:["Bryan Danielson","Karrion Kross","Randy Orton","Roman Reigns","Ricochet","Jon Moxley"],scores:[6,0,0,0,0,1]}
]);

addPLE("night-of-champions-2023","NIGHT OF CHAMPIONS 2023","12/06/2023","ROAD","images/events/night-of-champions-2023.jpg");

addPLE("backlash-2023","BACKLASH 2023","05/05/2023","ROAD","images/events/backlash-2023.jpg",[
{type:"SINGLES",position:"OPENER",wrestler1:"RICOCHET",wrestler2:"AJ Styles",score1:2,score2:3},
{type:"SINGLES",wrestler1:"Rob Van Dam",wrestler2:"Adam Cole",score1:2,score2:3},
{type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"AJ Styles",score1:3,score2:2},
{type:"SINGLES",wrestler1:"Cody Rhodes",wrestler2:"Adam Cole",score1:5,score2:0},
{type:"SINGLES",position:"MAIN EVENT",championship:"Undisputed WWE Championship",wrestler1:"Bryan Danielson",wrestler2:"Cody Rhodes",score1:6,score2:3}
]);

addPLE("wrestlemania-i","WRESTLEMANIA I","10/04/2023","ROAD","images/events/wrestlemania-i.jpg",[
{type:"SINGLES",position:"OPENER",wrestler1:"Roman Reigns",wrestler2:"John Cena",score1:2,score2:3},
{type:"SINGLES",wrestler1:"Cody Rhodes",wrestler2:"AJ Styles",score1:4,score2:1},
{type:"SINGLES",wrestler1:"John Cena",wrestler2:"Cody Rhodes",score1:3,score2:2},
{type:"TRIPLE THREAT",position:"MAIN EVENT",championship:"Undisputed WWE Championship",wrestler1:"Bryan Danielson",wrestler2:"John Cena",wrestler3:"Roman Reigns",score1:7,score2:0,score3:1}
]);

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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      

