
module.exports = function (result) {
	var data = {},
		value = [],
		keys = [];

	for(var k in result) {
		keys.push(k);
	    value.push(result[k]);
	}
	data.columns = keys.join(", ");
	data.values = value.join("', '");
	
	return data;
}