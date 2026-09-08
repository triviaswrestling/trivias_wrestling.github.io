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

            {
                match: "MATCH 1",
                wrestlers: "Wrestler A vs Wrestler B",
                winner: "Wrestler A"
            },

            {
                match: "MATCH 2",
                wrestlers: "Wrestler C vs Wrestler D",
                winner: "Wrestler D"
            },

            {
                match: "MAIN EVENT",
                wrestlers: "Wrestler E vs Wrestler F",
                winner: "Wrestler F"
            }

        ]

    },


    "weekly-2": {

        type: "WEEKLY",
        title: "WEEKLY #2",
        date: "13/09/2026",
        brand: "RAW & SMACKDOWN",

        results: [

            {
                match: "MATCH 1",
                wrestlers: "Wrestler A vs Wrestler C",
                winner: "Wrestler C"
            },

            {
                match: "MATCH 2",
                wrestlers: "Wrestler B vs Wrestler D",
                winner: "Wrestler B"
            }

        ]

    },


    "nxt-1": {

        type: "NXT",
        title: "NXT #1",
        date: "08/09/2026",
        brand: "NXT",

        results: [

            {
                match: "MATCH 1",
                wrestlers: "Wrestler A vs Wrestler B",
                winner: "Wrestler A"
            },

            {
                match: "MAIN EVENT",
                wrestlers: "Wrestler C vs Wrestler D",
                winner: "Wrestler D"
            }

        ]

    },


    "nxt-2": {

        type: "NXT",
        title: "NXT #2",
        date: "
