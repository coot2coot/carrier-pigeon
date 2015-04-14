(function () {
	"use strict";

	var fs = require("fs"),
		querystring = require("querystring"),
		Static = require('node-static'),
		file = new Static.Server('./public'),
		cache = require("./cache"),

		db = require("./db-sql-config.js"),
		auth = require('./auth.js'),
		serverHandlers = {};


	serverHandlers.home = function (req, res) {
		req.addListener('end', function () {
	        file.serve(req, res);
	    }).resume();
	};


	/* -------------------------------*
	 *	   Authentication Handlers
	 * -------------------------------*/

	serverHandlers.loginUser = function (req, res) {
		if (req.method === "POST") {
			auth.login(req, res);
		} else {
			require('./lib/auth-failed.js')(req, res);
		}
	};

	serverHandlers.verifyToken = function (req, res) {
		auth.validate(req, res, function(user) {
			res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            var response = JSON.stringify({
                username: user.user_name
            });

            res.end(response);
		});
	};

	serverHandlers.logoutUser = function (req, res) {
		auth.logout(req, res);
	};

	/* -------------------------------*
	 *	   Order Handlers
	 * -------------------------------*/

	serverHandlers.getOrders = function (req, res) {
		
		auth.validate(req, res, function () {
			cache.get(req,res);
		});
	};

	serverHandlers.getOrder = function (req, res) {
		auth.validate(req, res, function() {
			db.getOne('orders', req.docs, function (orders) {
				res.writeHead(200, {"Content-Type" : "application/json"});
				var orderString = JSON.stringify(orders);
				res.end(orderString);
			});
		});
	};

	serverHandlers.createOrder = function (req, res) {
		require('./lib/get-form-data.js')(req, function (data) {
			auth.validate(req, res, function() {
				db.post('orders', data, function (err) {
					if (err) {
						res.writeHead(500);
						res.write(err);
						res.end();
					} else {
						res.writeHead(200);
						res.write("order has been made!");
						res.end();
					}
				});
			});
		})
	};

	serverHandlers.removeOrder = function (req, res) {
		auth.validate(req, res, function() {
			db.remove('orders', req.docs, function (orders) {
				res.writeHead(200);
				res.end();
			});
		});
	};



	serverHandlers.editOrder = function (req, res) {
		//TODO.
	};

	module.exports = serverHandlers;
})();