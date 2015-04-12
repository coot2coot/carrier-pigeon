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

	serverHandlers.orders = function (req, res) {
		db.get("orders",function (orders) {
			res.writeHead(200, {"Content-Type" : "text/html"});
			res.end(ordersPage({ 
				data: orders,
				overlay: false
			}));
		});
	};

	serverHandlers.viewOrder = function (req, res) {
		db.getOne(function (order) {
			res.writeHead(200, {"Content-Type" : "text/html"});
			res.end(ordersPage({ 
				data: order
			}));
		});
	};

	serverHandlers.createOrder = function (req, res) {

		var orderInfo = "";

	  	req.on('data', function (data) {
	    	orderInfo += data;
	  	});
		req.on('end', function () {
		  	var newOrder = querystring.parse(orderInfo);

		  	db.post(newOrder, function() {
		  		res.writeHead(302, {
		  			'Location': '/orders'
		  		});
			    res.end();
		  	});
		});
	};

	serverHandlers.removeOrder = function (req, res) {
		//TODO.
	};

	serverHandlers.editOrder = function (req, res) {
		//TODO.
	};

	module.exports = serverHandlers;
})();