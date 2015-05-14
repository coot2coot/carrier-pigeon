"use strict";
var command = require("./commands");

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
		string += command()
					.select("*")
					.from("orders")
					.where("EXTRACT(YEAR FROM date) = " + job_value.year + " AND EXTRACT(MONTH FROM date) = " + job_value.month)
					.end()

	}else if(isJobNumber(value)){
		job_value.newValue = Number(value.slice(-4));
		string += command()
					.select("*")
					.from("orders")
					.where("CAST(job_number AS text) ILIKE  '%" + job_value.newValue +"%'")
					.end()
	}

	string += command()
				.select("job_number")
				.from("orders")
				.where("client ILIKE '%" + value +"%'")
				.next()
				.select("job_number")
				.from("orders")
				.where("carrier ILIKE '%" + value +"%'")
				.next()
				.select("job_number")
				.from("orders")
				.where("collect_from ILIKE '%" + value +"%'")
				.next()
				.select("job_number")
				.from("orders")
				.where("deliver_to ILIKE '%" + value +"%'")
				.next()
				.select("job_number")
				.from("orders")
				.where("special_instructions ILIKE '%" + value +"%'")
				.next()
				.select("job_number")
				.from("orders")
				.where("shipper ILIKE '%" + value +"%'")
				.next()
				.select("job_number")
				.from("orders")
				.where("consignee ILIKE '%" + value +"%'")
				.next()
				.select("job_number")
				.from("orders")
				.where("notify ILIKE '%" + value +"%'")
				.next()
				.select("job_number")
				.from("orders")
				.where("remarks ILIKE '%" + value +"%'")
				.next()
				.select("job_number")
				.from("orders")
				.where("loading_reference ILIKE '%" + value +"%'")
				.next()
				.select("job_number")
				.from("orders")
				.where("collection_date ILIKE '%" + value +"%'")
				.next()
				.select("job_number")
				.from("orders")
				.where("contact_details ILIKE '%" + value +"%'")
				.end()

	return string;
}


module.exports = query;
