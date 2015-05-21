"use strict";
var stringify = require('./stringify-data-sql.js');

function isJobNumber (number) {
	if (number) {
		return number;
	} else {
		return "(SELECT job_number FROM orders ORDER BY job_number DESC LIMIT 1)";
	}
}

function stringifyOneUnit (object) {
	var data;
	var job_number = isJobNumber(object.job_number);

	data = stringify(object);
	var str = data.values.slice(0, -2) + job_number;

	data.values = str;
	return data;
}

function getColumns (object) {
	var props,
		arr = [],
		str = "";

	for (props in object) {
		arr.push(props);
	}

	str = arr.join();

	return str;
}

function getValues (object) {
	var values = [],
	    length = object.unit_number.length,
	    i;

	for (i = 0; i < length; i ++) {
		var props,
	      	arr = [],
	      	str = "";
			  
	  	for(props in object) {
			if (typeof object[props] === "object"){
		      	var propValue = "'" + object[props][i] + "'";
		      	
		      	if(propValue === "''") {
		        	propValue = "null";
		      	}
			  	arr.push(propValue);
			}
		}

		var job_number = isJobNumber(object.job_number);

		str += "(" + arr.join() + "," + job_number + ")";
	  	values.push(str);
	  	arr = [];
	}
	return values.join();
}

function stringifyUnits (units){
	var data = {};

	if(typeof units.unit_type === "object"){
		data.columns = "";
		data.values = "";

		var valueStr = getValues(units);

		data.columns = getColumns(units);
		data.values = valueStr.substring(1, valueStr.length-1);
		return data;
		
	} else {
	  	return stringifyOneUnit(units);
	}
}

module.exports = {
  stringify: stringifyUnits,
  values: getValues,
  columns: getColumns,
  isJobNumber: isJobNumber
}

