'use strict';

var test = require('tape');
var db = require('../../../server/db-config.js');
var falsify = require('../falsify/order.js');

var tests = function () {

	test("get function returns the specified tables contents", function(t) {

		var results;
		var callback =  function (result){
			t.equals(typeof result, "object", "get method returned the rows from the orders table");
		};

		try {
			db.get('orders',callback);
		} catch(e) {
			t.notOk(true, "post request to orders table did not work");
		}

	    t.end();
	});

	test("clear table", function(t) {
		falsify.clearTable();
		t.ok(true, "table cleared");
	    t.end();
	});
}

falsify.createOrder(tests)
