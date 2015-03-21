(function () {
	"use strict";

	var fs = require("fs");
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

	serverHandlers.newOrders = function (req, res) {
		db.get(function (orders) {
			console.log(orders);
			res.writeHead(200, {"Content-Type" : "text/html"});
			res.end(template({ 
				data: orders
			}));
		});
	};

	serverHandlers.login = function (req, res) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(template());
	};

	module.exports = serverHandlers;
})();