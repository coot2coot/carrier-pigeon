
var validateUser = require('../lib/validate-user.js'),
var db 			 = require("./db-sql-config.js")
var cache 		 = require("../cachejs"),
var readOptions  = {};

readOptions.cached = function () {
	validateUser(req, res, function () {
		cache.get(req,res);
	});
}
readOptions.noCache = function () {
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