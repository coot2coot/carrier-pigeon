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
	var query = {
		update: "",
		create: ""
	};
	for(i = 0; i < units["unit_type"].length; i ++){
		console.log(units["job_number"])
		if(units["unit_id"][i]!== ""){
			query.update += "UPDATE units SET unit_type = '" + units["unit_type"][i] + "',unit_number = " + units["unit_number"][i] + ",unit_weight = " + units["unit_weight"][i] + " WHERE unit_id = " + units["unit_id"][i] +"; ";
		}else{
			query.create += "INSERT INTO units (unit_type, unit_weight, unit_number, job_number) VALUES ('" + units["unit_type"][i]+ "'," + units["unit_weight"][i] + "," + units["unit_number"][i] +",'" + units["job_number"] + "');"
		}

	}
	return query;
}

query.unitDelete = function (units) {
	if (units !== ""){
		var arr = units.split(",")
        var deleteQuery = "";
        var i;

        for(i = 0; i < arr.length; i++){
            deleteQuery += "DELETE FROM units WHERE unit_id = "+arr[i]+";"
        }
        return deleteQuery;
    }else{
    	return "";
    }

}


module.exports = query;
