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
   EVENTS DATABASE
   ========================================= */

const eventData = {

    "weekly-1": {

        type: "WEEKLY",
        title: "WEEKLY #1",
        date: "06/09/2026",
        brand: "RAW & SMACKDOWN",

        results: [

            /* SINGLES */

            {
                match: "MATCH 1",
                type: "SINGLES",
                championship: "",

                wrestler1: [
                    {
                        name: "Axiom",
                        image: "images/Vacante.jpg"
                    }
                ],

                wrestler2: [
                    {
                        name: "Adam Cole",
                        image: "images/Vacante.jpg"
                    }
                ],

                winner: "Axiom"
            },


            /* CHAMPIONSHIP */

            {
                match: "MATCH 2",
                type: "SINGLES",
                championship: "WWE CHAMPIONSHIP",

                wrestler1: [
                    {
                        name: "Champion",
                        image: "images/Vacante.jpg"
                    }
                ],

                wrestler2: [
                    {
                        name: "Challenger",
                        image: "images/Vacante.jpg"
                    }
                ],

                winner: "Champion"
            },


            /* TAG TEAM */

            {
                match: "MATCH 3",
                type: "TAG TEAM",
                championship: "",

                wrestler1: [
                    {
                        name: "Jeff Jarrett",
                        image: "images/Vacante.jpg"
                    },
                    {
                        name: "Wrestler A",
                        image: "images/Vacante.jpg"
                    }
                ],

                wrestler2: [
                    {
                        name: "Alberto Del Rio",
                        image: "images/Vacante.jpg"
                    },
                    {
                        name: "Wrestler B",
                        image: "images/Vacante.jpg"
                    }
                ],

                winner: "Team 1"
            },


            /* 6-MAN TAG TEAM */

            {
                match: "MAIN EVENT",
                type: "6-MAN TAG TEAM",
                championship: "",

                wrestler1: [
                    {
                        name: "Axiom",
                        image: "images/Vacante.jpg"
                    },
                    {
                        name: "Adam Cole",
                        image: "images/Vacante.jpg"
                    },
                    {
                        name: "Jeff Jarrett",
                        image: "images/Vacante.jpg"
                    }
                ],

                wrestler2: [
                    {
                        name: "Alberto Del Rio",
                        image: "images/Vacante.jpg"
                    },
                    {
                        name: "Wrestler E",
                        image: "images/Vacante.jpg"
                    },
                    {
                        name: "Wrestler F",
                        image: "images/Vacante.jpg"
                    }
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
                    {
                        name: "Wrestler A",
                        image: "images/Vacante.jpg"
                    }
                ],

                wrestler2: [
                    {
                        name: "W
