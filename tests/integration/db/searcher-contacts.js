'use strict';

var db = require('../../../server/db-config.js');
var mocks = require('../mocks/contacts.js');

var tests = function (st) {

	st.test("searcher method gets all contacts for a keyword and returns the contacts", function(sst) {

		var callback =  function (n, result){
			sst.equals(typeof result,'object', "search request for key word in contacts worked")
		};
		try {
			db.searcher('contacts','dave', callback);
		} catch(e) {
			sst.notOk(true, "search request for key word in contacts did not work");
		}

	    sst.end();
	});
}

module.exports = tests;