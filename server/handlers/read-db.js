
var validateUser = require('../lib/validate-user.js');
var db 			 = require("../db-config.js");
var NodeCache 	 = require("node-cache");
var myCache 	 = new NodeCache();
var readOptions  = {};
var secondsToSave = 60 * 60 * 24 * 7;

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
		if (req.url.indexOf('users') > -1) {
			myCache.get("users",function (err, value){
				if(!err && value.hasOwnProperty('users')){
					var values = JSON.stringify(value.orders);
					res.writeHead(200, {"Content-Type" : "text/plain"});
					res.end(values)
				}else {
					getUserList(req, res);
				}
			})
		} else {
			myCache.get("orders",function (err, value){
				if(!err && value.hasOwnProperty('orders')){
					var values = JSON.stringify(value.orders);
					res.writeHead(200, {"Content-Type" : "text/plain"});
					res.end(values)
				}else {
					getOrders(req, res);
				}
			})
		}
	});
}
readOptions.noCache = function (req, res) {
	validateUser(req, res, function () {
		db.get('orders',function (orders) {		
			myCache.set("orders", orders, secondsToSave, function(err,success){
				if(err){
					console.error(err);
				}
			});
			var order = JSON.stringify(orders);
			res.writeHead(200, {"Content-Type" : "text/plain"});
			res.end(order);
		});
	});
}

module.exports = readOptions;


