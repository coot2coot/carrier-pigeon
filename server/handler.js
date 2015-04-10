(function () {
	"use strict";

	var fs = require("fs"),
		querystring = require("querystring"),
		Static = require('node-static'),
		file = new Static.Server('./public'),

		db = require("./db-sql-config.js"),
		auth = require('./auth.js'),
		serverHandlers = {};



	var fake = { 
	    username: 'username', 
	    password: 'password' 
	};

	serverHandlers.home = function (req, res) {
		req.addListener('end', function () {
	        file.serve(req, res);
	    }).resume();
	};

	// getInitialState: function() {
 //        return {todo: {}};
 //    },
 //    componentWillMount: function() {
 //        var until = this.deferMount(),
 //            self = this;
 //        http.get('/api/todos/' + this.props.todoId, function(todo) {
 //            self.setState({todo: todo});
 //            until();
 //        }
 //    },

	/* -------------------------------*
	 *	   Authentication Handlers
	 * -------------------------------*/

	serverHandlers.loginUser = function (req, res) {

	  	if (req.method === 'POST') {

	        var body = '';
	        var remember = false;

	        req.on('data', function (data) {
	            body += data;

	        }).on('end', function () {

	            var user = querystring.parse(body);

	            //TODO: function that checks this is in the database
	            if(user.username && 
	            	user.username === fake.username && 
	            	user.password && user.password === fake.password) {

	            	if (user.remember === "on") {
	            		remember = true
	            	}
	            	auth.success(req, res, remember);
				    
	            } else {
	                return authFail(res);
	            }
	        });
	    }
	};

	serverHandlers.VerifyToken = function (req, res) {
		
	};

	serverHandlers.logoutUser = function (req, res) {
		
	};

	/* -------------------------------*
	 *	   Order Handlers
	 * -------------------------------*/

	serverHandlers.orders = function (req, res) {
		db.get("orders",function (orders) {
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