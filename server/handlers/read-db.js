
var validateUser = require('../lib/validate-user.js');
var db 			 = require("../db-config.js");
var NodeCache 	 = require("node-cache");
var myCache 	 = new NodeCache();
var readOptions  = {};
var secondsToSave = 60 * 60 * 24 * 7;

var getOrders = function (req, res) {
	db.getOrders('orders',function (orders) {		
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

var getUserList = function (req, res) {
	db.get('users',function (users) {
		myCache.set("users", users, secondsToSave, function(err, success){
			if(err){
				console.error(err)
			}
		});
		var userList = JSON.stringify(users);

		res.writeHead(200, {"Content-Type" : "text/plain"});
		res.end(userList);
	})
};

readOptions.cached = function (req, res) {
	validateUser(req, res, function () {
		var table;

		if (req.url.indexOf('users') > -1) {
			table = "users";
		} else {
			table = "orders";
		}

		
		myCache.get(table,function (err, value){
			if(!err && value.hasOwnProperty(table)){
				var values = JSON.stringify(value[table]);
				res.writeHead(200, {"Content-Type" : "text/plain"});
				res.end(values)
			}else {
				if (table === "users") {
					getUserList(req, res);
				} else {
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
		} else {
			table = "orders";
		}

		if (table === "users") {
			getUserList(req, res);
		} else {
			getOrders(req, res);
		}
	});
}

module.exports = readOptions;


