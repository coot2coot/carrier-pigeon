'use strict';

var test = require('tape');
var db = require('../../../server/db-config.js');

var tests = function () {

	test("get function gets reminders", function(t) {
		var callback =  function (result){
			t.equals(typeof result, 'object', "get request to reminders table worked")
		};
		try {
			db.get('reminders', callback);
		} catch(e) {
			t.notOk(true, "get request to reminders table did not work");
		}

	    t.end();
	});
}

module.exports = tests;
