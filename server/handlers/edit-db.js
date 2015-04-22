var parseData 	 	= require('../lib/get-form-data.js');
var validateUser 	= require('../lib/validate-user.js');
var db 				= require("../db-config.js");


function edit (req, res, cb		) {
	parseData(req, function (data) {
		validateUser(req, res, function() {
			db.edit('orders', data, function (err) {
				if (err) {
					console.log(err)
					res.writeHead(500);
					res.write(err);
					res.end();
				} else {
					cb(req, res);
					res.writeHead(303, {
						"Location": "/#/orders"
					});
					res.end();
				}
			});
		});
	});
};

module.exports = edit;