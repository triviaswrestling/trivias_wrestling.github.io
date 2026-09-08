/* =========================================
   MI WRESTLING
   EVENT
   ========================================= */


/* =========================================
   GET EVENT ID
   ========================================= */

const urlParams = new URLSearchParams(
    window.location.search
);

const eventId = urlParams.get("id");


/* =========================================
   WRESTLER DATABASE
   ========================================= */

const wrestlerDatabase = {

    "Axiom": {
        image: "images/Vacante.jpg"
    },

    "Adam Cole": {
        image: "images/Vacante.jpg"
    },

    "Jeff Jarrett": {
        image: "images/Vacante.jpg"
    },

    "Alberto Del Rio": {
        image: "images/Vacante.jpg"
    },

    "Wrestler A": {
        image: "images/Vacante.jpg"
    },

    "Wrestler B": {
        image: "images/Vacante.jpg"
    },

    "Wrestler C": {
        image: "images/Vacante.jpg"
    },

    "Wrestler D": {
        image: "images/Vacante.jpg"
    },

    "Wrestler E": {
        image: "images/Vacante.jpg"
    },

    "Wrestler F": {
        image: "images/Vacante.jpg"
    },

    "Champion": {
        image: "images/Vacante.jpg"
    },

    "Challenger": {
        image: "images/Vacante.jpg"
    }

};


/* =========================================
   GET WRESTLER
   ========================================= */

function getWrestler(name) {

    if (wrestlerDatabase[name]) {

        return wrestlerDatabase[name];

    }

    return {
        image: "images/Vacante.jpg"
    };

}


/* =========================================
   EVENTS DATABASE
   ========================================= */

const eventData = {


    /* =========================================
       WEEKLY 1
       ========================================= */

    "weekly-1": {

        type: "WEEKLY",
        title: "WEEKLY #1",
        date: "06/09/2026",
        brand: "RAW & SMACKDOWN",

        results: [

            {
                match: "MATCH 1",
                type: "SINGLES",
                championship: "",

                wrestler1: [
                    "Axiom"
                ],

                wrestler2: [
                    "Adam Cole"
                ],

                winner: "Axiom"
            },


            {
                match: "MATCH 2",
                type: "SINGLES",
                championship: "WWE CHAMPIONSHIP",

                wrestler1: [
                    "Champion"
                ],

                wrestler2: [
                    "Challenger"
                ],

                winner: "Champion"
            },


            {
                match: "MATCH 3",
                type: "TAG TEAM",
                championship: "",

                wrestler1: [
                    "Jeff Jarrett",
                    "Axiom"
                ],

                wrestler2: [
                    "Alberto Del Rio",
                    "Wrestler A"
                ],

                winner: "Team 1"
            },


            {
                match: "MAIN EVENT",
                type: "6-MAN TAG TEAM",
                championship: "",

                wrestler1: [
                    "Axiom",
                    "Adam Cole",
                    "Jeff Jarrett"
                ],

                wrestler2: [
                    "Alberto Del Rio",
                    "Wrestler E",
                    "Wrestler F"
                ],

                winner: "Team 1"
            }

        ]

    },


    /* =========================================
       WEEKLY 2
       ========================================= */

    "weekly-2": {

        type: "WEEKLY",
        title: "WEEKLY #2",
        date: "13/09/2026",
        brand: "RAW & SMACKDOWN",

        results: [

            {
                match: "MATCH 1",
                type: "SINGLES",
                championship: "",

                wrestler1: [
                    "Wrestler A"
                ],

                wrestler2: [
                    "Wrestler B"
                ],

                winner: "Wrestler A"
            }

        ]

    },


    /* =========================================
       NXT 1
       ========================================= */

    "nxt-1": {

        type: "NXT",
        title: "NXT #1",
        date: "08/09/2026",
        brand: "NXT",

        results: [

            {
                match: "MATCH 1",
                type: "SINGLES",
                championship: "",

                wrestler1: [
                    "Wrestler A"
                ],

                wrestler2: [
                    "Wrestler B"
