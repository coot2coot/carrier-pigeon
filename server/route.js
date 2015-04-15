"use strict";

var Static  = require('node-static');
var file 	= new Static.Server('./public');


var serverRoutes =  function (router) {

	router.addRoute('/', function (req, res, match){
		req.addListener('end', function () {
	        file.serve(req, res);
	    }).resume();
	});

/* -------------------------------*
 *	   Authentication Routes
 * -------------------------------*/

	router.addRoute('/login/user', function (req, res, match){
	  	require('./handlers/login.js')(req, res);
	});

	router.addRoute('/login/verify', function (req, res, match){
	  	require('./lib/validate-user.js')(req, res, function(user) {
			res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            var response = JSON.stringify({
                username: user.user_name
            });

            res.end(response);
        });
	});

	router.addRoute('/logout', function (req, res, match){
	  	require('./handlers/logout.js')(req, res);
	});

/* -------------------------------*
 *	   Order Routes
 * -------------------------------*/

	router.addRoute('/orders/get', function (req, res, match){
	  	require('./handlers/read-db.js').cached(req, res);
	});

	router.addRoute('/orders/get/nocache', function (req, res, match){
	  	require('./handlers/read-db.js').noCache(req, res);
	});

	router.addRoute('/order/post', function (req, res, match){
	  	require('./handlers/create-db.js')(req, res);
	});

	router.addRoute('/order/delete', function (req, res, match){
	  	require('./handlers/delete-db.js')(req, res);
	});

	router.addRoute('/order/edit', function (req, res, match){
	  	require('./handlers/update-db.js')(req, res);
	});
};

module.exports = serverRoutes;

