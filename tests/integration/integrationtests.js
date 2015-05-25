'use strict';

var falsifyOrders = require('./falsify/order.js');
var falsifyContacts = require('./falsify/contact.js');

var ordersTests = function () {
	require('./tests/get-orders.js')();
	require('./tests/post-orders.js')();
	require('./tests/select-units.js')();
	require('./tests/searcher.js')();
	require('./tests/edit-orders.js')();
	require('./tests/delete-orders.js')();
}

falsifyOrders.create(ordersTests);

var contactsTests = function () {
	require('./tests/post-contacts.js')();
	require('./tests/get-contacts.js')();
}

falsifyContacts.create(contactsTests);