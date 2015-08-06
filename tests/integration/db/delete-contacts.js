'use strict';

var db = require('../../../server/db-config.js');
var mocks = require('../mocks/contacts.js');

var tests = function (st) {

	st.test("remove function for contacts table", function (sst) {
		var callback =  function (result){
			sst.equals(result, null,  "remove request to contacts table worked")
		};
		try {
			db.remove("contacts", mocks.edit.contact_id , callback);
		} catch(e) {
			sst.notOk(true, "remove request to contacts table did not work");
		}

	    sst.end();
	});
}

module.exports = tests;