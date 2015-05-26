'use strict';

var test = require('tape');
var db = require('../../../server/db-config.js');
var mocks = require('../mocks/contacts.js');

var tests = function () {

	test("searcher method gets all contacts for a keyword and returns the contacts", function(t) {

		var callback =  function (n,result){
			t.equals(typeof result,'object', "search request for key word in contacts worked")
		};
		try {
			db.searcher('contacts','dave', callback);
		} catch(e) {
			t.notOk(true, "search request for key word in contacts did not work");
		}

	    t.end();
	});
}

module.exports = tests;