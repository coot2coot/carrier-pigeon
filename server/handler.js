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