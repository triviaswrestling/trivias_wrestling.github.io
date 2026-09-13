alert("ARCHIVO CARGADO");

const tournamentData = {
"monday-night-raw-1":{
    roster:[
        "Rob Van Dam",
        "Roman Reigns",
        "Johnny Gargano",
        "Cody Rhodes",
        "AJ Styles",
        "Damian Priest"
    ],
    format:"LEAGUE_ELIMINATION",

    shows:{
        "raw-9":{
            date:"08/05/2023",
            matches:[
                ["Rob Van Dam","Roman Reigns",1,1],
                ["AJ Styles","Johnny Gargano",1,4],
                ["Damian Priest","Cody Rhodes",0,5]
            ]
        },
        "raw-10":{
            date:"15/05/2023",
            matches:[
                ["Cody Rhodes","Rob Van Dam",3,2],
                ["Roman Reigns","AJ Styles",3,1],
                ["Damian Priest","Johnny Gargano",0,5]
            ]
        },
        "raw-11":{
            date:"22/05/2023",
            matches:[
                ["AJ Styles","Cody Rhodes",0,5],
                ["Johnny Gargano","Roman Reigns",3,1],
                ["Damian Priest","Rob Van Dam",0,4]
            ]
        },
        "raw-12":{
            date:"29/05/2023",
            matches:[
                ["Roman Reigns","Damian Priest",4,0],
                ["Rob Van Dam","AJ Styles",2,2],
                ["Cody Rhodes","Johnny Gargano",4,1]
            ]
        },
        "raw-13":{
            date:"05/06/2023",
            matches:[
                ["AJ Styles","Damian Priest",3,2],
                ["Johnny Gargano","Rob Van Dam",2,1],
                ["Cody Rhodes","Roman Reigns",4,1]
            ]
        }
    },

    finalEvent:"night-of-champions-2023",

    finalMatches:[
        ["Rob Van Dam","Cody Rhodes",1,3],
        ["Johnny Gargano","Roman Reigns",1,2],
        ["Cody Rhodes","Roman Reigns",4,0]
    ]
},
/* =========================================
   CAMPEONATO 3
   ========================================= */

"campeonato-3":{

participants:[
"Bryan Danielson","Cody Rhodes","RICOCHET","Rob Van Dam","Adam Cole",
"AJ Styles","John Cena","Roman Reigns","Kofi Kingston","Damian Priest"
],

phases:[
"RAW 6","RAW 7","RAW 8",
"SMACKDOWN 6","SMACKDOWN 7","SMACKDOWN 8",
"NXT 1","NXT 2","NXT 3",
"BACKLASH"
],

format:"LEAGUE_ELIMINATION",

weekly:{

"raw-6":{
date:"17/04/2023",
results:[
{type:"SINGLES",position:"OPENER",wrestler1:"Roman Reigns",wrestler2:"Cody Rhodes",score1:2,score2:3},
{type:"SINGLES",wrestler1:"Damian Priest",wrestler2:"Adam Cole",score1:0,score2:4},
{type:"SINGLES",wrestler1:"AJ Styles",wrestler2:"RICOCHET",score1:2,score2:3},
{type:"SINGLES",wrestler1:"John Cena",wrestler2:"Rob Van Dam",score1:2,score2:3},
{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Bryan Danielson",wrestler2:"Kofi Kingston",score1:5,score2:0}
]},

"smackdown-6":{
date:"14/04/2023",
results:[
{type:"SINGLES",position:"OPENER",wrestler1:"Cody Rhodes",wrestler2:"Bryan Danielson",score1:1,score2:4},
{type:"SINGLES",wrestler1:"Roman Reigns",wrestler2:"Damian Priest",score1:5,score2:0},
{type:"SINGLES",wrestler1:"RICOCHET",wrestler2:"Adam Cole",score1:3,score2:2},
{type:"SINGLES",wrestler1:"Rob Van Dam",wrestler2:"AJ Styles",score1:4,score2:1},
{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Kofi Kingston",wrestler2:"John Cena",score1:0,score2:5}
]},

"nxt-1":{
date:"12/04/2023",
results:[
{type:"SINGLES",position:"OPENER",wrestler1:"Damian Priest",wrestler2:"Bryan Danielson",score1:0,score2:4},
{type:"SINGLES",wrestler1:"RICOCHET",wrestler2:"Roman Reigns",score1:3,score2:1},
{type:"SINGLES",wrestler1:"Adam Cole",wrestler2:"Rob Van Dam",score1:1,score2:3},
{type:"SINGLES",wrestler1:"AJ Styles",wrestler2:"John Cena",score1:5,score2:0},
{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Cody Rhodes",wrestler2:"Kofi Kingston",score1:4,score2:0}
]},

"raw-7":{
date:"24/04/2023",
results:[
{type:"SINGLES",position:"OPENER",wrestler1:"Cody Rhodes",wrestler2:"John Cena",score1:5,score2:0},
{type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"AJ Styles",score1:5,score2:0},
{type:"SINGLES",wrestler1:"Roman Reigns",wrestler2:"Adam Cole",score1:0,score2:2},
{type:"SINGLES",wrestler1:"Damian Priest",wrestler2:"Rob Van Dam",score1:0,score2:4},
{type:"SINGLES",position:"MAIN EVENT",wrestler1:"RICOCHET",wrestler2:"Kofi Kingston",score1:5,score2:0}
]},

"smackdown-7":{
date:"21/04/2023",
results:[
{type:"SINGLES",position:"OPENER",wrestler1:"AJ Styles",wrestler2:"Cody Rhodes",score1:2,score2:2},
{type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"Adam Cole",score1:5,score2:0},
{type:"SINGLES",wrestler1:"John Cena",wrestler2:"Damian Priest",score1:4,score2:1},
{type:"SINGLES",wrestler1:"RICOCHET",wrestler2:"Rob Van Dam",score1:3,score2:2},
{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Roman Reigns",wrestler2:"Kofi Kingston",score1:3,score2:0}
]},

"smackdown-8":{
date:"28/04/2023",
results:[
{type:"SINGLES",position:"OPENER",wrestler1:"Cody Rhodes",wrestler2:"RICOCHET",score1:3,score2:1},
{type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"Rob Van Dam",score1:5,score2:0},
{type:"SINGLES",wrestler1:"Roman Reigns",wrestler2:"John Cena",score1:0,score2:2},
{type:"SINGLES",wrestler1:"Adam Cole",wrestler2:"AJ Styles",score1:5,score2:0},
{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Damian Priest",wrestler2:"Kofi Kingston",score1:0,score2:5}
]},

"raw-8":{
date:"01/05/2023",
results:[
{type:"SINGLES",position:"OPENER",wrestler1:"Damian Priest",wrestler2:"Cody Rhodes",score1:0,score2:5},
{type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"RICOCHET",score1:3,score2:2},
{type:"SINGLES",wrestler1:"Rob Van Dam",wrestler2:"Roman Reigns",score1:3,score2:2},
{type:"SINGLES",wrestler1:"John Cena",wrestler2:"Adam Cole",score1:0,score2:5},
{type:"SINGLES",position:"MAIN EVENT",wrestler1:"AJ Styles",wrestler2:"Kofi Kingston",score1:5,score2:0}
]},

"nxt-2":{
date:"19/04/2023",
results:[
{type:"SINGLES",position:"OPENER",wrestler1:"Cody Rhodes",wrestler2:"Adam Cole",score1:3,score2:1},
{type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"Roman Reigns",score1:4,score2:1},
{type:"SINGLES",wrestler1:"AJ Styles",wrestler2:"Damian Priest",score1:3,score2:1},
{type:"SINGLES",wrestler1:"John Cena",wrestler2:"RICOCHET",score1:2,score2:2},
{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Rob Van Dam",wrestler2:"Kofi Kingston",score1:5,score2:0}
]},

"nxt-3":{
date:"26/04/2023",
results:[
{type:"SINGLES",position:"OPENER",wrestler1:"Rob Van Dam",wrestler2:"Cody Rhodes",score1:2,score2:3},
{type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"John Cena",score1:4,score2:1},
{type:"SINGLES",wrestler1:"Roman Reigns",wrestler2:"AJ Styles",score1:5,score2:0},
{type:"SINGLES",wrestler1:"RICOCHET",wrestler2:"Damian Priest",score1:4,score2:0},
{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Kofi Kingston",wrestler2:"Adam Cole",score1:0,score2:4}
]}

},

bracket:"backlash-2023",

matches:[]

},

/* =========================================
   CAMPEONATO 2
   ========================================= */

"campeonato-2":{

zones:{
RAW:[
"Roman Reigns",
"AJ Styles",
"Kofi Kingston",
"Damian Priest",
"Rob Van Dam"
],

SMACKDOWN:[
"Cody Rhodes",
"John Cena",
"RICOCHET",
"Adam Cole",
"The Rock"
]
},

champion:"Bryan Danielson",

phases:[
"RAW 1","RAW 2","RAW 3","RAW 4","RAW 5",
"SMACKDOWN 1","SMACKDOWN 2","SMACKDOWN 3","SMACKDOWN 4","SMACKDOWN 5",
"WRESTLEMANIA"
],

format:"TWO_ZONES_ELIMINATION",

events:{
final:"wrestlemania-i"
},

matches:{

"raw-1":{
date:"22/03/2023",
results:[
{type:"SINGLES",position:"OPENER",wrestler1:"AJ Styles",wrestler2:"Kofi Kingston",score1:3,score2:1},
{type:"SINGLES",wrestler1:"Damian Priest",wrestler2:"Rob Van Dam",score1:5,score2:0},
{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Roman Reigns",wrestler2:"Cody Rhodes",score1:2,score2:1}
]},

"raw-2":{
date:"24/03/2023",
results:[
{type:"SINGLES",position:"OPENER",wrestler1:"Roman Reigns",wrestler2:"AJ Styles",score1:2,score2:2},
{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Kofi Kingston",wrestler2:"Rob Van Dam",score1:5,score2:0}
]},

"raw-3":{
date:"31/03/2023",
results:[
{type:"SINGLES",position:"OPENER",wrestler1:"Rob Van Dam",wrestler2:"Roman Reigns",score1:0,score2:5},
{type:"SINGLES",wrestler1:"Damian Priest",wrestler2:"Kofi Kingston",score1:1,score2:2},
{type:"SINGLES",position:"MAIN EVENT",wrestler1:"AJ Styles",wrestler2:"John Cena",score1:0,score2:3}
]},

"raw-4":{
date:"03/04/2023",
results:[
{type:"SINGLES",position:"OPENER",wrestler1:"Roman Reigns",wrestler2:"Damian Priest",score1:2,score2:0},
{type:"SINGLES",position:"MAIN EVENT",wrestler1:"AJ Styles",wrestler2:"Rob Van Dam",score1:5,score2:0}
]},

"raw-5":{
date:"05/04/2023",
results:[
{type:"SINGLES",position:"OPENER",wrestler1:"Roman Reigns",wrestler2:"Kofi Kingston",score1:4,score2:0},
{type:"SINGLES",wrestler1:"Damian Priest",wrestler2:"AJ Styles",score1:0,score2:2},
{type:"SINGLES",position:"MAIN EVENT",wrestler1:"The Rock",wrestler2:"Rob Van Dam",score1:0,score2:5}
]},

"smackdown-1":{
date:"22/03/2023",
results:[
{type:"SINGLES",position:"OPENER",wrestler1:"The Rock",wrestler2:"John Cena",score1:0,score2:5},
{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Adam Cole",wrestler2:"RICOCHET",score1:2,score2:3}
]},

"smackdown-2":{
date:"24/03/2023",
results:[
{type:"SINGLES",position:"OPENER",wrestler1:"Adam Cole",wrestler2:"The Rock",score1:5,score2:0},
{type:"SINGLES",wrestler1:"Cody Rhodes",wrestler2:"John Cena",score1:4,score2:0},
{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Damian Priest",wrestler2:"RICOCHET",score1:0,score2:4}
]},

"smackdown-3":{
date:"31/03/2023",
results:[
{type:"SINGLES",position:"OPENER",wrestler1:"Adam Cole",wrestler2:"Cody Rhodes",score1:0,score2:4},
{type:"SINGLES",position:"MAIN EVENT",wrestler1:"RICOCHET",wrestler2:"The Rock",score1:5,score2:0}
]},

"smackdown-4":{
date:"03/04/2023",
results:[
{type:"SINGLES",position:"OPENER",wrestler1:"Cody Rhodes",wrestler2:"RICOCHET",score1:3,score2:2},
{type:"SINGLES",wrestler1:"John Cena",wrestler2:"Adam Cole",score1:4,score2:1},
{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Kofi Kingston",wrestler2:"The Rock",score1:2,score2:0}
]},

"smackdown-5":{
date:"05/04/2023",
results:[
{type:"SINGLES",position:"OPENER",wrestler1:"Cody Rhodes",wrestler2:"The Rock",score1:5,score2:0},
{type:"SINGLES",wrestler1:"John Cena",wrestler2:"RICOCHET",score1:3,score2:2},
{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Rob Van Dam",wrestler2:"Adam Cole",score1:0,score2:3}
]}

}

},

/* =========================================
   CAMPEONATO 1
   ========================================= */

"campeonato-1":{

participants:[
"Cody Rhodes",
"Bryan Danielson",
"AJ Styles",
"Roman Reigns",
"John Cena",
"Adam Cole",
"Kevin Owens",
"Randy Orton",
"Rob Van Dam",
"The Rock",
"Seth Rollins",
"Chris Jericho",
"RICOCHET",
"Damian Priest",
"Kofi Kingston"
],

phases:[
"LIVE 1","LIVE 2","LIVE 3","LIVE 4","LIVE 5",
"LIVE 6",
"ELIMINATION CHAMBER"
],

format:"LEAGUE_PLAYIN_ELIMINATION",

events:{

league:{
"LIVE 1":"live-1",
"LIVE 2":"live-2",
"LIVE 3":"live-3",
"LIVE 4":"live-4",
"LIVE 5":"live-5"
},

playIn:"live-6",

bracket:"elimination-chamber-2023"

},

matches:[]

}

};

console.log("TD FINAL");
