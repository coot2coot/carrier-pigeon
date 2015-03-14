(function () {
	"use strict";

	var handler = require("./handler.js");

	var serverRoutes =  function (router) {

		router.get('/', function(){
		  	handler.home(this.res);
		});


		router.get('/login', function(){
		  	handler.login(this.res);
		});

		router.get('/logout', function(){
		  	handler.logout(this.res);
		});
	};

	module.exports = serverRoutes;
})();


