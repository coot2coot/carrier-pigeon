'use strict';

var test = require('tape');
var db = require('../../../server/db-config.js');
var mocks = require('../mocks/contacts.js');

var tests = function () {

	test("edit function to contacts", function(t) {
		var callback =  function (result){
			t.equals(result, null, "edit request to contacts table worked")
		};
		try {   
			db.edit("contacts", mocks.edit, callback);
		} catch(e) {
			t.notOk(true, "edit request to contacts table did not work");
		}
	    t.end();
	});

}

module.exports = tests;