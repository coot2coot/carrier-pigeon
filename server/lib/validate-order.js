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

	var regex = /^[2][0-9]{3}[-][0-9]{2}[-][0-9]{2}$/
	return date.match(regex);
}

module.exports = validate;

