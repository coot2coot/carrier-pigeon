(function () {
	"use strict";

	var fs = require("fs"),
		querystring = require("querystring"),
		Static = require('node-static'),
		file = new Static.Server('./public'),
		store = require("./store"),

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

	  	if (req.method === 'POST') {

	        var body = '';
	        var remember = false;

	        req.on('data', function (data) {
	            body += data;

	        }).on('end', function () {

	            var user = querystring.parse(body);

	            if(auth.inDatabase(user)) {

	            	if (user.remember === "on") {
	            		remember = true
	            	}
	            	auth.success(req, res, remember);
				    
	            } else {
	                return authFail(res);
	            }
	        });
	    }
	};

	serverHandlers.VerifyToken = function (req, res) {
		
	};

	serverHandlers.logoutUser = function (req, res) {
		
	};

	/* -------------------------------*
	 *	   Order Handlers
	 * -------------------------------*/

	serverHandlers.getOrders = function (req, res) {
		store.get(req,res);
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