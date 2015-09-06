"use strict"

var parseData 	 = require('../lib/get-form-data.js');
var validateUser = require('../lib/validate-user.js');
var db 			 = require("../db-config.js");

function edit (req, res, table) {

	var itemsToRemove = req.url.split("/").pop();

	validateUser(req, res, function () {

		parseData(req, function (data) {

			var jobNumber = typeof data.job_number === 'object' ? data.job_number[0] : data.job_number;

			data.items_to_remove = itemsToRemove;

			db.edit(table, data, function (err) {

				if (err) {
					res.writeHead(500);
					res.write(err);
					res.end();

				} else if (table === 'invoice') {
					res.writeHead(303, {
						"Location": "/#/orders/true/" + jobNumber
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
