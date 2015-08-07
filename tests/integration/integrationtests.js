'use strict';

var test = require('tape');

var falsifyOrders = require('./falsify/order.js');
var falsifyContacts = require('./falsify/contact.js');

test('ordersTests', function (t) {

	var cb = function (result) {
		
		t.equal(typeof result, 'object', 'before function worked')	
	}

	falsifyOrders.create(cb);

	t.test('tests', function (st) {
		require('./db/get-orders.js')(st);
		require('./db/post-orders.js')(st);
		require('./db/select-units.js')(st);
		require('./db/searcher-orders.js')(st);
		require('./db/edit-orders.js')(st);	
		st.end();
	});

	t.plan(2);
})


test('contactsTests', function (t) {

	var cb = function (result) {
		
		t.equal(typeof result, 'object', 'before function worked')	
	}

	falsifyContacts.create(cb);

	t.test('tests', function (st) {
		require('./db/get-contacts.js')(st);
		require('./db/searcher-contacts.js')(st);
		require('./db/edit-contacts.js')(st);
		require('./db/post-contacts.js')(st);
		st.end()
	});
	
	t.plan(2);
})

