"use strict";
var query = {};

query.standard = function (result) {
	var query = "";

	for(var k in result) {
		query = query + k +  "="  + "'" + result[k] + "'" +  ",";
	}
	var newQuery = query.substring(0, query.length - 1);
	return newQuery;
}
query.units = function (units){
	var i;
	var query = "";
	for(i = 0; i < units["unit_type"].length; i ++){
		query = query + "UPDATE units SET unit_type = '" + units["unit_type"][i] + "',unit_number = " + units["unit_number"][i] + ",unit_weight = " + units["unit_weight"][i] + " WHERE unit_id = " + units["unit_id"][i] +"; ";
	}
	return query;
}

module.exports = query;
