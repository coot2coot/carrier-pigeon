"use strict";

var db 			 = require("../db-config.js");
var validateUser = require('../lib/validate-user.js');

function search (req, res) {

	var table;
	var data = req.url.split("/").pop().split(",");

	if (req.url.indexOf('unit') > -1) {

		table = "units";
	} else {

		table = "orders";
	}

	validateUser(req,res, function (){

		var url = req.url;

		db.searchDates(url, table, data, function (err,orders) {

			if (err) {
				res.writeHead(200, {"Content-Type" : "text/plain"});
				res.end('error');
			} else {
				var order = JSON.stringify(orders);

				res.writeHead(200, {"Content-Type" : "text/plain"});
				res.end(order);
			}
		});
	});
}


module.exports = search;
