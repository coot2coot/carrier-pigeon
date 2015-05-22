'use strict';

var test = require('tape');
var db = require('../../../server/db-config.js');
var mocks = require('../mocks/orders-units.js');

var tests = function () {

	test("remove function for orders and units table", function(t) {
		var callback =  function (result){
			t.equals(result, null,  "remove request to orders and units table worked")
		};
		try {
			db.remove("orders", mocks.ordersUnitsEdit.order.job_number , callback);
		} catch(e) {
			t.notOk(true, "remove request to orders table did not work");
		}

	    t.end();
	});
}

module.exports = tests;