(function () {
	"use strict";

	var handler = require("./handler.js");

	var serverRoutes =  function (router) {

		router.addRoute('/orders', function (req, res, match){
		  	handler.orders(req, res);
		});

		router.addRoute('/orders/new', function (req, res, match){
		  	handler.newOrder(req, res);
		});

		router.addRoute('/orders/remove', function (req, res, match){
		  	handler.removeOrder(req, res);
		});

		router.addRoute('/orders/edit', function (req, res, match){
		  	handler.editOrder(req, res);
		});

		router.addRoute('/login', function (req, res, match){
		  	handler.login(req, res);
		});
	};

	module.exports = serverRoutes;
})();


