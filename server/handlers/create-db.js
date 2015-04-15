var parseData 	 = require('./lib/get-form-data.js');
var validateUser = require('./lib/validate-user.js');
var db 			 = require("./db-sql-config.js");

function create (req, res) {
	(req, function (data) {
		validateUser(req, res, function() {
			db.post('orders', data, function (err) {
				if (err) {
					res.writeHead(500);
					res.write(err);
					res.end();
				} else {
					res.writeHead(201, {
						"Location": "/#/orders"
					});
					res.end();
				}
			});
		});
	});
};
