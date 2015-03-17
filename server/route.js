(function () {
	"use strict";

	var handler = require("./handler.js");

	var serverRoutes =  function (router) {

		router.addRoute('/', function (req, res, match){
		  	handler.home(res);
		});

		router.addRoute('/login', function (req, res, match){
		  	handler.login(res);
		});
	};

	module.exports = serverRoutes;
})();


