"use strict";
var stringify = require('./stringify-data-sql.js');

module.exports = function (units){
	var data = {};

	if(typeof units["unit_type"] === "object"){
		var i;
		var arr = [];
		var str = "";
		for(i = 0; i < units["unit_type"].length; i ++ ){
			str += "('" + units["unit_type"][i] + "', '" + units["unit_weight"][i] +  "', '" + units["unit_number"][i] + "',(SELECT job_number FROM orders ORDER BY job_number DESC LIMIT 1)),";
		}

		console.log(str);

		data.values= str.slice(0, -1);
		data.columns = "unit_type,unit_weight,unit_number,job_number";
		return data;
	}else{

		data = stringify(units);
		var str = "('" + data.values + "',(SELECT job_number FROM orders ORDER BY job_number DESC LIMIT 1))";

		data.values = str;
		return data;
	}
}
