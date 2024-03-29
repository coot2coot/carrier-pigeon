"use strict";

var command = require("./commands");
var query 	= {};

var searchItem = [
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
	},
	{
		table: "units",
		column: "unit_seal"
	}
];

var contactsArray = [
	'vat_number',
	'city',
	'country',
	'county',
	'address_line',
	'company_name',
	'sales_report',
	'remarks',
	'name'
]

function createSearchString(searchString, item) {

	var string = "";
	var searchArray = searchString.split("%20");

	searchArray.map( function (text, i) {

		if (i === 0) {
			string += item + " ILIKE '%" + text +"%'"
		} else {
			string +=  " AND " + item + " ILIKE '%" + text +"%'"
		}
	})

	return string;
}

function isJobNumber(job_number) {

	var regex = /^[0-9]{8}$/
	return job_number.match(regex);
}

function isPartialJobNumber(job_number) {

	var regex = /^[0-9]{4}$/
	return job_number.match(regex);
}

function findYear(value) {

	var job_value 	= {};
	var string 		= "";

	job_value.year 			= "20" + value.slice(0,2);
	job_value.month 		= value.slice(2,4);
	job_value.job_number	= value.replace(/^0+(?!\.|$)/, '')
	
	string += command()
				.select("*")
				.from("orders")
				.where("EXTRACT(YEAR FROM date) = " + job_value.year + " AND EXTRACT(MONTH FROM date) = " + job_value.month)
				.next()
				.select("*")
				.from("orders")
				.where("job_number = " + job_value.job_number)
				.end()

	return string;
}

function findJobNumber(value) {

	var job_value 	= {};
	var string 		= "";

	job_value.newValue = Number(value.slice(-4))

	string += command()
				.select("*")
				.from("orders")
				.where("CAST(job_number AS text) ILIKE  '" + job_value.newValue +"'")
				.end();

	return string;
}

function keyWord (value) {
	var string = "";

	searchItem.map(function (item, i) {

		var searchString = createSearchString(value, item.column)
		var newString = command()
						.select("job_number")
						.from(item.table)
						.where(searchString)
						.end().slice(0,-1)
						
		string += command()
					.select("*")
					.from("orders")
					.where("job_number in (" + newString + ")")
					.end()
	})

	return string;
}

query.searchOrders = function (value) {
	var string = "";

	if (isPartialJobNumber(value)) {

		string += findYear(value);
	} else if (isJobNumber(value)) {

		string +=  findJobNumber(value);
	}

	string += keyWord(value);

	return string;
}

query.searchContacts = function (value) {
	var string = "";

	contactsArray.map(function (item, i) {

		var searchString = createSearchString(value, item)
		string += command()
					.select("*")
					.from("contacts LEFT JOIN reminders ON contacts.contact_id = reminders.contact_reminders_id")
					.where(searchString)
					.end()
	})

	return string;
}

module.exports = query;
