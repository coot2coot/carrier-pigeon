"use strict";
var command = require("./commands");

var searchItem= [
	{
		table: "orders",
		column: "client"
	},
	{
		table: "orders",
		column: "carrier"
	},
	{
		table: "orders",
		column: "collect_from"
	},
	{
		table: "orders",
		column: "deliver_to"
	},
	{
		table: "orders",
		column: "special_instructions"
	},
	{
		table: "orders",
		column: "shipper"
	},
	{
		table: "orders",
		column: "consignee"
	},
	{
		table: "orders",
		column: "notify"
	},
	{
		table: "orders",
		column: "remarks"
	},
	{
		table: "orders",
		column: "port_of_loading"
	},
	{
		table: "orders",
		column: "port_of_discharge"
	},
	{
		table: "orders",
		column: "vessel"
	},
	{
		table: "units",
		column: "unit_number"
	},
	{
		table: "units",
		column: "unit_commodity_description"
	},
	{
		table: "units",
		column: "unit_loading_reference"
	},
	{
		table: "units",
		column: "unit_type"
	},
	{
		table: "units",
		column: "unit_kind_of_packages"
	}
];

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
	var funct;
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


	searchItem.map(function (item, i) {
		var newString = command()
						.select("job_number")
						.from(item.table)
						.where(item.column+" ILIKE '%" + value +"%'")
						.end().slice(0,-1)
		string += command()
					.select("*")
					.from("orders")
					.where("job_number in (" + newString + ")")
					.end()
	})

	return string;
}



module.exports = query;
