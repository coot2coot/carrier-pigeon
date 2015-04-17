var parseData 	 	= require('../lib/get-form-data.js');
var validateUser 	= require('../lib/validate-user.js');
var db 				= require("../db-config.js");

function check (data) {
	if(data.invoice === ''|| data.invoice === 'false'){
		data.invoice = true
	}else{
		data.invoice = false
	}
	return data
}

function update (req, res, cb) {
	parseData(req, function (data) {
		check(data);
		validateUser(req, res, function() {
			db.update('orders', data, function (err) {
				if (err) {
					console.log(err)
					res.writeHead(500);
					res.write(err);
					res.end();
				} else {
					cb(req, res);
					res.writeHead(303, {
						"Location": "/#/orders/update"
					});
					res.end();
				}
			});
		});
	});
};

module.exports = update;