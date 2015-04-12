(function () {
	"use strict";
	var db = require("./db-sql-config.js");
	var time;
	var orderString


	var store = {};

	var getOrders = function (req, res) {
			db.get('orders',function (orders) {
				res.writeHead(200, {"Content-Type" : "text"});
				orderString = JSON.stringify(orders);
				res.end(orderString);
				return orderString
			});
	}

	var returnOrders = function (req, res) {
			res.writeHead(200, {"Content-Type" : "text"});
			res.end(orderString);
	}

	store.get = function (req, res) {
		var currentTime = new Date().getTime();
		if(time && (currentTime - time > 60000)){
			time = currentTime;
			getOrders(req, res);
			return time;
		}
		if(!time){
			time = currentTime;
			getOrders(req, res);
			return time;
		}
		returnOrders(req, res);
	}

	module.exports = store;
})()