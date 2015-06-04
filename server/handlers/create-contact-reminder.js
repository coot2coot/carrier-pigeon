var parseData 	 = require('../lib/get-form-data.js');
var db 			 = require("../db-config.js");
var validateUser = require('../lib/validate-user.js');
var removes 	= require('../lib/removeQuotes.js');

function create (table,req, res) {	
	parseData(req, function (data) {
		data = removes(data)
		validateUser(req, res, function() {
			db.post(table, data, function (err) {
				if (err) {
					console.log(err)
					res.writeHead(500);
					res.write(err);
					res.end();
				}
				else {
					res.writeHead(303, {
						"Location": "/#/"+table+"/true"
					});
					res.end();
				}
			}); 
		});
	});
};

module.exports = create;