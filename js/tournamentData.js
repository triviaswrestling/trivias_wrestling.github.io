const tournamentData = {

    "campeonato-3":{
        participants:[
            "Bryan Danielson",
            "Cody Rhodes",
            "RICOCHET",
            "Rob Van Dam",
            "Adam Cole",
            "AJ Styles",
            "John Cena",
            "Roman Reigns",
            "Kofi Kingston",
            "Damian Priest"
        ],

        phases:[
            "RAW 6",
            "RAW 7",
            "RAW 8",
            "SMACKDOWN 6",
            "SMACKDOWN 7",
            "SMACKDOWN 8",
            "NXT 1",
            "NXT 2",
            "NXT 3",
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
                ]
            },

            "smackdown-6":{
                date:"14/04/2023",
                results:[
                    {type:"SINGLES",position:"OPENER",wrestler1:"Cody Rhodes",wrestler2:"Bryan Danielson",score1:1,score2:4},
                    {type:"SINGLES",wrestler1:"Roman Reigns",wrestler2:"Damian Priest",score1:5,score2:0},
                    {type:"SINGLES",wrestler1:"RICOCHET",wrestler2:"Adam Cole",score1:3,score2:2},
                    {type:"SINGLES",wrestler1:"Rob Van Dam",wrestler2:"AJ Styles",score1:4,score2:1},
                    {type:"SINGLES",position:"MAIN EVENT",wrestler1:"Kofi Kingston",wrestler2:"John Cena",score1:0,score2:5}
                ]
            },

            "nxt-1":{
                date:"12/04/2023",
                results:[
                    {type:"SINGLES",position:"OPENER",wrestler1:"Damian Priest",wrestler2:"Bryan Danielson",score1:0,score2:4},
                    {type:"SINGLES",wrestler1:"RICOCHET",wrestler2:"Roman Reigns",score1:3,score2:1},
                    {type:"SINGLES",wrestler1:"Adam Cole",wrestler2:"Rob Van Dam",score1:1,score2:3},
                    {type:"SINGLES",wrestler1:"AJ Styles",wrestler2:"John Cena",score1:5,score2:0},
                    {type:"SINGLES",position:"MAIN EVENT",wrestler1:"Cody Rhodes",wrestler2:"Kofi Kingston",score1:4,score2:0}
                ]
            },

            "raw-7":{
                date:"24/04/2023",
                results:[
                    {type:"SINGLES",position:"OPENER",wrestler1:"Cody Rhodes",wrestler2:"John Cena",score1:5,score2:0},
                    {type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"AJ Styles",score1:5,score2:0},
                    {type:"SINGLES",wrestler1:"Roman Reigns",wrestler2:"Adam Cole",score1:0,score2:2},
                    {type:"SINGLES",wrestler1:"Damian Priest",wrestler2:"Rob Van Dam",score1:0,score2:4},
                    {type:"SINGLES",position:"MAIN EVENT",wrestler1:"RICOCHET",wrestler2:"Kofi Kingston",score1:5,score2:0}
                ]
            },

            "smackdown-7":{
                date:"21/04/2023",
                results:[
                    {type:"SINGLES",position:"OPENER",wrestler1:"AJ Styles",wrestler2:"Cody Rhodes",score1:2,score2:2},
                    {type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"Adam Cole",score1:5,score2:0},
                    {type:"SINGLES",wrestler1:"John Cena",wrestler2:"Damian Priest",score1:4,score2:1},
                    {type:"SINGLES",wrestler1:"RICOCHET",wrestler2:"Rob Van Dam",score1:3,score2:2},
                    {type:"SINGLES",position:"MAIN EVENT",wrestler1:"Roman Reigns",wrestler2:"Kofi Kingston",score1:3,score2:0}
                ]
            },

            "smackdown-8":{
                date:"28/04/2023",
                results:[
                    {type:"SINGLES",position:"OPENER",wrestler1:"Cody Rhodes",wrestler2:"RICOCHET",score1:3,score2:1},
                    {type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"Rob Van Dam",score1:5,score2:0},
                    {type:"SINGLES",wrestler1:"Roman Reigns",wrestler2:"John Cena",score1:0,score2:2},
                    {type:"SINGLES",wrestler1:"Adam Cole",wrestler2:"AJ Styles",score1:5,score2:0},
                    {type:"SINGLES",position:"MAIN EVENT",wrestler1:"Damian Priest",wrestler2:"Kofi Kingston",score1:0,score2:5}
                ]
            },

            "raw-8":{
                date:"01/05/2023",
                results:[
                    {type:"SINGLES",position:"OPENER",wrestler1:"Damian Priest",wrestler2:"Cody Rhodes",score1:0,score2:5},
                    {type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"RICOCHET",score1:3,score2:2},
                    {type:"SINGLES",wrestler1:"Rob Van Dam",wrestler2:"Roman Reigns",score1:3,score2:2},
                    {type:"SINGLES",wrestler1:"John Cena",wrestler2:"Adam Cole",score1:0,score2:5},
                    {type:"SINGLES",position:"MAIN EVENT",wrestler1:"AJ Styles",wrestler2:"Kofi Kingston",score1:5,score2:0}
                ]
            },

            "nxt-2":{
                date:"19/04/2023",
                results:[
                    {type:"SINGLES",position:"OPENER",wrestler1:"Cody Rhodes",wrestler2:"Adam Cole",score1:3,score2:1},
                    {type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"Roman Reigns",score1:4,score2:1},
                    {type:"SINGLES",wrestler1:"AJ Styles",wrestler2:"Damian Priest",score1:3,score2:1},
                    {type:"SINGLES",wrestler1:"John Cena",wrestler2:"RICOCHET",score1:2,score2:2},
                    {type:"SINGLES",position:"MAIN EVENT",wrestler1:"Rob Van Dam",wrestler2:"Kofi Kingston",score1:5,score2:0}
                ]
            },

            "nxt-3":{
                date:"26/04/2023",
                results:[
                    {type:"SINGLES",position:"OPENER",wrestler1:"Rob Van Dam",wrestler2:"Cody Rhodes",score1:2,score2:3},
                    {type:"SINGLES",wrestler1:"Bryan Danielson",wrestler2:"John Cena",score1:4,score2:1},
                    {type:"SINGLES",wrestler1:"Roman Reigns",wrestler2:"AJ Styles",score1:5,score2:0},
                    {type:"SINGLES",wrestler1:"RICOCHET",wrestler2:"Damian Priest",score1:4,score2:0},
                    {type:"SINGLES",position:"MAIN EVENT",wrestler1:"Kofi Kingston",wrestler2:"Adam Cole",score1:0,score2:4}
                ]
            }
        },

        bracket:"backlash-2023",

        matches:[]
    }

};

alert("TOURNAMENT DATA CARGADO");
