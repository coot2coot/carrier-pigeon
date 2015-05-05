"use strict";

function validate (data, res, cb) {
	if (data["job_number"]=== "" || data["unit_type"] === "" || data["client"] === "" || data["unit_quantity"] === ""){
		res.writeHead(500);
		res.write("The jobnumber, date and client are all required fields");
		res.end();

	} else {
		cb();
	}
}

module.exports = validate;