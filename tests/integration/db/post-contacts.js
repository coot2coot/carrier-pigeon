'use strict';

var db = require('../../../server/db-config.js');
var mocks = require('../mocks/contacts.js');

var tests = function (st) {

	st.test("post function posts to contacts table", function (sst) {

		var callback =  function (result) {

			sst.equals(result, null, "post request to contacts table worked")
		};
		try {
			db.post('contacts', mocks.contact, callback);
		} catch(e) {
			sst.notOk(true, "post request to contacts table did not work");
		}

	    sst.end();
	});
}

module.exports = tests;
