(function () {
	"use strict";

	var path = require("path");
	var fs = require("fs");
	var handlebars = require("handlebars");
	var template = fs.readFileSync("./public/index.html", "utf8");

	var serverHandlers = {};

	serverHandlers.home = function (req, res) {
		var source = {
			body : "Hello world!"
		};

		var pageBuilder = handlebars.compile(template);
		var pageText = pageBuilder(source);

		res.writeHead(200, {"Content-Type" : "text/html"});
		res.write(pageText);
		res.end();
	}

	module.exports = serverHandlers;
})();