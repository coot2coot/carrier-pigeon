'use strict';

var db = require('../../../server/db-config.js');
var mocks = require('../mocks/orders-units.js');

var tests = function (st) {

	st.test("selectUnits method gets all units for a specific job_number", function (sst) {
		var callback =  function (result) {
			sst.equals(typeof result,'object', "get request to units worked")
		};
		try {
			db.selectUnits('units',mocks.edit.order.job_number, callback);
		} catch(e) {
			sst.notOk(true, "get request to units table did not work");
		}
	    sst.end();
	});
}

module.exports = tests;