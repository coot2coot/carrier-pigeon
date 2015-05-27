'use strict';

var falsifyOrders = require('./falsify/order.js');
var falsifyContacts = require('./falsify/contact.js');

var ordersTests = function () {
	require('./db/get-orders.js')();
	require('./db/post-orders.js')();
	require('./db/select-units.js')();
	require('./db/searcher-orders.js')();
	require('./db/edit-orders.js')();
	require('./db/delete-orders.js')();
};

falsifyOrders.create(ordersTests);

var contactsTests = function () {
	require('./db/post-contacts.js')();
	require('./db/get-contacts.js')();
	require('./db/searcher-contacts.js')();
	require('./db/edit-contacts.js')();
	require('./db/delete-contacts.js')();
};

falsifyContacts.create(contactsTests);
