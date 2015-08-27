/* this method is designed to split an object into two/three objects
to simplify the updating of two/three seperate postgress tables
singleValueObject is for tables where only one row will need to be 
added at one time. MultipleValuesObject if for when multiple
rows must be added for one table. MultipleValuesObject2 is for when
three tables are being updated and for two of them multiple rows are
 being added */

function splitObject (data, id) {

	var obj = {
	    singleValueObject: {},
	    multipleValuesObject: {},
	    multipleValuesObject2: {}
	};
	for (var prop in data) {

		if ((prop !== 'date' &&
				prop !=='ets' &&
				prop !=='eta' && 
				prop !=='unit_loading_date' && 
				prop !== 'unit_loading_time' && 
				prop != 'unit_volume' && 
				prop !== 'unit_net_weight' && 
				prop !== 'unit_gross_weight' && 
				prop !== 'unit_no_of_packages') ||
				(data[prop] !== '')) {

			if (prop.substring(0,4) === "unit") {
				obj.multipleValuesObject[prop] = data[prop]

			} else if (prop.substring(0, 9) === 'reminder_') {	    
			    obj.multipleValuesObject[prop.substring(9, prop.length)] = data[prop]

			}  else if (prop.substring(0, 8) === 'contact_' && prop.substring(8, prop.length) !== 'id') {	    
			    obj.multipleValuesObject2[prop.substring(8, prop.length)] = data[prop]

			} else {
				obj.singleValueObject[prop] = data[prop]
			}
		} 
	}
	if (id === 'job_number') obj.multipleValuesObject[id] = obj.singleValueObject[id];

	return obj;
}

module.exports = splitObject;
