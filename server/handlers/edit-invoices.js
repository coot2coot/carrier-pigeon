var parseData 	 	= require('../lib/get-form-data.js');
var validateOrder = require('../lib/validate-order.js').validate;
var validateUser = require('../lib/validate-user.js');
var splitObject = require('../lib/split-orders-object.js');
var db 				= require("../db-config.js");

function edit (req, res, cb) {
	validateUser(req, res, function() {
		parseData(req, function (data) {

			console.log(data);

				db.edit('invoice', data, function (err) {
					if (err) {
						console.log(err)
						res.writeHead(500);
						res.write(err);
						res.end();
					} else {
						cb(req, res);
						res.writeHead(303, {
							"Location": "/#/orders/true"
						});
						res.end();
					}
				});
			});
	});
};

module.exports = edit;