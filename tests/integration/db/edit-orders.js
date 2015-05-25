'use strict';

var test = require('tape');
var db = require('../../../server/db-config.js');
var mocks = require('../mocks/orders-units.js');

var tests = function () {

	test("edit function to orders and units table for order with a single unit", function(t) {
		var callback =  function (result){
			t.equals(result, null, "edit request to units and orders table worked")
		};
		try {
			db.edit("orders", mocks.edit, callback);
		} catch(e) {
			t.notOk(true, "edit request to orders table did not work");
		}

	    t.end();
	});
	test("edit function to orders and units where a unit has been added", function(t) {
		var callback =  function (result){
			t.equals(result, null, "edit request to units and orders table worked")
		};
		try {
			db.edit("orders", mocks.multipleEdit, callback);
		} catch(e) {
			t.notOk(true, "edit request to orders table did not work");
		}

	    t.end();
	});
}

module.exports = tests;