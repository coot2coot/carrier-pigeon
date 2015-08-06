'use strict';

var db = require('../../../server/db-config.js');
var mocks = require('../mocks/orders-units.js');

var tests = function (sst) {

	sst.test("remove function for orders and units table", function (sstt) {
		
		var callback =  function (result) {
			sstt.equals(result, null,  "remove request to orders and units table worked")
		};
		try {
			db.remove("orders", mocks.edit.order.job_number, callback);
		} catch(e) {
			sstt.notOk(true, "remove request to orders table did not work");
		}

	    sstt.end();
	});
}

module.exports = tests;