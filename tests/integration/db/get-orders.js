'use strict';

var db = require('../../../server/db-config.js');

var tests = function (st) {

	st.test("get function gets orders", function (sst) {
		var callback =  function (result){
			sst.equals(result[0].hasOwnProperty('job_number'), true , "get request to orders table worked")
		};
		try {
			db.get('orders', callback);
		} catch(e) {
			sst.notOk(true, "get request to orders table did not work");
		}

	    sst.end();
	});
}

module.exports = tests;
