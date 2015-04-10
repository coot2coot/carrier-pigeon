(function () {
	"use strict";

	var fs = require("fs"),
		querystring = require("querystring"),
		React = require('react'),
		db = require("./db-sql-config.js"),
		DOM = React.DOM, 
		body = DOM.body, 
		div = DOM.div, 
		script = DOM.script,
		serverHandlers = {};

var Static = require('node-static');
	var file = new Static.Server('./public');


	serverHandlers.home = function (req, res) {
		req.addListener('end', function () {
	        file.serve(req, res);
	    }).resume();
	};

	/* -------------------------------*
	 *	   Authentication Handlers
	 * -------------------------------*/

	serverHandlers.login = function (req, res) {
		fs.readFile("./public/index.html", function(err, text){
	     	res.setHeader("Content-Type", "text/html");
	      	res.end(text);
	    });
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

	// serverHandlers.viewOrder = function (req, res) {
	// 	db.getOne(function (order) {
	// 		res.writeHead(200, {"Content-Type" : "text/html"});
	// 		res.end(order);
	// 	});
	// };


	serverHandlers.editOrder = function (req, res) {
		//TODO.
	};

	module.exports = serverHandlers;
})();