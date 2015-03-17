(function () {
	"use strict";

	var fs = require("fs");
	var Handlebars = require("handlebars");
	var hbsLayouts = require('handlebars-layouts')(Handlebars);

	Handlebars.registerPartial('layout', fs.readFileSync('./public/index.html').toString());
	var template = Handlebars.compile(fs.readFileSync('./public/templates/booking.html').toString());

	var serverHandlers = {};

	var page = {
	    title: "Booking Notice",
	    content: "More infomation needed"
	};

	serverHandlers.staticFiles = function (res) {
		res.writeHead(200, {"Content-Type" : "text/html"});
		res.end(index.html);
		ecstatic({
			root: __dirname + "/public"
		});
	};

	serverHandlers.home = function (req, res) {
		res.writeHead(200, {"Content-Type" : "text/html"});
		res.end(template({ page: page }));
	};

	serverHandlers.login = function (res) {
		page.title = "login";

		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(template({ page: page }));
	};

	serverHandlers.logout = function (res) {
		page.title = "logout";

		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(template({ page: page }));
	};

	module.exports = serverHandlers;
})();