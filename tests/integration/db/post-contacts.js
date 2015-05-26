'use strict';

var test = require('tape');
var db = require('../../../server/db-config.js');
var mocks = require('../mocks/contacts.js');

var tests = function () {

	test("post function posts to contacts table", function(t) {
		var callback =  function (result){
			t.equals(result,null, "post request to contacts table worked")
		};
		try {
			db.post('contacts', mocks.contact, callback);
		} catch(e) {
			t.notOk(true, "post request to contacts table did not work");
		}

	    t.end();
	});
}

module.exports = tests;
