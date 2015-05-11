function splitObject (data){
	console.log(data);
	var obj = {
	    unit: {},
	    order: {}
	};
	obj.unit.job_number = data.job_number;
	for (var prop in data){
		if(prop.substring(0,4) === "unit"){
			obj.unit[prop] = data[prop]
		}else{
			obj.order[prop] = data[prop]
		}
	}
	return obj;
}

module.exports = splitObject;