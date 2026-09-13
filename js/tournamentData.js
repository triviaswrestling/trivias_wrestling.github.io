const tournamentData = {
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
        "RAW 1",
        "RAW 2",
        "RAW 3",
        "RAW 4",
        "RAW 5",
        "SMACKDOWN 1",
        "SMACKDOWN 2",
        "SMACKDOWN 3",
        "SMACKDOWN 4",
        "SMACKDOWN 5",
        "WRESTLEMANIA"
    ],

    format:"TWO_ZONES_ELIMINATION",

    events:{
        raw:{
            "RAW 1":"raw-1",
            "RAW 2":"raw-2",
            "RAW 3":"raw-3",
            "RAW 4":"raw-4",
            "RAW 5":"raw-5"
        },

        smackdown:{
            "SMACKDOWN 1":"smackdown-1",
            "SMACKDOWN 2":"smackdown-2",
            "SMACKDOWN 3":"smackdown-3",
            "SMACKDOWN 4":"smackdown-4",
            "SMACKDOWN 5":"smackdown-5"
        },

        final:"wrestlemania-i"
    },

    matches:{"raw-1":{date:"22/03/2023",results:[
    {type:"SINGLES",position:"OPENER",wrestler1:"AJ Styles",wrestler2:"Kofi Kingston",score1:3,score2:1},
    {type:"SINGLES",wrestler1:"Damian Priest",wrestler2:"Rob Van Dam",score1:5,score2:0},
    {type:"SINGLES",position:"MAIN EVENT",wrestler1:"Roman Reigns",wrestler2:"Cody Rhodes",score1:2,score2:1}
]},

"raw-2":{date:"24/03/2023",results:[
    {type:"SINGLES",position:"OPENER",wrestler1:"Roman Reigns",wrestler2:"AJ Styles",score1:2,score2:2},
    {type:"SINGLES",position:"MAIN EVENT",wrestler1:"Kofi Kingston",wrestler2:"Rob Van Dam",score1:5,score2:0}
]},

"raw-3":{date:"31/03/2023",results:[
    {type:"SINGLES",position:"OPENER",wrestler1:"Rob Van Dam",wrestler2:"Roman Reigns",score1:0,score2:5},
    {type:"SINGLES",wrestler1:"Damian Priest",wrestler2:"Kofi Kingston",score1:1,score2:2},
    {type:"SINGLES",position:"MAIN EVENT",wrestler1:"AJ Styles",wrestler2:"John Cena",score1:0,score2:3}
]},

"raw-4":{date:"03/04/2023",results:[
    {type:"SINGLES",position:"OPENER",wrestler1:"Roman Reigns",wrestler2:"Damian Priest",score1:2,score2:0},
    {type:"SINGLES",position:"MAIN EVENT",wrestler1:"AJ Styles",wrestler2:"Rob Van Dam",score1:5,score2:0}
]},

"raw-5":{date:"05/04/2023",results:[
    {type:"SINGLES",position:"OPENER",wrestler1:"Roman Reigns",wrestler2:"Kofi Kingston",score1:4,score2:0},
    {type:"SINGLES",wrestler1:"Damian Priest",wrestler2:"AJ Styles",score1:0,score2:2},
    {type:"SINGLES",position:"MAIN EVENT",wrestler1:"The Rock",wrestler2:"Rob Van Dam",score1:0,score2:5}
]}
},

    
    "campeonato-3":{
    /* PARTICIPANTS */
    participants:[
        "Bryan Danielson","Cody Rhodes","RICOCHET","Rob Van Dam","Adam Cole",
        "AJ Styles","John Cena","Roman Reigns","Kofi Kingston","Damian Priest"],
    /* PHASES */
    phases:[
        "RAW 6","RAW 7","RAW 8",
        "SMACKDOWN 6","SMACKDOWN 7","SMACKDOWN 8",
        "NXT 1","NXT 2","NXT 3","BACKLASH"],
    /* FORMAT */
    format:"LEAGUE_ELIMINATION",
    /* WEEKLY */
    weekly:{
        /* RAW */
        "raw-6":{date:"17/04/2023",results:[
            {type:"SINGLES",position:"OPENER",wrestler1:"Roman Reigns",wrestler2:"Cody Rhodes",score1:2,score2:3},
            {type:"SINGLES",wrestler1:"Damian Priest",wrestler2:"Adam Cole",score1:0,score2:4},
            {type:"SINGLES",wrestler1:"AJ Styles",wrestler2:"RICOCHET",score1:2,score2:3},
            {type:"SINGLES",wrestler1:"John Cena",wrestler2:"Rob Van Dam",score1:2,score2:3},
            {type:"SINGLES",position:"MAIN EVENT",wrestler1:"Bryan Danielson",wrestler2:"Kofi Kingston",score1:5,score2:0}
        ]},

        "smackdown-7":{date:"21/04/2023",results:[
           {type:"SINGLES",position:"OPENER",wrestler1:"AJ Styles",wrestler2:"Cody Rhodes",score1:2,score2:2},{type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"Adam Cole",score1:5,score2:0},{type:"SINGLES",wrestler1:"John Cena",wrestler2:"Damian Priest",score1:4,score2:1},{type:"SINGLES",wrestler1:"RICOCHET",wrestler2:"Rob Van Dam",score1:3,score2:2},{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Roman Reigns",wrestler2:"Kofi Kingston",score1:3,score2:0}]},
        "smackdown-8":{date:"28/04/2023",results:[
           {type:"SINGLES",position:"OPENER",wrestler1:"Cody Rhodes",wrestler2:"RICOCHET",score1:3,score2:1},{type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"Rob Van Dam",score1:5,score2:0},{type:"SINGLES",wrestler1:"Roman Reigns",wrestler2:"John Cena",score1:0,score2:2},{type:"SINGLES",wrestler1:"Adam Cole",wrestler2:"AJ Styles",score1:5,score2:0},{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Damian Priest",wrestler2:"Kofi Kingston",score1:0,score2:5}]},
        /* SMACKDOWN */
        "smackdown-6":{date:"14/04/2023",results:[
            {type:"SINGLES",position:"OPENER",wrestler1:"Cody Rhodes",wrestler2:"Bryan Danielson",score1:1,score2:4},
            {type:"SINGLES",wrestler1:"Roman Reigns",wrestler2:"Damian Priest",score1:5,score2:0},
            {type:"SINGLES",wrestler1:"RICOCHET",wrestler2:"Adam Cole",score1:3,score2:2},
            {type:"SINGLES",wrestler1:"Rob Van Dam",wrestler2:"AJ Styles",score1:4,score2:1},
            {type:"SINGLES",position:"MAIN EVENT",wrestler1:"Kofi Kingston",wrestler2:"John Cena",score1:0,score2:5}
        ]},
        "raw-7":{date:"24/04/2023",results:[
           {type:"SINGLES",position:"OPENER",wrestler1:"Cody Rhodes",wrestler2:"John Cena",score1:5,score2:0},{type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"AJ Styles",score1:5,score2:0},{type:"SINGLES",wrestler1:"Roman Reigns",wrestler2:"Adam Cole",score1:0,score2:2},{type:"SINGLES",wrestler1:"Damian Priest",wrestler2:"Rob Van Dam",score1:0,score2:4},{type:"SINGLES",position:"MAIN EVENT",wrestler1:"RICOCHET",wrestler2:"Kofi Kingston",score1:5,score2:0}]},
        "raw-8":{date:"01/05/2023",results:[
           {type:"SINGLES",position:"OPENER",wrestler1:"Damian Priest",wrestler2:"Cody Rhodes",score1:0,score2:5},{type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"RICOCHET",score1:3,score2:2},{type:"SINGLES",wrestler1:"Rob Van Dam",wrestler2:"Roman Reigns",score1:3,score2:2},{type:"SINGLES",wrestler1:"John Cena",wrestler2:"Adam Cole",score1:0,score2:5},{type:"SINGLES",position:"MAIN EVENT",wrestler1:"AJ Styles",wrestler2:"Kofi Kingston",score1:5,score2:0}]},
        /* NXT */
        "nxt-1":{date:"12/04/2023",results:[
            {type:"SINGLES",position:"OPENER",wrestler1:"Damian Priest",wrestler2:"Bryan Danielson",score1:0,score2:4},
            {type:"SINGLES",wrestler1:"RICOCHET",wrestler2:"Roman Reigns",score1:3,score2:1},
            {type:"SINGLES",wrestler1:"Adam Cole",wrestler2:"Rob Van Dam",score1:1,score2:3},
            {type:"SINGLES",wrestler1:"AJ Styles",wrestler2:"John Cena",score1:5,score2:0},
            {type:"SINGLES",position:"MAIN EVENT",wrestler1:"Cody Rhodes",wrestler2:"Kofi Kingston",score1:4,score2:0}
        ]},
        "nxt-2":{date:"19/04/2023",results:[
           {type:"SINGLES",position:"OPENER",wrestler1:"Cody Rhodes",wrestler2:"Adam Cole",score1:3,score2:1},{type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"Roman Reigns",score1:4,score2:1},{type:"SINGLES",wrestler1:"AJ Styles",wrestler2:"Damian Priest",score1:3,score2:1},{type:"SINGLES",wrestler1:"John Cena",wrestler2:"RICOCHET",score1:2,score2:2},{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Rob Van Dam",wrestler2:"Kofi Kingston",score1:5,score2:0}]},
        "nxt-3":{date:"26/04/2023",results:[
           {type:"SINGLES",position:"OPENER",wrestler1:"Rob Van Dam",wrestler2:"Cody Rhodes",score1:2,score2:3},{type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"John Cena",score1:4,score2:1},{type:"SINGLES",wrestler1:"Roman Reigns",wrestler2:"AJ Styles",score1:5,score2:0},{type:"SINGLES",wrestler1:"RICOCHET",wrestler2:"Damian Priest",score1:4,score2:0},{type:"SINGLES",position:"MAIN EVENT",wrestler1:"Kofi Kingston",wrestler2:"Adam Cole",score1:0,score2:4}]},
    /* BRACKET */
    bracket:"backlash-2023",
    /* MATCHES */
    matches:[]},

    "campeonato-4":{
    zones:{
        RAW:[
            "Cody Rhodes",
            "Johnny Gargano",
            "Roman Reigns",
            "Rob Van Dam",
            "AJ Styles",
            "Damian Priest"
        ],
        SMACKDOWN:[
            "Adam Cole",
            "RICOCHET",
            "Bryan Danielson",
            "John Cena",
            "Shawn Michaels",
            "Kofi Kingston"
        ],
        "NXT A":[
            "Karrion Kross",
            "Kevin Owens",
            "Jeff Hardy",
            "Seth Rollins",
            "Bobby Lashley"
        ],
        "NXT B":[
            "Drew McIntyre",
            "Finn Balor",
            "Eddie Guerrero",
            "Randy Orton",
            "Sin Cara"
        ]
    },
    phases:[
        "RAW",
        "SMACKDOWN",
        "NXT A",
        "NXT B",
        "TAKEOVER",
        "NIGHT OF CHAMPIONS"
    ],
    format:"FOUR_ZONES_ELIMINATION",
    matches:[]
},

};
alert("TOURNAMENT DATA CARGADO");
