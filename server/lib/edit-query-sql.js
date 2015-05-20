"use strict";

var stringify = require("./stringify-units-sql.js");
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
	if(typeof units.unit_type ==="object"){
		for(i = 0; i < units["unit_type"].length; i ++){
			var props,
				updateArr = [];

			if(!!units.unit_id[i] && units.unit_id[i] !== ""){
				console.log("update");
				for (props in units) {
					if (props !== "unit_id" && props !== "job_number") {
						var value = "'" + units[props][i] + "'";

						if (units[props][i] === "") {
							value = "null";
						}
						var updateStr = props + "=" + value;
              			updateArr.push(updateStr);
					}
				}
				query.update += "UPDATE units SET " + updateArr.join() + 
                    		" WHERE unit_id=" + units.unit_id[i] + "; ";
			} else {
				console.log("create");
				var data = stringify(units);
				query.create = "INSERT INTO units " + data.columns +
								" VALUES " + data.values + "; "
			}
		}
	}else{
		//TODO:
		query.update += " UPDATE units SET unit_type = '" + units["unit_type"] + "',unit_number = '" + units["unit_number"] + "',unit_weight = " + units["unit_weight"] + " WHERE unit_id = " + units["unit_id"] +";";
	}

	console.log(query);

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
        return deleteQuery
    }else{
    	return "";
    }

}


module.exports = query;
