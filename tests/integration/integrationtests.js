'use strict';

var falsify = require('./falsify/order.js');

var tests = function () {
	require('./tests/get-orders.js')();
	require('./tests/post-orders.js')();
	require('./tests/select-units.js')();
	require('./tests/searcher.js')();
	require('./tests/edit-orders.js')();
	require('./tests/delete-orders.js')();
}

falsify.createOrder(tests);