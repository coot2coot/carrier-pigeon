(function () {
	"use strict";

	var fs = require("fs"),
		querystring = require("querystring"),
		React = require('react'),
		db = require("./db-sql-config.js"),
		DOM = React.DOM, 
		body = DOM.body, 
		div = DOM.div, 
		script = DOM.script,
		// App = React.createFactory(require('../public/app')),
		serverHandlers = {};



	serverHandlers.home = function (req, res) {
		res.writeHead(302, {
  			'Location': '/login'
  		});
	    res.end();
	};

	/* -------------------------------*
	 *	   Authentication Handlers
	 * -------------------------------*/

	serverHandlers.login = function (req, res) {
		// res.setHeader('Content-Type', 'text/html')

    // 	var html = React.renderToStaticMarkup(body(null,

	   //  div({id: 'content', dangerouslySetInnerHTML: {__html:
	   //      React.renderToString(App)
	   //  }}),

	   //  script({src: '/js/bundle.js'})
    // ))

    // Return the page to the browser
    	fs.readFile("./public/index.html", function(err, text){
	     	res.setHeader("Content-Type", "text/html");
	      	res.end(text);
	    });
	};

	/* -------------------------------*
	 *	   Order Handlers
	 * -------------------------------*/

	serverHandlers.orders = function (req, res) {
		db.get(function (orders) {
			res.writeHead(200, {"Content-Type" : "text/html"});
			res.end(ordersPage({ 
				data: orders,
				overlay: false
			}));
		});
	};

	serverHandlers.viewOrder = function (req, res) {
		db.getOne(function (order) {
			res.writeHead(200, {"Content-Type" : "text/html"});
			res.end(ordersPage({ 
				data: order
			}));
		});
	};

	serverHandlers.createOrder = function (req, res) {

		var orderInfo = "";

	  	req.on('data', function (data) {
	    	orderInfo += data;
	  	});
		req.on('end', function () {
		  	var newOrder = querystring.parse(orderInfo);

		  	db.post(newOrder, function() {
		  		res.writeHead(302, {
		  			'Location': '/orders'
		  		});
			    res.end();
		  	});
		});
	};

	serverHandlers.removeOrder = function (req, res) {
		//TODO.
	};

	serverHandlers.editOrder = function (req, res) {
		//TODO.
	};

	module.exports = serverHandlers;
})();