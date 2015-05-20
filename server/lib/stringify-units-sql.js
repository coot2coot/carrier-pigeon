"use strict";
var stringify = require('./stringify-data-sql.js');

function createJobNumString(num) {
  	var arr = [];
  	for (var i = 0; i < num; i++) {
    	arr.push("(SELECT job_number FROM orders ORDER BY job_number DESC LIMIT 1)");
  	}
  	return arr.join(",");
}

module.exports = function (units){
	var data = {};
	if(typeof units["unit_type"] === "object"){
		data.columns = "";
		data.values = "";

		var columns = [],
		    values = [],
		    length = units.unit_number.length,
		    i;

		for (i = 0; i < length; i ++) {
		  	var props,
		      	arr = [],
		      	str = "";
				  
		  	for(props in units) {
				if (i === 0){
				  	columns.push(props);
				}
				if (typeof units[props] === "object"){
			      	var propValue = "'" + units[props][i] + "'";
			      	
			      	if(propValue === "''") {
			        	propValue = "null";
			      	}
				  	arr.push(propValue);
				}
		  	}
		  	str += "(" + arr.join() + ",(SELECT job_number FROM orders ORDER BY job_number DESC LIMIT 1))";
		  	values.push(str);
		  	arr = [];
		}

		var valueStr = values.join()

		data.columns = columns.join();
		data.values = valueStr.substring(1, valueStr.length-1);
		return data;
	} else {
		data = stringify(units);
		data.values= data.values.slice(0, -1);
		var str = data.values.slice(0, -1) + "(SELECT job_number FROM orders ORDER BY job_number DESC LIMIT 1)";

		data.values = str;
		return data;
	}
}
