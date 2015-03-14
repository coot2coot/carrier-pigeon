(function () {
	"use strict";

	var path = require("path");
	var serverHandlers = {};


	serverHandlers.home = function (req, res) {
		console.log("home");
		res.writeHead(200, {"Content-Type" : "text/plain"});
		res.write("Our First Node Server");
		res.end();
	}

	module.exports = serverHandlers;
})();