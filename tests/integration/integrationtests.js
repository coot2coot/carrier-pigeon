'use strict';

var falsify = require('./falsify/order.js');

var tests = function () {
	require('./db/get-orders.js')();
	require('./db/post-orders.js')();
	require('./db/select-units.js')();
	require('./db/searcher.js')();
	require('./db/edit-orders.js')();
	require('./db/delete-orders.js')();
}

falsify.createOrder(tests);