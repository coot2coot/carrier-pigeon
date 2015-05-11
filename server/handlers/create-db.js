var parseData 	 = require('../lib/get-form-data.js');
var validateUser = require('../lib/validate-user.js');
var validateOrder = require('../lib/validate-order.js');
var splitObject = require('../lib/split-orders-object.js');
var db 			 = require("../db-config.js");

function create (req, res) {
	parseData(req, function (data) {
		validateOrder(data, res, function () {
			validateUser(req, res, function() {
				var splitData = splitObject(data);
				db.post('orders', splitData, function (err) {
					if (err) {
						console.log(err)
						res.writeHead(500);
						res.write(err);
						res.end();
					}
					else {
						res.writeHead(303, {
							"Location": "/#/orders/true"
						});
						res.end();
					}
				});
			});
		});
	});
};

module.exports = create;
