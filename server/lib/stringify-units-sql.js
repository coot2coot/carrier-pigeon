"use strict";
var stringify = require('./stringify-data-sql.js');

module.exports = function (units){
	var data = {};
	console.log(typeof units["unit_type"])
	if(typeof units["unit_type"] === "object"){
		var i;
		var arr = [];
		for(i = 0; i < units["unit_type"].length; i ++ ){
			var value = []
			value.push(units["unit_type"][i]);
			value.push(units["unit_weight"][i]);
			value.push(units["unit_number"][i]);
			value.push(units["job_number"])
			var values = value.join("','");
			arr.push(values);
		}
		data.values= arr.join("'),('");
		data.columns = "unit_type,unit_weight,unit_number,job_number";
		return data;
	}else{
		data = stringify(units);
		return data;
	}
}
