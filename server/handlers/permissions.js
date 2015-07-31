"use strict"

var parseData 	 = require('../lib/get-form-data.js');
var validateUser = require('../lib/validate-user.js');
var db 			 = require("../db-config.js");

function edit (req, res, cb) {

	validateUser(req, res, function() {

		parseData(req, function (data) {

			var user = {
				admin: data.admin ? true : false,
				permission_ledger: data.permission_ledger ? true : false,
				permission_contact: data.permission_contact ? true : false,
				permission_orders: data.permission_orders ? true : false
			}

			db.editUserPermissions(data.user, user, function (err) {

				if (err) {
					res.writeHead(500);
					res.write(err);
					res.end();

				} else {
					res.writeHead(303, {
						"Location": "/#/users/true"
					});
					res.end();
				}
			});
		});
	});
};

module.exports = edit;