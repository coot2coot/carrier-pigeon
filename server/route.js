(function () {
	"use strict";

	var handler = require("./handler.js");

	var serverRoutes = function (req, res) {

		var url = req.url;
		var router = {};	

		router["/"] 	 = handler.home(req, res);
		router["/login"] = handler.login;
	}

	module.exports = serverRoutes;
})();


