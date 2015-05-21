function splitObject (data){
	var obj = {
	    unit: {},
	    order: {}
	};
	for (var prop in data){
		if (data[prop] !== "") {
			if(prop.substring(0,4) === "unit"){
				obj.unit[prop] = data[prop]
			}else{
				obj.order[prop] = data[prop]
			}
		}
	}
	obj.unit.job_number = obj.order.job_number;
	return obj;
}

module.exports = splitObject;