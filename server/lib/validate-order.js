"use strict";

function validate (data, res, cb) {

	if (jobNumberIsValid(data["job_number"])=== null || dateIsValid(data.date) === null || data["unit_type"] === "" ){
		res.writeHead(500);
		res.write("The jobnumber, date and client are all required fields");
		res.end();

	} else {
		cb();
	}
}

function jobNumberIsValid(job) {
	var regex = /^[0-9]{6}$/
	return job.match(regex);
}
function dateIsValid(date) {

	var regex = /^[2][0-9]{3}[-][0-9]{2}[-][0-9]{2}$/
	return date.match(regex);
}

module.exports = validate;

