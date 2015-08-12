/* this method is designed to split an object into two objects
to simplify the updating of two tables*/

function splitObject (data, id) {
	var obj = {
	    first: {},
	    second: {}
	};
	for (var prop in data) {

		if (data[prop] !== "") {
			if (prop.substring(0,4) === "unit") {
				obj.second[prop] = data[prop]

			} else if (prop.substring(0, 9) === 'reminder_') {	    
			    obj.second[prop.substring(9, prop.length)] = data[prop]

			} else {
				obj.first[prop] = data[prop]
			}
		}
	}

	if (id === 'job_number') obj.second[id] = obj.first[id];

	return obj;
}

module.exports = splitObject;