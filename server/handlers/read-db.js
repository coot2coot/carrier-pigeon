
var validateUser = require('../lib/validate-user.js');
var db 			 = require("../db-config.js");
var NodeCache 	 = require("node-cache");
var cache 		 = require("../cache.js");
var myCache 	 = new NodeCache();
var readOptions  = {};

readOptions.cached = function (req, res) {
	validateUser(req, res, function () {
		myCache.get(req,res);
	});
}
readOptions.noCache = function (req, res) {
	validateUser(req, res, function () {
		db.get('orders',function (orders) {		
			myCache.set("orders", orders, 100000, function(err,success){
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