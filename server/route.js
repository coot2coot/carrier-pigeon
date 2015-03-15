(function () {
	"use strict";

	var handler = require("./handler.js");

	var serverRoutes =  function (router) {

		//todo: Need to be available on all other routes
		// router.get(/([\w-_]+)/, function(){
		//   	handler.staticFiles();
		// });

		router.addRoute('/', function (req, res, match){
		  	handler.home(res);
		});

		router.addRoute('/login', function (req, res, match){
		  	handler.login(res);
		});

		router.addRoute('/logout', function (req, res, match){
		  	handler.logout(res);
		});
	};

	module.exports = serverRoutes;
})();


