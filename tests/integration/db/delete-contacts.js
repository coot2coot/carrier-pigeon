'use strict';

var test = require('tape');
var db = require('../../../server/db-config.js');
var mocks = require('../mocks/contacts.js');

var tests = function () {

	test("remove function for contacts table", function(t) {
		var callback =  function (result){
			t.equals(result, null,  "remove request to contacts table worked")
		};
		try {
			db.remove("contacts", mocks.edit.contact_id , callback);
		} catch(e) {
			t.notOk(true, "remove request to contacts table did not work");
		}

	    t.end();
	});
}

module.exports = tests;