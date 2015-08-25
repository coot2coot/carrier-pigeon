var parseData		= require('../lib/get-form-data.js');
var validateUser 	= require('../lib/validate-user.js');
var validateOrder 	= require('../lib/validate-order.js').validate;
var splitObject 	= require('../lib/split-object.js');
var db 				= require("../db-config.js");
var removes 		= require('../lib/removeQuotes.js');

function create (req, res) {
	
	parseData(req, function (data) {

		data = removes(data)
		validateUser(req, res, function () {

			if (data.new_unit) {
				db.post('unit_types', data, function (err) {

						if (err) {
							console.log(err)
							res.writeHead(500);
							res.write(err);
							res.end();
						}
						else {
							res.writeHead(303, {
								"Location": "/#/settings/units"
							});
							res.end();
						}
					});
			} else {
				validateOrder(data, res, function () {

					data.file_name = typeof data.file_name === 'object' ? data.file_name.join() : data.file_name;

					var splitData = splitObject(data);

					db.post('orders', splitData, function (err, jobNumber) {
						
						if (err) {
							console.log(err)
							res.writeHead(500);
							res.write(err);
							res.end();
						}
						else {
							res.writeHead(303, {
								"Location": "/#/orders/true/" + jobNumber.rows[0].job_number
							});
							res.end();
						}
					});
				});
			}
		});
	});
};

module.exports = create;
