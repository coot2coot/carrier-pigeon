var validateUser = require('../lib/validate-user.js');
var db 			 = require("../db-config.js");

function select (req, res) {

	var table = req.url.indexOf('unit') > -1 ? 'units' : 'reminder_contacts'
	
	var id = req.url.split("/").pop();

	validateUser(req, res, function (){

		db.select(table, id, function (result) {

			var payload = JSON.stringify(result);

			res.writeHead(200, {"Content-Type" : "text/plain"});
			res.end(payload);
		})
	})
};

module.exports = select;