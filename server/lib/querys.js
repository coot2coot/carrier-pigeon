"use strict";

function isJobNumber(job_number) {

	var regex = /^[0-9]{8}$/
	return job_number.match(regex);
}

function isPartialJobNumber(job_number) {

	var regex = /^[0-9]{4}$/
	return job_number.match(regex);
}

var query = {};

query.searchOrders = function (value) {
	var string = "";
	var job_value = {};
	if(isPartialJobNumber(value)){
		job_value.year = "20" + value.slice(0,2);
		job_value.month = value.slice(2,4);
		string += "SELECT * From orders WHERE EXTRACT(YEAR FROM date) = " + job_value.year + " AND EXTRACT(MONTH FROM date) = " + job_value.month+";";
	}else if(isJobNumber(value)){
		job_value.newValue = Number(value.slice(-4));
		string += "SELECT * From orders WHERE CAST(job_number AS text) ILIKE '%" + job_value.newValue+ "%';";
	}
	string += "SELECT * From orders WHERE client ILIKE '%" + value +"%';" +
	"SELECT * From orders WHERE carrier ILIKE '%" + value +"%';" +
	"SELECT * From orders WHERE collect_from ILIKE '%" + value +"%';" +
	"SELECT * From orders WHERE deliver_to ILIKE '%" + value +"%';"
	"SELECT * From orders WHERE special_instructions ILIKE '%" + value +"%';" +
	"SELECT * From orders WHERE shipper ILIKE '%" + value +"%';" +
	"SELECT * From orders WHERE consignee ILIKE '%" + value +"%';" +
	"SELECT * From orders WHERE notify ILIKE '%" + value +"%';" +
	"SELECT * From orders WHERE remarks ILIKE '%" + value +"%';" +
	"SELECT * From orders WHERE loading_referencee ILIKE '%" + value +"%';" +
	"SELECT * From orders WHERE collection_date ILIKE '%" + value +"%';" +
	"SELECT * From orders WHERE collection_time ILIKE '%" + value +"%';" +
	"SELECT * From orders WHERE contact_details ILIKE '%" + value +"%';" +
	"SELECT * From orders WHERE comodity_details ILIKE '%" + value +"%';" +
	"SELECT * From orders WHERE city ILIKE '%" + value +"%';" ;

	console.log(string)

	return string;
}

module.exports = query;