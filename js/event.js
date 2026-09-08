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

const wrestlerDatabase =
    window.wrestlerDatabase || {};


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
                    "Axiom
