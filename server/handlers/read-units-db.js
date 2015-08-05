var validateUser = require('../lib/validate-user.js');
var db 			 = require("../db-config.js");

function selectUnits (req, res) {
	var data = req.url.split("/").pop();

	validateUser(req,res, function (){

		db.selectUnits('units', data, function (units) {

			var unit = JSON.stringify(units);

			res.writeHead(200, {"Content-Type" : "text/plain"});
			res.end(unit);
		})
	})
};

module.exports = selectUnits;