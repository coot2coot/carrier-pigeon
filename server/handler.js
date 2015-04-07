(function () {
	"use strict";

	var fs = require("fs");
	var querystring = require("querystring");
	var Handlebars = require("handlebars");
	var db = require("./db-sql-config.js");
	var hbsLayouts = require('handlebars-layouts')(Handlebars);

	Handlebars.registerPartial('layout', fs.readFileSync('./public/index.html').toString());
	var ordersPage = Handlebars.compile(fs.readFileSync('./public/templates/orders.html').toString());
	var loginPage = Handlebars.compile(fs.readFileSync('./public/templates/login.html').toString());

	var serverHandlers = {};

	serverHandlers.home = function (req, res) {
		res.writeHead(302, {
  			'Location': '/login'
  		});
	    res.end();
	};

	/* -------------------------------*
	 *	   Authentication Handlers
	 * -------------------------------*/

	serverHandlers.login = function (req, res) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(loginPage());
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

	// serverHandlers.orders = function (req, res) {
	// 	db.get(function (orders) {
	// 		res.writeHead(200, {"Content-Type" : "text/html"});
	// 		res.end(ordersPage({ 
	// 			data: orders,
	// 			overlay: false
	// 		}));
	// 	});
	// };

	// serverHandlers.viewOrder = function (req, res) {
	// 	db.getOne(function (order) {
	// 		res.writeHead(200, {"Content-Type" : "text/html"});
	// 		res.end(ordersPage({ 
	// 			data: order
	// 		}));
	// 	});
	// };

	// serverHandlers.newOrder = function (req, res) {
	// 	db.get(function (orders) {
	// 		res.writeHead(200, {"Content-Type" : "text/html"});
	// 		res.end(ordersPage({ 
	// 			data: orders,
	// 			overlay: true
	// 		}));
	// 	});
	// };

	// serverHandlers.createOrder = function (req, res) {

	// 	var orderInfo = "";

	//   	req.on('data', function (data) {
	//     	orderInfo += data;
	//   	});
	// 	req.on('end', function () {
	// 	  	var newOrder = querystring.parse(orderInfo);

	// 	  	db.post(newOrder, function() {
	// 	  		res.writeHead(302, {
	// 	  			'Location': '/orders'
	// 	  		});
	// 		    res.end();
	// 	  	})
	// 	});
	// };

	// serverHandlers.removeOrder = function (req, res) {
	// 	//TODO.
	// };

	// serverHandlers.editOrder = function (req, res) {
	// 	//TODO.
	// };

	module.exports = serverHandlers;
})();