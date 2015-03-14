(function () {
	"use strict";

	var path = require("path");
	var serverHandlers = {};


	serverHandlers.home = function (req, res) {
		res.writeHead(200, {"Content-Type" : "text/plain"});
		res.write("Our First Node Server");
		res.end();
	}

	module.exports = serverHandlers;
})();