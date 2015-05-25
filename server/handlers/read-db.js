"use strict"

var validateUser = require('../lib/validate-user.js');
var db 			 = require("../db-config.js");
var NodeCache 	 = require("node-cache");
var secondsToSave= 60 * 60 * 24 * 7;
var myCache 	 = new NodeCache({ stdTTL: secondsToSave });
var readOptions  = {};

var getOrders = function (req, res) {

	db.get('orders',function (orders) {		
		myCache.set("orders", orders, secondsToSave, function(err, success){

			if(err){
				console.error(err)
			}
		});
		var order = JSON.stringify(orders);

		res.writeHead(200, {"Content-Type" : "text/plain"});
		res.end(order);
	})
};

var getContacts = function (req, res) {

	db.get('contacts',function (contacts) {		
		myCache.set("contacts", contacts, secondsToSave, function(err, success){

			if(err){
				console.error(err)
			}
		});
		var contact = JSON.stringify(contacts);

		res.writeHead(200, {"Content-Type" : "text/plain"});
		res.end(contact);
	})
};

var getUserList = function (req, res) {
	db.get('users',function (usrs) {
		var users = [];

		usrs.forEach(function(user) {
			if (user.admin === false) {
				users.push(user);
			}
		})

		myCache.set("users", users, function(err, success){
			if(err){
				console.error(err)
			}
		});
		
		var userList = JSON.stringify(users)

		res.writeHead(200, {"Content-Type" : "text/plain"});
		res.end(userList);
	})
};

readOptions.cached = function (req, res) {
	validateUser(req, res, function () {
		var table;
		console.log(req.url)

		if (req.url.indexOf('user') > -1) {
			table = "users";
		} else if (req.url.indexOf('contact') > -1) {
			table = "contacts";
		} else {
			table = "orders"
		}

		myCache.get(table, function (err, value){
			if(!err && value.hasOwnProperty(table)){
				var values = JSON.stringify(value[table]);
				res.writeHead(200, {"Content-Type" : "text/plain"});
				res.end(values)
			}else {
				if (table === "users") {
					getUserList(req, res);
				} else if (table === "contacts") {
					getContacts(req, res);
				}else {
					getOrders(req, res);
				}
				
			}
		})
	});
}

readOptions.noCache = function (req, res) {
	validateUser(req, res, function () {
		var table;

		if (req.url.indexOf('users') > -1) {
			table = "users";
		} else if (req.url.indexOf('contact') > -1) {
			table = "contacts";
		} else {
			table ="orders"
		}

		if (table === "users") {
			getUserList(req, res);
		} else if(table === "contacts"){
			getContacts(req,res)
		}else {
			getOrders(req, res);
		}
	});
}

readOptions.getOrder = function (req, res) {
	var id = req.url.split("/").pop();

	validateUser(req, res, function () {
		myCache.get("orders", function (err, value) {
			var order, foundOrder;

			if(!err && value.hasOwnProperty("orders")) {

				var jobNumbers = value.orders.map(function (result) {
					return result.job_number;
				});

				var position = jobNumbers.indexOf(Number(id));

				foundOrder = value.orders[position];

				order = JSON.stringify(foundOrder);
				res.writeHead(200, {"Content-Type" : "text/plain"});
				res.end(order);

			} else {
				db.getOrder('orders', id, function (err, result) {
					if (err) {
						console.log(err);
						return;
					}
					foundOrder = result[0];

					order = JSON.stringify(foundOrder);
					res.writeHead(200, {"Content-Type" : "text/plain"});
					res.end(order);
				})
			}
		});
	});
}

module.exports = readOptions;


