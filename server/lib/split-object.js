/* this method is designed to split an object into two objects
to simplify the updating of two seperate postgress tables*/

function splitObject (data, id) {
	var obj = {
	    mainObject: {},
	    minorObject: {}
	};
	for (var prop in data) {

		if (data[prop] !== "" || prop === "reminder_contact_reminders_id") {
			if (prop.substring(0,4) === "unit") {
				obj.minorObject[prop] = data[prop]

			} else if (prop.substring(0, 9) === 'reminder_') {	    
			    obj.minorObject[prop.substring(9, prop.length)] = data[prop]

			} else {
				obj.mainObject[prop] = data[prop]
			}
		}
	}

	if (id === 'job_number') obj.minorObject[id] = obj.mainObject[id];

	return obj;
}

module.exports = splitObject;
