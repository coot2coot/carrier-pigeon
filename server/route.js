"use strict";

var Static  = require('node-static');
var file 	= new Static.Server('./public');
var cache	= require("./handlers/read-db.js");


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
	  	require('./lib/validate-user.js')(req, res, function(userDetails) {
			res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            var response = JSON.stringify({
                user: userDetails
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

	router.addRoute('/units:name', function (req, res, match){
	  	require('./handlers/read-units-db.js')(req,res);
	});

	router.addRoute('/units/delete/:id', function (req, res, match){
	  	require('./handlers/delete-db.js')(req, res);
	});

	router.addRoute('/orders/get/nocache', function (req, res, match){
	  	require('./handlers/read-db.js').noCache(req, res);
	});

	router.addRoute('/order/post', function (req, res, match){
	  	require('./handlers/create-db.js')(req, res);
	});

	router.addRoute('/orders/updates', function (req, res, match){
	  	require('./handlers/update-db.js')(req, res, cache.noCache);
	});

	router.addRoute('/order/delete/:id?', function (req, res, match){
	  	require('./handlers/delete-db.js')(req, res);
	});

	router.addRoute('/order/edit/:unit?', function (req, res, match){
	  	require('./handlers/edit-db.js')(req, res, cache.noCache);
	});

/* -------------------------------*
 *	   Admin Panel Routes
 * -------------------------------*/

	router.addRoute('/users/get', function (req, res, match){
	  	require('./handlers/read-db.js').cached(req, res);
	});

	router.addRoute('/users/get/nocache', function (req, res, match){
	  	require('./handlers/read-db.js').noCache(req, res);
	});

	router.addRoute('/user/delete/:id?', function (req, res, match){
	  	require('./handlers/delete-db.js')(req, res);
	});

	router.addRoute('/user/invite', function (req, res, match){
	  	require('./handlers/email-invite.js')(req, res);
	});
/* -------------------------------*
 *	   User Settings Routes
 * -------------------------------*/

 	router.addRoute('/user/get/:username?', function (req, res, match){
	  	require('./handlers/read-db.js').getUser(req, res);
	});

	router.addRoute('/user/update/:username', function (req, res, match){
	  	require('./handlers/update-db.js')(req, res);
	});
};

module.exports = serverRoutes;

