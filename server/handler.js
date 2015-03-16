(function () {
	"use strict";

	var fs = require("fs");
	var Handlebars = require("handlebars");
	var fakeData = require("../public/fakeData.json");
	var hbsLayouts = require('handlebars-layouts')(Handlebars);

	Handlebars.registerPartial('layout', fs.readFileSync('./public/index.html').toString());
	var template = Handlebars.compile(fs.readFileSync('./public/templates/booking.html').toString());

	var serverHandlers = {};

	serverHandlers.home = function (res) {
		res.writeHead(200, {"Content-Type" : "text/html"});
		res.end(template({ 
			data: fakeData
		}));
	};

	serverHandlers.login = function (res) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(template());
	};

	serverHandlers.logout = function (res) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(template());
	};

	module.exports = serverHandlers;
})();