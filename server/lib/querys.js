"use strict";

var query = {};

query.searchOrders = function (value) {
	var string = "";

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
	"SELECT * From orders WHERE city ILIKE '%" + value +"%';" +
	"SELECT * From orders WHERE date '" + value +";"

	return string;
}

module.exports = query;