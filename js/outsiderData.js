/* =========================================
   MI WRESTLING
   OUTSIDER TOURNAMENT DATA
   SPEED / AEW / TNA / AAA
   ========================================= */

const outsiderData = {

// SPEED #3
"outsider-speed-3":{
    name:"SPEED #3",
    brand:"SPEED",
    promotion:"WWE",
    format:"BRACKET",
    roster:[],
    shows:{
        "speed-8":{date:"10/10/2024",matches:[["Aleister Black","Chad Gable",3,0],["AJ Styles","Rob Van Dam",3,0],["Alberto Del Rio","Jey Uso",3,0],["CM Punk","Roman Reigns",1,2]]},
        "speed-9":{date:"17/10/2024",matches:[["Aleister Black","AJ Styles",0,3],["Alberto Del Rio","Roman Reigns",0,3]]},
        "speed-10":{date:"24/10/2024",matches:[["AJ Styles","Roman Reigns",0,3]]}
    },
    finalEvent:"bad-blood-2024",
    finalDate:"",
    finalMatches:[{type:"EVENT_REFERENCE",eventId:"OTRO-EVENT-ID",matchIndex:0}]
},
   
// SPEED #2
"outsider-speed-2":{
   name:"SPEED #2",
    brand:"SPEED",
    promotion:"WWE",
    format:"BRACKET",
    roster:["Ilja Dragunov","Kyle O'Reilly","AJ Styles","Johnny Gargano","Rey Mysterio","LA Knight","Sheamus","Chad Gable"],
    shows:{
        "speed-4":{date:"29/08/2024",matches:[["Ilja Dragunov","Kyle O'Reilly",0,3],["AJ Styles","Johnny Gargano",3,0]]},
        "speed-5":{date:"05/09/2024",matches:[["Rey Mysterio","LA Knight",2,1],["Sheamus","Chad Gable",0,3]]},
        "speed-6":{date:"12/09/2024",matches:[["Kyle O'Reilly","Rey Mysterio",0,3],["AJ Styles","Chad Gable",3,0]]},
        "speed-7":{date:"19/09/2024",matches:[["Rey Mysterio","AJ Styles",1,2]]}
    },
    finalEvent:"bash-in-berlin-2024",
    finalDate:"23/09/2024",
    finalMatches:[
        {
            type:"EVENT_REFERENCE",
            eventId:"bash-in-berlin-2024",
            matchIndex:0
        }
    ]
},

/* =========================================
   SPEED
   ========================================= */

"outsider-speed-1":{
    name:"SPEED #1",
    brand:"SPEED",
    promotion:"WWE",
    format:"BRACKET",
    roster:["Bron Breakker","Aleister Black","Tommaso Ciampa","CM Punk","Jey Uso","Edge","Rob Van Dam","Wade Barrett"],
    shows:{
        "speed-1":{date:"08/08/2024",matches:[["Bron Breakker","Aleister Black",1,2],["Tommaso Ciampa","CM Punk",2,1]]},
        "speed-2":{date:"15/08/2024",matches:[["Jey Uso","Edge",1,2],["Rob Van Dam","Wade Barrett",0,3]]},
        "speed-3":{date:"22/08/2024",matches:[["Aleister Black","Edge",0,3],["Tommaso Ciampa","Wade Barrett",3,0]]}
    },
        finalEvent:"summerslam-2024",
    finalDate:"25/08/2024",
    finalMatches:[
        {
            type:"EVENT_REFERENCE",
            eventId:"summerslam-2024",
            matchIndex:1
        }
    ]
}

};
