var validateUser = require('../lib/validate-user.js');
var db 			 = require("../db-config.js");

var unitTypes = function (req, res) {
	var data = req.url;
	strng = data.replace(/\/units\?/g, "")

	db.get('unit_types',function (units) {

		var unit = JSON.stringify(units);

		res.writeHead(200, {"Content-Type" : "text/plain"});
		res.end(unit);
	})
};

module.exports = unitTypes;