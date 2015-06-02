"use strict";

var query = {};

function getLength(type, obj) {
	if (type === "units") {
		return obj.unit_type.length;
	} else {
		return obj.currency.length;
	}
}

function whichJobNumber(items, i) {
	var no = (typeof items.job_number === "object") 
			? items.job_number[i] 
			: items.job_number;

	return no;
}

function getRightValue(item, property, i) {
	var prop  = i !== undefined ? item[property][i] : item[property];

	var val = (prop === "")
		? "null"
		: (property === "amount" || property === "invoice_number")
		? prop
		: "'" + prop + "'";

	return val;
}

function getCreateQuery (type, obj, id, index) {
	var props;
	var query = "";
	var jobNo = whichJobNumber(obj, index);

	var data  = {};

	data.columns = [];
	data.values  = [];

	for (props in obj) {
		if (props !== id && props !== "job_number" && props !== "delete_invoice") {
			
			data.columns.push(props);
			var value = getRightValue(obj, props, index);
			data.values.push(value);
		}
	}

	query = "INSERT INTO " + type + " (" + data.columns.join() +
			",job_number) VALUES (" + data.values.join() + "," + 
			jobNo + "); ";

	return query;
}

function getUpdateQuery (type, id, obj, index) {
	var props;
	var itemId = index !== undefined ? obj[id][index] : obj[id];
	var query = "";
	var updateArr = [];
	var updateStr = "";

	for (props in obj) {
		if (props !== id && props !== "job_number" && props !== "delete_invoice") {

			var prop  = index !== undefined ? obj[props][index] : obj[props];
			var value = "'" + prop + "'";

			if (prop === "") {
				value = "null";
			}
			updateStr = props + "=" + value;
  			updateArr.push(updateStr);

		}
	}

	query = "UPDATE " + type + " SET " + updateArr.join() + 
        	" WHERE " + id + "=" + itemId + "; ";

    return query;
}


query.update = function (items, table, idName){
	var query = {};

	query.update = "";
	query.create = "";

	if(typeof items[idName] === "object"){
		var i;
		var length = getLength(table, items);

		for(i = 0; i < length; i ++){
			if(items[idName][i] !== ""){
				query.update += getUpdateQuery(table, idName, items, i);
			} else {
				query.create += getCreateQuery(table, items, idName, i);
			}
		}

	} else {
		if (items[idName] === "") {
			query.create = getCreateQuery(table, items, idName);
		} else {
			query.update = getUpdateQuery(table, idName, items); 
		}
	}
	return query;
};

query.del = function (items, table, idName) {

	if (items !== "") {
		var arr = items.split(",");
        var deleteQuery = "";
        var i;

        for(i = 0; i < arr.length; i++) {
            deleteQuery += "DELETE FROM " + table + " WHERE " + 
            				idName + " = "+arr[i]+";";
        }
        return deleteQuery;

    } else {
    	return "";
    }

};

query.standard = function (result) {
	var query = "";

	for (var k in result) {
		query = query + k +  "="  + "'" + result[k] + "'" +  ",";
	}
	var newQuery = query.substring(0, query.length - 1);
	return newQuery;
};

module.exports = {
	getQuery: query,
	getLength: getLength,
	getJobNumber: whichJobNumber
};
