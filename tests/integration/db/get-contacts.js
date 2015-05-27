'use strict';

var test = require('tape');
var db = require('../../../server/db-config.js');

var tests = function () {

	test("get function gets contacts", function(t) {
		var callback =  function (result){
			t.equals(typeof result, 'object', "get request to contacts table worked")
		};
		try {
			db.get('contacts', callback);
		} catch(e) {
			t.notOk(true, "get request to contacts table did not work");
		}

	    t.end();
	});
}

module.exports = tests;
