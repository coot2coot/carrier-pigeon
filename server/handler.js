(function () {
	"use strict";

	var path = require("path");
	var fs = require("fs");

	var Handlebars = require("handlebars");
	var hbsLayouts = require('handlebars-layouts')(Handlebars);

	Handlebars.registerPartial('layout', fs.readFileSync('./public/index.html').toString());
	var template = Handlebars.compile(fs.readFileSync('./public/templates/booking.html').toString());

	var serverHandlers = {};

	var site = {
	  	title: "Exampal usage of Handlebars",
	  	description: "Learn to use handlebars with node.js!"
	}

	serverHandlers.home = function (res) {

		var page = {
		    title: "Booking Notice",
		    content: "More infomation needed"
		 }

		res.writeHead(200, {"Content-Type" : "text/html"});
		res.end(template({ site: site, page: page }));
	}

	serverHandlers.login = function (req, res) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end('login here');
	}

	serverHandlers.logout = function (req, res) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end('logout here');
	}

	module.exports = serverHandlers;
})();