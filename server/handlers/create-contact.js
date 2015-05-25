var parseData 	 = require('../lib/get-form-data.js');
var db 			 = require("../db-config.js");
var validateUser = require('../lib/validate-user.js');

function create (req, res) {	
	parseData(req, function (data) {
		validateUser(req, res, function() {
			db.post('contacts', data, function (err) {
				if (err) {
					console.log(err)
					res.writeHead(500);
					res.write(err);
					res.end();
				}
				else {
					res.writeHead(303, {
						"Location": "/#/contacts/true"
					});
					res.end();
				}
			}); 
		});
	});
};

module.exports = create;