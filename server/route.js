(function () {
	"use strict";

	var handler = require("./handler.js");

	var serverRoutes =  function (router) {

		router.addRoute('/', function (req, res, match){
		  	handler.home(req, res);
		});

		router.addRoute('/login', function (req, res, match){
		  	handler.login(req, res);
		});
	};

	module.exports = serverRoutes;
})();


