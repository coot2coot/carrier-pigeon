'use strict';

var db = require('../../../server/db-config.js');
var mocks = require('../mocks/orders-units.js');

var tests = function (st) {

	st.test("edit function to orders and units table for order with a single unit", function(sst) {
		var callback =  function (result){
			sst.equals(result, null, "edit request to units and orders table worked")
		};
		try {
			db.edit("orders", mocks.edit, callback);
		} catch(e) {
			sst.notOk(true, "edit request to orders table did not work");
		}

	    sst.end();
	});
	st.test("edit function to orders and units where a unit has been added", function(sst) {
		var callback =  function (result){
			sst.equals(result, null, "edit request to units and orders table worked")
		};
		try {
			db.edit("orders", mocks.multipleEdit, callback);
		} catch(e) {
			sst.notOk(true, "edit request to orders table did not work");
		}

	    sst.end();
	});
}

module.exports = tests;