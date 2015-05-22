'use strict';

var test = require('tape');
var db = require('../../../server/db-config.js');
var mocks = require('../mocks/orders-units.js');

var tests = function () {

	test("selectUnits method gets all units for a specific job_number", function(t) {
		var callback =  function (result){
			t.equals(typeof result,'object', "get request to units worked")
		};
		try {
			db.selectUnits('units',mocks.ordersUnitsEdit.order.job_number, callback);
		} catch(e) {
			t.notOk(true, "get request to units table did not work");
		}

	    t.end();
	});
}

module.exports = tests;