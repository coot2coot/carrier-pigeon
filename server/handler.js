(function () {
	"use strict";

	var fs = require("fs"),
		querystring = require("querystring"),
		Static = require('node-static'),
		file = new Static.Server('./public'),

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
		auth.validate(req, res);
	};

	serverHandlers.logoutUser = function (req, res) {
		auth.logout(req, res);
	};

	/* -------------------------------*
	 *	   Order Handlers
	 * -------------------------------*/

	serverHandlers.getOrders = function (req, res) {
		db.get('orders',function (orders) {
			res.writeHead(200, {"Content-Type" : "application/json"});
			var orderString = JSON.stringify(orders);
			res.end(orderString);
		});
	};

	serverHandlers.getOrder = function (req, res) {
		db.getOne('orders', req.docs, function (orders) {
			res.writeHead(200, {"Content-Type" : "application/json"});
			var orderString = JSON.stringify(orders);
			res.end(orderString);
		});
	};

	serverHandlers.createOrder = function (req, res) {
		db.post('orders', req.docs, function (orders) {
			res.writeHead(200);
			res.end();
		})
	}

	serverHandlers.removeOrder = function (req, res) {
		db.remove('orders', req.docs, function (orders) {
			res.writeHead(200);
			res.end();
		})
	}



	serverHandlers.editOrder = function (req, res) {
		//TODO.
	};

	module.exports = serverHandlers;
})();