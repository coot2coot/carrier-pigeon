(function () {
	"use strict";

	var fs = require("fs");
	var querystring = require("querystring");
	var Handlebars = require("handlebars");
	var db = require("./db-config.js");
	var hbsLayouts = require('handlebars-layouts')(Handlebars);

	Handlebars.registerPartial('layout', fs.readFileSync('./public/index.html').toString());
	var template = Handlebars.compile(fs.readFileSync('./public/templates/booking.html').toString());

	var serverHandlers = {};


	var page = {
	    title: "Booking Notice",
	    content: "More infomation needed"
	};

	serverHandlers.orders = function (req, res) {
		db.get(function (orders) {
			res.writeHead(200, {"Content-Type" : "text/html"});
			res.end(template({ 
				data: orders
			}));
		});
	};

	serverHandlers.newOrder = function (req, res) {
		var orderInfo = "";

	  	req.on('data', function (data) {
	    	orderInfo += data;
	  	});
		req.on('end', function () {
		  	var newOrder = querystring.parse(orderInfo);

		  	db.post(newOrder, function() {
		  		console.log('check your db!')
		  		res.writeHead(302, {
		  			'Location': '/orders'
		  		});
			    res.end();
		  	})
		});
	};

	serverHandlers.login = function (req, res) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(template());
	};

	module.exports = serverHandlers;
})();