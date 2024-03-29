"use strict";

var command = require("./commands.js");

function dateRange (dates) {

    var string      = "";
    var newString   = "";

    if (dates.length === 2) {

        newString = command()
                        .select("job_number")
                        .from("units")
                        .where("unit_loading_date >='"+dates[0]+"' AND unit_loading_date <='"+ dates[1] +"'")
                        .end().slice(0,-1)
    } else {

        newString = command()
                        .select("job_number")
                        .from("units")
                        .where("unit_loading_date ='"+dates[0]+"'")
                        .end().slice(0,-1)

    }
    
    string += command()
                .select("*")
                .from("orders")
                .where("job_number in (" + newString + ")")
                .end()

    return string;
}

module.exports = dateRange