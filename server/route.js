"use strict";

var cache	= require("./handlers/read-db.js");


var serverRoutes =  function (router) {

	router.addRoute('/', function (req, res, match){
		require('./handlers/home.js')(req, res);
	});

/* -------------------------------*
 *	   Authentication Routes
 * -------------------------------*/

	router.addRoute('/login/user', function (req, res, match){
	  	require('./handlers/login.js')(req, res);
	});

	router.addRoute('/login/verify', function (req, res, match){
	  	require('./lib/validate-user.js')(req, res, function (userDetails) {
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
	router.addRoute('/order/get/:id', function (req, res, match){
	  	require('./handlers/read-db.js').getOrder(req, res);
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
	  	require('./handlers/edit-db.js').orders(req, res, cache.noCache);
	});
/* -------------------------------*
 *	   Units Routes
 * -------------------------------*/

	router.addRoute('/units/:jobNo', function (req, res, match){
	  	require('./handlers/read-units-db.js')(req, res);
	});

	router.addRoute('/unit/create', function (req, res, match){
	  	require('./handlers/create-db.js')(req, res);
	});

	router.addRoute('/unit_types/get', function (req, res, match){
	  	require('./handlers/read-unit-types-db.js')(req, res);
	});

	router.addRoute('/units/delete/:id', function (req, res, match){
	  	require('./handlers/delete-db.js')(req, res);
	});
/* -------------------------------*
 *	   Contacts Routes
 * -------------------------------*/

 	router.addRoute('/contact/post', function (req, res, match){
	  	require('./handlers/create-contact-reminder.js')(req, res, "contacts");
	});
	router.addRoute('/contacts/edit', function (req, res, match){
	  	require('./handlers/edit-db.js').contacts(req, res, cache.noCache);
	});
	router.addRoute('/contacts/get', function (req, res, match){
	  	require('./handlers/read-db.js').cached(req, res);
	});
	router.addRoute('/contacts/get/nocache', function (req, res, match){
	  	require('./handlers/read-db.js').noCache(req, res);
	});
	router.addRoute('/contacts/delete/:id?', function (req, res, match){
	  	require('./handlers/delete-db.js')(req, res);
	});
/* -------------------------------*
 *	   Reminders Routes
 * -------------------------------*/
	router.addRoute('/reminders/:deletedReminders?', function (req, res, match){
	  	require('./handlers/edit-invoices-reminders.js')(req, res, 'reminders');
	});
	router.addRoute('/reminders/delete/:id?', function (req, res, match){
	  	require('./handlers/delete-db.js')(req, res);
	});

/* -------------------------------*
 *	   Search Routes
 * -------------------------------*/
 	router.addRoute('/search/orders/:searchTerms?', function (req, res, match){
 		require('./handlers/search.js')(req, res, "orders");
 	});
 	router.addRoute('/search/contacts/:searchTerms?', function (req, res, match){
 		require('./handlers/search.js')(req, res, "contacts");
 	});
 	router.addRoute('/search/orders/dates/:searchDates?', function (req, res, match){
 		require('./handlers/search-dates.js')(req, res);
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
 *	   		Ledger Routes
 * -------------------------------*/

	router.addRoute('/invoices/get/:jobNo', function (req, res, match){
	  	require('./handlers/read-invoices.js')(req, res);
	});

	router.addRoute('/invoices/edit/:deletedInvoices?', function (req, res, match){
	  	require('./handlers/edit-invoices-reminders.js')(req, res, 'invoice');
	});

/* -------------------------------*
 *	   User Settings Routes
 * -------------------------------*/

	router.addRoute('/user/update/:username', function (req, res, match){
	  	require('./handlers/update-db.js')(req, res);
	});

	router.addRoute('/permissions/edit', function (req, res, match){
	  	require('./handlers/permissions.js')(req, res);
	});

/* -------------------------------*
 *	   Booking Request Routes
 * -------------------------------*/

	router.addRoute('/booking-note/email', function (req, res, match){
	  	require('./handlers/email-booking-note.js')(req, res);
	});
};

module.exports = serverRoutes;

