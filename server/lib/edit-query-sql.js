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
	if(typeof units.unit_type ==="object"){
		for(i = 0; i < units["unit_type"].length; i ++){
			var props,
				updateArr = [];

			if(!!units.unit_id[i] && units.unit_id[i] !== ""){
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
				var data = {};
				data.columns = [];
				data.values = [];
				for (props in units) {
					if (props !== "unit_id" && props !== "job_number") {
						data.columns.push(props);
						var value = "'" + units[props][i] + "'";
						if (units[props][i] === "") {
							value = "null";
						}
						data.values.push(value);
					}
				}
				query.create += "INSERT INTO units (" + data.columns.join() +
								",job_number) VALUES (" + data.values.join() + "," + 
								units.job_number + "); ";
			}
		}
	}else{
		//TODO:
		query.update += " UPDATE units SET unit_type = '" + units["unit_type"] + "',unit_number = '" + units["unit_number"] + "',unit_weight = " + units["unit_weight"] + " WHERE unit_id = " + units["unit_id"] +";";
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
        return deleteQuery
    }else{
    	return "";
    }

}


module.exports = query;
