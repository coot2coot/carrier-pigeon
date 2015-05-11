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

function update (req, res) {
	parseData(req, function (data) {
		var table;
		var username = req.url.split('/').pop();
		
		if (req.url.indexOf('user') > -1) {
			if (data.new_password === data.confirm_password) {
				table = 'users';
			} else {
				res.writeHead(303, {
					"Location": "/#/settings/"+ username +"/error"
				});
				res.end();
			}
		} else {
			table = "orders";
			check(data);
		}
		validateUser(req, res, function(user) {
			if (table === 'users') {
				data.username = user.username;
			}

			db.edit(table, data, function (err) {
				if (err) {
					console.log(err)
					if (table === "users") {
						res.writeHead(303, {
							"Location": "/#/settings/"+ username +"/error"
						});
						return res.end();
					} 
					res.writeHead(500);
					res.write(err);
					res.end();
				} else {
					res.writeHead(303, {
						"Location": "/#/orders/true"
					});
					res.end();
				}
			});
		});
	});
};

module.exports = update;