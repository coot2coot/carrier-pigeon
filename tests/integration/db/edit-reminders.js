'use strict';

var test = require('tape');
var db = require('../../../server/db-config.js');
var mocks = require('../mocks/reminders.js');

var tests = function () {

	test("edit function to reminders", function(t) {
		var callback =  function (result){
			t.equals(result, null, "edit request to reminders table worked")
		};
		try {   
			db.edit("reminders", mocks.edit, callback);
		} catch(e) {
			t.notOk(true, "edit request to reminders table did not work");
		}
	    t.end();
	});

}

module.exports = tests;