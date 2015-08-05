"use strict";

function isEmptyObj(obj) {

    for(var prop in obj) {
    	
        if(prop !== "job_number" && obj.hasOwnProperty(prop)) {
            return false;
        }
    }

    return true;
}

function validate (data, res, cb) {

	if(!isEmptyObj(data)) {

		if (dateIsValid(data.date) === null || data["unit_type"] === "" ){
			res.writeHead(500);
			res.write("The jobnumber, date and client are all required fields");
			res.end();

		} else {
			cb();
		}
	} else {
		res.writeHead(303, {
			"Location": "/#/orders"
		});
		res.end();
	}
}

function dateIsValid(date) {

	var regex = /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/
	
	return date.match(regex);
}

module.exports = {
	validate: validate,
	dateIsValid: dateIsValid
}

