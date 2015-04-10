(function () {
	"use strict";

	var handler = require("./handler.js");

	var serverRoutes =  function (router) {

		router.addRoute('/', function (req, res, match){
		  	handler.home(req, res);
		});

	/* -------------------------------*
	 *	   Authentication Routes
	 * -------------------------------*/

		// router.addRoute('/login', function (req, res, match){
		//   	handler.login(req, res);
		// });

	/* -------------------------------*
	 *	   Order Routes
	 * -------------------------------*/

		// router.addRoute('/orders', function (req, res, match){
		//   	handler.orders(req, res);
		// });

		router.addRoute('/order/id', function (req, res, match){
		  	handler.viewOrder(req, res);
		});

		router.addRoute('/order/new', function (req, res, match){
		  	handler.newOrder(req, res);
		});

		router.addRoute('/order/create', function (req, res, match){
		  	handler.createOrder(req, res);
		});

		router.addRoute('/order/remove', function (req, res, match){
		  	handler.removeOrder(req, res);
		});

		router.addRoute('/order/edit', function (req, res, match){
		  	handler.editOrder(req, res);
		});
	};

	module.exports = serverRoutes;
})();


