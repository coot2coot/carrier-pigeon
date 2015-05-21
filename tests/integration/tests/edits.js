'use strict';

var test = require('tape');
var db = require('../../../server/db-config.js');
var falsify = require('../falsify/order.js');
var mocks = require('../mocks/orders-units.js');

var tests = function () {

	test("edit function to orders and units table", function(t) {
		var callback =  function (result){
			t.equals(result, null, "edit request to units and orders table worked")
		};
		try {
			db.edit("orders", mocks.ordersUnitsEdit, callback);
		} catch(e) {
			t.notOk(true, "edit request to orders table did not work");
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