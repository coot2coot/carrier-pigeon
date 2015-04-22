
module.exports = function (result) {
	var query = "";

	for(var k in result) {
		query = query + k +  "="  + "'" + result[k] + "'" +  ",";
	}
	// .substring(0, query.length - 1) is used to get rid of the last coma

	return query.substring(0, query.length - 1);
}
