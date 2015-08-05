"use strict"

var parseData 	 = require('../lib/get-form-data.js');
var validateUser = require('../lib/validate-user.js');
var db 			 = require("../db-config.js");

function edit (req, res, table) {
	
	var invoiceNumbers = req.url.split("/").pop();

	validateUser(req, res, function () {

		parseData(req, function (data) {

			data.delete_invoice = invoiceNumbers;

			db.edit(table, data, function (err) {

				if (err) {
					res.writeHead(500);
					res.write(err);
					res.end();

				} else if (table === 'invoice') {
					res.writeHead(303, {
						"Location": "/#/orders/true"
					});
					res.end();
				} else {
					res.writeHead(303, {
						"Location": "/#/contacts/true"
					});
					res.end();
				}
			});
		});
	});
};

module.exports = edit;