"use strict";

var parseData 	 = require('../lib/get-form-data.js');
var validateOrder= require('../lib/validate-order.js').validate;
var validateUser = require('../lib/validate-user.js');
var splitObject  = require('../lib/split-orders-object.js');
var db 			 = require("../db-config.js");
var removes 	 = require('../lib/removeQuotes.js');

var edit = {};

edit.orders = function (req, res, cb) {
	var data = req.url;
	/*
	The id's for the units that have been deleted are sent to the server
	in the url of the post request. The ids are then extracted and set 
	as the value of the var strng
	*/
	var strng = data.replace(/\/order\/edit\//g, "");

	parseData(req, function (data) {
		data = removes(data)
		validateOrder(data, res, function () {
			validateUser(req, res, function() {
				var splitData = splitObject(data);
				splitData.unit_delete = strng;

				db.edit('orders', splitData, function (err) {
					if (err) {
						console.log(err);
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
	});
};

edit.contactsReminders = function (req, res, cb) {
	var table;
	if (req.url.indexOf('contact') > -1) {
		table = "contacts";
	} else {
		table = "reminders";
	}
	parseData(req, function (data) {
		data = removes(data)
		validateUser(req, res, function() {

			db.edit(table, data, function (err) {
				if (err) {
					console.log(err);
					res.writeHead(500);
					res.write(err);
					res.end();
				} else {
					cb(req, res);
					res.writeHead(303, {
						"Location": "/#/" + table + "/true"
					});
					res.end();
				}
			});
		});
	});
};

module.exports = edit;