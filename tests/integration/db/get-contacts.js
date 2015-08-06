'use strict';

var db = require('../../../server/db-config.js');

var tests = function (st) {

	st.test("get function gets contacts", function (sst) {
		var callback =  function (result){
			sst.equals(typeof result, 'object', "get request to contacts table worked")
		};
		try {
			db.get('contacts', callback);
		} catch(e) {
			sst.notOk(true, "get request to contacts table did not work");
		}

	    sst.end();
	});
}

module.exports = tests;
