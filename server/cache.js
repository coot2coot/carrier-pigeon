(function () {
	"use strict";
	var db 			  = require("./db-sql-config.js");
	var NodeCache 	  = require("node-cache");
	var myCache 	  = new NodeCache();

	var secondsToSave = 60 * 60 * 24 * 7;

	var cache = {};

	var getOrders = function (req, res) {
		db.get('orders',function (orders) {		
			myCache.set("orders", orders, secondsToSave, function(err,success){
				if(err){
					console.error(err)
				}
			});
			var order = JSON.stringify(orders);
			res.writeHead(200, {"Content-Type" : "text/plain"});
			res.end(order);
		})
	};


	cache.get = function (req, res) {
		myCache.get("orders",function (err, value){
			if(!err && value.hasOwnProperty('orders')){
				var values = JSON.stringify(value.orders);
				res.writeHead(200, {"Content-Type" : "text/plain"});
				res.end(values)
			}else {
				getOrders(req,res);
			}
		})
	}

	module.exports = cache;
})()
