"use strict";

function validate (data, res, cb) {

	if (dateIsValid(data.date) === null || data["unit_type"] === "" ){
		res.writeHead(500);
		res.write("The jobnumber, date and client are all required fields");
		res.end();

	} else {
		cb();
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

